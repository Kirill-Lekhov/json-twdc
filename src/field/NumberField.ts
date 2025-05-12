import SerializerField from "./SerializerField"


export default function NumberField(nullable: true): _NumberField<true>
export default function NumberField(nullable?: false): _NumberField<false>
export default function NumberField(nullable: boolean = false): _NumberField<true> | _NumberField<false> {
	const field = new _NumberField(nullable)

	if (nullable) {
		return field as _NumberField<true>
	} else {
		return field as _NumberField<false>
	}
}


class _NumberField<Nullable extends boolean> extends SerializerField<number, Nullable> {
	protected _deserialize(value: any): number {
		if (typeof value !== "number") {
			throw new Error(`${this.constructor.name}: Unexpected type of value ${value}`)
		}

		return value
	}
}
