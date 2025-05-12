import type { SerializerField } from "./field"
import type ISerializer from "./ISerializer"
import { Optional } from "./modifier"


export default abstract class InterfaceSerializer<T extends object> implements ISerializer<T> {
	public abstract readonly fields: {[index in keyof T]: SerializerField<T[keyof T]>}

	serialize(obj: T): any {
		const result: any = {}

		for (const [name, field] of Object.entries(this.fields)) {
			if (field instanceof Optional) {
				if (Object.hasOwn(obj, name)) {
					result[name] = obj[(name as keyof T)]
				}
			} else {
				if (Object.hasOwn(obj, name)) {
					result[name] = obj[(name as keyof T)]
				} else {
					throw new Error(`Value of field ${name} was missed`)
				}
			}
		}

		return result
	}

	deserialize(raw: any): T {
		const cleanedData: any = {}

		for (const [name, field] of Object.entries(this.fields)) {
			try {
				cleanedData[name] = (field as SerializerField<T[keyof T]>).deserialize(raw[name])
			} catch (error) {
				throw new Error(`Field: ${name}; ${(error as Error).message}`)
			}
		}

		return cleanedData as T
	}

	deserializeMany(raw: any): T[] {
		if (!Array.isArray(raw)) {
			throw new Error("Data is not array")
		}

		return raw.map(e => this.deserialize(e))
	}
}
