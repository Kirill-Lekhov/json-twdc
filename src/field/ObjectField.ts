import SerializerField from "./SerializerField"
import type ISerializer from "../ISerializer"


export default function ObjectField<T>(serializer: ISerializer<T>, nullable: true): _ObjectField<T, true>
export default function ObjectField<T>(serializer: ISerializer<T>, nullable?: false): _ObjectField<T, false>
export default function ObjectField<T>(
	serializer: ISerializer<T>, nullable: boolean = false,
): _ObjectField<T, true> | _ObjectField<T, false> {
	const field = new _ObjectField(serializer, nullable)

	if (nullable) {
		return field as _ObjectField<T, true>
	} else {
		return field as _ObjectField<T, false>
	}
}


class _ObjectField<T, Nullable extends boolean> extends SerializerField<T, Nullable> {
	public serializer: ISerializer<T>

	constructor(serializer: ISerializer<T>, nullable = false) {
		super(nullable)

		this.serializer = serializer
	}

	protected _deserialize(value: any): T {
		return this.serializer.deserialize(value)
	}
}
