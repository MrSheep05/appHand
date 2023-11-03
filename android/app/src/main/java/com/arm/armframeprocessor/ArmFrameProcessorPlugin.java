package com.arm.armframeprocessor;

import java.io.ByteArrayOutputStream;
import android.media.Image;
import android.graphics.ImageFormat;
import android.graphics.YuvImage;
import android.graphics.Rect;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import com.mrousavy.camera.frameprocessor.Frame;
import com.mrousavy.camera.frameprocessor.FrameProcessorPlugin;
import java.util.Map;
import java.nio.ByteBuffer;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.HttpVersion;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ByteArrayEntity;
import org.apache.http.entity.mime.content.ByteArrayBody;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.params.CoreProtocolPNames;
import org.apache.http.util.EntityUtils;

public class ArmFrameProcessorPlugin extends FrameProcessorPlugin {
  ArmFrameProcessorPlugin(@Nullable Map<String, Object> options) {
    super(options);
  }

  @Nullable
  @Override
  public Object callback(@NonNull Frame frame, @Nullable Map<String, Object> arguments) {
    if (arguments != null && arguments.get("address") instanceof String) {
      try {
        String url = (String) arguments.get("address");
        HttpClient httpclient = new DefaultHttpClient();
        httpclient.getParams().setParameter(CoreProtocolPNames.PROTOCOL_VERSION, HttpVersion.HTTP_1_1);
        HttpPost httppost = new HttpPost(url);
        Image img = frame.getImage();
        final byte[] data = NV21toJPEG(
            YUV_420_888toNV21(img),
            img.getWidth(), img.getHeight());
        ByteArrayEntity body = new ByteArrayEntity(data);
        httppost.setEntity(body);
        HttpResponse response = httpclient.execute(httppost);
        HttpEntity resEntity = response.getEntity();
        if (resEntity != null) {
          return EntityUtils.toString(resEntity);
        }
      } catch (Throwable e) {
        return null;
      }
    }
    return null;
  }

  private static byte[] YUV_420_888toNV21(Image image) {
    byte[] nv21;
    ByteBuffer yBuffer = image.getPlanes()[0].getBuffer();
    ByteBuffer uBuffer = image.getPlanes()[1].getBuffer();
    ByteBuffer vBuffer = image.getPlanes()[2].getBuffer();

    int ySize = yBuffer.remaining();
    int uSize = uBuffer.remaining();
    int vSize = vBuffer.remaining();

    nv21 = new byte[ySize + uSize + vSize];

    // U and V are swapped
    yBuffer.get(nv21, 0, ySize);
    vBuffer.get(nv21, ySize, vSize);
    uBuffer.get(nv21, ySize + vSize, uSize);

    return nv21;
  }

  private static byte[] NV21toJPEG(byte[] nv21, int width, int height) {
    ByteArrayOutputStream out = new ByteArrayOutputStream();
    YuvImage yuv = new YuvImage(nv21, ImageFormat.NV21, width, height, null);
    yuv.compressToJpeg(new Rect(0, 0, width, height), 100, out);
    return out.toByteArray();
  }
}