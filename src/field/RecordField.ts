import SerializerField from "./SerializerField"
import type ISerializer from "../ISerializer"


type AnyRecord = Record<string | number | symbol, any>


export default function RecordField<T extends AnyRecord>(
	serializer: ISerializer<T>, nullable: true,
): _RecordField<T, true>
export default function RecordField<T extends AnyRecord>(
	serializer: ISerializer<T>, nullable?: false,
): _RecordField<T, false>
export default function RecordField<T extends AnyRecord>(
	serializer: ISerializer<T>, nullable: boolean = false,
): _RecordField<T, true> | _RecordField<T, false> {
	const field = new _RecordField(serializer, nullable)

	if (nullable) {
		return field as _RecordField<T, true>
	} else {
		return field as _RecordField<T, false>
	}
}


class _RecordField<T extends AnyRecord, Nullable extends boolean> extends SerializerField<T, Nullable> {
	public serializer: ISerializer<T>

	constructor(serializer: ISerializer<T>, nullable = false) {
		super(nullable)

		this.serializer = serializer
	}

	protected _deserialize(value: any): T {
		return this.serializer.deserialize(value)
	}
}
