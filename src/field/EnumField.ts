import SerializerField from "./SerializerField"
import { getKeyByValue } from "../generic/enumeration"


export default function EnumField<T extends object>(enumeration: T, nullable: true): _EnumField<T, true>
export default function EnumField<T extends object>(enumeration: T, nullable?: false): _EnumField<T, false>
export default function EnumField<T extends object>(
	enumeration: T, nullable: boolean = false,
): _EnumField<T, true> | _EnumField<T, false> {
	const field = new _EnumField(enumeration, nullable)

	if (nullable) {
		return field as _EnumField<T, true>
	} else {
		return field as _EnumField<T, false>
	}
}


class _EnumField<T extends object, Nullable extends boolean> extends SerializerField<T[keyof T], Nullable> {
	public enumeration: T

	constructor(enumeration: T, nullable = false) {
		super(nullable)
		this.enumeration = enumeration
	}

	protected _deserialize(value: any): T[keyof T] {
		let enumKey = getKeyByValue(this.enumeration, value)

		if (enumKey === null || typeof this.enumeration[enumKey] === "function") {
			throw new Error(`${this.constructor.name}: Unexpected enum value ${value}`)
		}

		return this.enumeration[enumKey] as T[keyof T]
	}
}
