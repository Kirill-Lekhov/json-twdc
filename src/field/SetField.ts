import SerializerField from "./SerializerField"


export default function SetField<T>(child: SerializerField<T>, nullable: true): _SetField<T, true>
export default function SetField<T>(child: SerializerField<T>, nullable?: false): _SetField<T, false>
export default function SetField<T>(
	child: SerializerField<T>, nullable: boolean = false,
): _SetField<T, true> | _SetField<T, false> {
	const field = new _SetField(child, nullable)

	if (nullable) {
		return field as _SetField<T, true>
	} else {
		return field as _SetField<T, false>
	}
}


class _SetField<T, Nullable extends boolean> extends SerializerField<Set<T>, Nullable> {
	public child: SerializerField<T>

	constructor(child: SerializerField<T>, nullable = false) {
		super(nullable)
		this.child = child
	}

	protected _deserialize(value: any): Set<T> {
		if (!Array.isArray(value)) {
			throw new Error(`${this.constructor.name}: Unexpected type of value ${value}`)
		}

		return new Set(value.map((e: unknown) => this.child.deserialize(e)))
	}
}
