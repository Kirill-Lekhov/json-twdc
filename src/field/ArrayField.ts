import SerializerField from "./SerializerField"


export default function ArrayField<T>(child: SerializerField<T>, nullable: true): _ArrayField<T, true>
export default function ArrayField<T>(child: SerializerField<T>, nullable?: false): _ArrayField<T, false>
export default function ArrayField<T>(
	child: SerializerField<T>, nullable: boolean = false,
): _ArrayField<T, true> | _ArrayField<T, false> {
	const field = new _ArrayField(child, nullable)

	if (nullable) {
		return field as _ArrayField<T, true>
	} else {
		return field as _ArrayField<T, false>
	}
}


class _ArrayField<T, Nullable extends boolean> extends SerializerField<T[], Nullable> {
	public child: SerializerField<T>

	constructor(child: SerializerField<T>, nullable = false) {
		super(nullable)
		this.child = child
	}

	protected _deserialize(value: any): T[] {
		if (!Array.isArray(value)) {
			throw new Error(`${this.constructor.name}: Unexpected type of value ${value}`)
		}

		return value.map((e: unknown) => this.child.deserialize(e))
	}
}
