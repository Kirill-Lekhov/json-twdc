import SerializerField from "./SerializerField"


export default function StringField(nullable: true): _StringField<true>
export default function StringField(nullable?: false): _StringField<false>
export default function StringField(nullable: boolean = false): _StringField<true> | _StringField<false> {
	const field = new _StringField(nullable)

	if (nullable) {
		return field as _StringField<true>
	} else {
		return field as _StringField<false>
	}
}


class _StringField<Nullable extends boolean> extends SerializerField<string, Nullable> {
	_deserialize(value: any): string {
		if (typeof value !== "string") {
			throw new Error(`${this.constructor.name}: Unexpected type of value ${value}`)
		}

		return value
	}
}
