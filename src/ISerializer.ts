export default interface ISerializer<T> {
	serialize: (obj: T) => any
	deserialize: (cleanedData: any) => T
}
