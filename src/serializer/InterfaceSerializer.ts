import type { BaseField } from "../field"
import type ISerializer from "./ISerializer"


export default abstract class InterfaceSerializer<T extends object> implements ISerializer<T> {
	public abstract readonly fields: Record<keyof T, BaseField<T[keyof T]>>

	serialize(value: T): any {
		const result: {[index: string]: any} = {}

		for (const [attrName, field] of Object.entries(this.fields) as [keyof T, BaseField<T[keyof T]>][]) {
			if (typeof attrName !== "string") {
				continue
			}

			if (!Object.hasOwn(value, attrName) && field.options.optional) {
				continue
			}

			result[field.options.alias ?? attrName] = field.serialize(value[attrName])
		}

		return result
	}

	deserialize(raw: any): T {
		const cleanedData: any = {}

		for (const [attrName, field] of Object.entries(this.fields) as [keyof T, BaseField<T[keyof T]>][]) {
			if (typeof attrName !== "string") {
				continue
			}

			const rawValue = raw[field.options.alias ?? attrName]

			if (rawValue === undefined && field.options.optional) {
				continue
			}

			try {
				cleanedData[attrName] = field.deserialize(rawValue)
			} catch (error) {
				throw new Error(`Field: ${attrName}; ${(error as Error).message}`)
			}
		}

		return cleanedData as T
	}
}
