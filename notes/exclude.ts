// 排除
// 1. 从对象中排除指定键
type MyOmit<T, K extends keyof T> = {
  [tk in keyof T as tk extends K ? never : tk]: T[tk];
};
type MyOmit2<T, K extends keyof T> = {
  [tk in Exclude<keyof T, K>]: T[tk];
};

// 2. 从关联类型中排出指定类型
type myExclude<T, K> = T extends K ? never : T;

declare var e1: myExclude<"a" | "b", "b" | "c">;
declare var e2: Exclude<"a" | "b", "b" | "c">;
