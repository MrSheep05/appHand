export type Tuple<
  V,
  N extends number,
  T extends V[] = []
> = N extends T["length"] ? T : Tuple<V, N, [...T, V]>;
