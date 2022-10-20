// 排除
// 1. 从对象中排除指定键
type MyOmit<T, K extends keyof T> = {
  [tk in keyof T as tk extends K ? never : tk]: T[tk];
};
type MyOmit2<T, K extends keyof T> = {
  [tk in Exclude<keyof T, K>]: T[tk];
};

// You can filter out keys by producing never via a conditional type:
// Remove the 'kind' property
type RemoveKindField<Type> = {
  [Property in keyof Type as Exclude<Property, "kind">]: Type[Property];
};

interface Circle {
  kind: "circle";
  radius: number;
}
type KindLessCircle = RemoveKindField<Circle>;

// 2. 从关联类型中排出指定类型
type myExclude<T, K> = T extends K ? never : T;

declare var e1: myExclude<"a" | "b", "b" | "c">;
declare var e2: Exclude<"a" | "b", "b" | "c">;

// 数组
// 1. 选择第一个
type First<T extends unknown[]> = T extends [infer F, ...any] ? F : never;
// First<[]> ==> never
// 2. 选择最后一个
type Last<T extends unknown[]> = T extends [...any, infer L] ? L : never;
