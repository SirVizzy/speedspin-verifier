
export function entriesOf<T extends object>(object: T) {
  return Object.entries(object) as Entries<T>
}

export function keysOf<T extends object>(obj: T): Array<keyof T> {
  return Object.keys(obj) as Array<keyof T>
}

export function valuesOf<T extends object>(object: T) {
  return Object.values(object) as Array<T[keyof T]>
}

type ObjectEntry<BaseType> = [keyof BaseType, BaseType[keyof BaseType]]
type ObjectEntries<BaseType> = Array<ObjectEntry<BaseType>>

type Entries<BaseType> = BaseType extends object
  ? ObjectEntries<BaseType>
  : never
