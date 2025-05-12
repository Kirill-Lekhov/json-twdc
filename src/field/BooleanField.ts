import SerializerField from "./SerializerField"


export default function BooleanField(nullable: true): _BooleanField<true>
export default function BooleanField(nullable?: false): _BooleanField<false>
export default function BooleanField(nullable: boolean = false): _BooleanField<true> | _BooleanField<false> {
	const field = new _BooleanField(nullable)

	if (nullable) {
		return field as _BooleanField<true>
	} else {
		return field as _BooleanField<false>
	}
}


class _BooleanField<Nullable extends boolean> extends SerializerField<boolean, Nullable> {
	protected _deserialize(value: any): boolean {
		if (typeof value !== "boolean") {
			throw new Error(`${this.constructor.name}: Unexpected type of value ${value}`)
		}

		return value
	}
}
