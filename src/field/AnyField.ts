import SerializerField from "./SerializerField"


export default function AnyField(): _AnyField {
	return new _AnyField()
}


class _AnyField extends SerializerField<any, true> {
	constructor() {
		super(true)
	}

	protected _deserialize(value: any): any {
		return value
	}
}
