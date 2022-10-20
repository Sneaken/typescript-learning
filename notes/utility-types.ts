// 1. ReturnType<Type>
type MyReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : never;

// 2. Parameters<Type>
type MyParameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;

// 3. Exclude<UnionType, ExcludedMembers>
type MyExclude<T, U> = T extends U ? never : T;

// 4. Pick<Type, Keys>
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};

// 5. Omit<Type, Keys>
type MyOmit3<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

// 6. Partial<Type>;
type MyPartial<T> = {
  [P in keyof T]?: T[P];
};

// 7. Required<Type>
type MyRequired<T> = {
  // -? 很重要
  // 迭代的时候会把原来的修饰符也带上
  [P in keyof T]-?: T[P];
};

// 8. Readonly<Type>
type MyReadonly<T> = {
  readonly [P in keyof T]: T[P];
};

// 9. Record<Keys, Type>
type MyRecord<K extends keyof any, T> = {
  [P in K]: T;
};

// 10. Extract<Type, Union>
type MyExtract<T, U> = T extends U ? T : never;

// 11. NonNullable<Type>
// 排除 null 和 undefined
type MyNonNullable<T> = T & {}

