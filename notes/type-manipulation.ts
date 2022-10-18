// 1. Keyof Type Operator
type Keys<T extends object> = keyof T;

declare const var1: Keys<{ a: 1; b: 2 }>; // "a" | "b"

// 2. Typeof Type Operator
const type = new String("number");
type TypeString = typeof type;
const type2 = String("number");
type TypeString2 = typeof type2;
const type3 = "number";
type TypeString3 = typeof type3;

// 3. Indexed Access Types
type Person = { age: number; name: string; alive: boolean };
type Age = Person["age"];
type I1 = Person["age" | "name"];
type I2 = Person[keyof Person];
type AliveOrName = "alive" | "name";
type I3 = Person[AliveOrName];

const MyArray = [
  { name: "Alice", age: 15 },
  { name: "Bob", age: 23 },
  { name: "Eve", age: 38, alive: false },
];
type Person2 = typeof MyArray[number];
type Age2 = typeof MyArray[number]["age"];
const key = "age";
type Age3 = Person[typeof key];
// TS2749: 'key' refers to a value, but is being used as a type here. Did you mean 'typeof key'?
// type Age4 = Person[key];

// 4. Conditional Types
type SomeType = any;
type OtherType = any;
type TrueType = "any";
type FalseType = any;
type Stuff = SomeType extends OtherType ? TrueType : FalseType;

interface Animal {
  live(): void;
}

interface Dog extends Animal {
  woof(): void;
}

type Example1 = Dog extends Animal ? number : string;

type Example2 = RegExp extends Animal ? number : string;

// 5. Mapped Types
type OptionsFlags<Type> = {
  [Property in keyof Type]: boolean;
};

// Removes 'readonly' attributes from a type's properties
type CreateMutable<Type> = {
  -readonly [Property in keyof Type]-?: Type[Property];
};

type LockedAccount = {
  readonly id?: string;
  readonly name?: string;
};

type UnlockedAccount = CreateMutable<LockedAccount>;

// Key Remapping via as
// In TypeScript 4.1 and onwards, you can re-map keys in mapped types with an as clause in a mapped type:
// type MappedTypeWithNewProperties<Type> = {
//   [Properties in keyof Type as NewKeyType]: Type[Properties];
// };

type Getters<Type> = {
  [Property in keyof Type as `get${Capitalize<string & Property>}`]: () => Type[Property];
};

interface Person3 {
  name: string;
  age: number;
  location: string;
}

type LazyPerson = Getters<Person3>;

// 6. Template Literal Types
// 6.1 String Unions in Types
type PropEventSource<Type> = {
  on(eventName: `${string & keyof Type}Changed`, callback: (newValue: any) => void): void;
};

/// Create a "watched object" with an 'on' method
/// so that you can watch for changes to properties.
declare function makeWatchedObject<Type>(obj: Type): Type & PropEventSource<Type>;

const person = makeWatchedObject({
  firstName: "Saoirse",
  lastName: "Ronan",
  age: 26,
});

person.on("firstNameChanged", () => {});
// Prevent easy human error (using the key instead of the event name)
person.on("firstName", () => {});
// It's typo-resistant
person.on("frstNameChanged", () => {});

// 6.2 Inference with Template Literals
type PropEventSource2<Type> = {
  on<Key extends string & keyof Type>(eventName: `${Key}Changed`, callback: (newValue: Type[Key]) => void): void;
};

declare function makeWatchedObject2<Type>(obj: Type): Type & PropEventSource2<Type>;

const person2 = makeWatchedObject2({
  firstName: "Saoirse",
  lastName: "Ronan",
  age: 26,
});

person2.on("firstNameChanged", (newName) => {
  console.log(`new name is ${newName.toUpperCase()}`);
});

person2.on("ageChanged", (newAge) => {
  if (newAge < 0) {
    console.warn("warning! negative age");
  }
});
// 6.3 Intrinsic String Manipulation Types
// 6.3.1 Uppercase<StringType>
type Greeting = "Hello, world";
type ShoutGreeting = Uppercase<Greeting>;
type ASCIICacheKey<Str extends string> = `ID-${Uppercase<Str>}`;
type MainID = ASCIICacheKey<"my_app">;
// 6.3.2 Lowercase<StringType>
type Greeting2 = "Hello, world";
type QuietGreeting = Lowercase<Greeting2>;
type ASCIICacheKey2<Str extends string> = `id-${Lowercase<Str>}`;
type MainID2 = ASCIICacheKey2<"MY_APP">;
// 6.3.3 Capitalize<StringType>
type LowercaseGreeting = "hello, world";
type Greeting3 = Capitalize<LowercaseGreeting>;
// 6.3.4 Uncapitalize<StringType>
type UppercaseGreeting = "HELLO WORLD";
type UncomfortableGreeting = Uncapitalize<UppercaseGreeting>;
