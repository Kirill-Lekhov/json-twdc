export default interface ISerializer<T> {
	serialize: (value: T) => any
	deserialize: (raw: any) => T
}
