import type ISerializer from "./ISerializer"
import type { SerializerField } from "./field"


type AnyRecord = Record<string | number | symbol, any>


export default abstract class RecordSerializer<T extends AnyRecord> implements ISerializer<T> {
	public abstract readonly keysSerializer: SerializerField<keyof T>
	public abstract readonly valuesSerializer: SerializerField<T[keyof T]>

	// @ts-expect-error
	serialize(obj: T): object | never {
		throw new Error("Serialization is not implemented")
	}

	deserialize(raw: any): T {
		const cleanedData: any = {}

		if (typeof raw !== "object" || raw === null) {
			throw new Error(`${this.constructor.name}: Value is not object`)
		}

		Object.entries(raw).forEach(([key, value]) => {
			let cleanedKey, cleanedValue

			try {
				cleanedKey = this.keysSerializer.deserialize(key)
			} catch (error) {
				throw new Error(`${this.constructor.name}: Key deserialization error - ${error}`)
			}

			try {
				cleanedValue = this.valuesSerializer.deserialize(value)
			} catch (error) {
				throw new Error(`${this.constructor.name}: Value deserialization error - ${error}`)
			}

			cleanedData[cleanedKey] = cleanedValue
		})

		return cleanedData as T
	}
}
