import type ISerializer from "./ISerializer"


export default abstract class BaseSerializer<T> implements ISerializer<T> {
	abstract serialize(value: T): any
	abstract deserialize(raw: any): T

	deserializeMany(raw: any): T[] {
		if (!Array.isArray(raw)) {
			throw new Error(`${this.constructor.name}: Value must be of array type`)
		}

		return raw.map(e => this.deserialize(e))
	}
}
