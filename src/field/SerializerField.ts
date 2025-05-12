/**
 * Basic abstract class of Serializer field.
 * Do not use without external constructor.
 * Please, see StringField for details.
 */
export default abstract class SerializerField<T, Nullable extends boolean = false> {
	public readonly nullable: boolean

	constructor(nullable: boolean = false) {
		this.nullable = nullable
	}

	protected abstract _deserialize(value: any): T

	deserialize(value: any): Nullable extends true ? T | null : T {
		if (value === null) {
			if (this.nullable) {
				return null as Nullable extends true ? T | null : T
			} else {
				throw new Error(`${this.constructor.name}: Null values are not allowed`)
			}
		}

		return this._deserialize(value)
	}
}
