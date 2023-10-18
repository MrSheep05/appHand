import { FingerKeys } from "../utils/state.types";

export type Children = JSX.Element | JSX.Element[];

export type GetValueFunction = ({
  key,
  value,
}: {
  key: FingerKeys;
  value: number;
}) => void;
