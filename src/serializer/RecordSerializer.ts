import BaseSerializer from "./BaseSerializer"
import type { BaseField } from "../field"


type AnyRecord = Record<string | number | symbol, any>


/**
 * Checks an object for compliance with a specific record type.
 *
 * @example
 * ```typescript
 * class AttendanceSerializer extends RecordSerializer<Record<string, number>> {
 * 	public keysSerializer = new StringField({})
 * 	public valuesSerializer = new NumberField({})
 * }
 *
 * const serializer = new AttendanceSerialize()
 * const attendance = serializer.deserialize({ "Doe": 1, "Eden": 2, "Ivanov": 0 })		// Record<string, number>
 * ```
 */
export default abstract class RecordSerializer<T extends AnyRecord> extends BaseSerializer<T> {
	public abstract readonly keysSerializer: BaseField<keyof T>
	public abstract readonly valuesSerializer: BaseField<T[keyof T]>

	serialize(value: T): any {
		const result: any = {}

		Object.entries(value).forEach(([key, value]) => {
			result[this.keysSerializer.serialize(key)] = this.valuesSerializer.serialize(value)
		})

		return result
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
