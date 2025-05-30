import BaseField from "../BaseField"


/**
 * Turns a regular field into a nullable version.
 *
 * @template <T>
 * @param {BaseField<T>} field - The field object to make nullable.
 * @returns {BaseField<T | null>} - The nullable version of the field.
 *
 * @example
 * ```
 * import { StringField } from "json-twdc/field"
 *
 *
 * const stringField = new StringFiled({})		// only strings are allowed
 * const nullableStringField = Nullable(stringField)		// strings and nulls are allowed
 * ```
 */
export default function Nullable<T>(field: BaseField<T>): BaseField<T | null> {
	const proxy = new Proxy(field, {
		get(target: BaseField<T>, p: string | symbol, receiver: any) {
			switch (p) {
				case "serialize":
					return (value: T | null): any => {
						if (value === null) {
							return null
						}

						return target.serialize(value)
					}
				case "deserialize":
					return (raw: any): T | null => {
						if (raw === null) {
							return null
						}

						return target.deserialize(raw)
					}
				default:
					return Reflect.get(target, p, receiver)
			}
		}
	})

	return proxy
}
