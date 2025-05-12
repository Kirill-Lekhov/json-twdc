import SerializerField from "./SerializerField"


/**
 * Similar with NumberField but represents raw null value as Infinity.
 *
 * @returns {_InfinityField} - InfinityField instance.
 */
export default function InfinityField(): _InfinityField {
	return new _InfinityField()
}


class _InfinityField extends SerializerField<number, false> {
	constructor() {
		super(false)
	}

	public deserialize(value: any): number {
		return this._deserialize(value)
	}

	protected _deserialize(value: any): number {
		if (typeof value === "number") {
			return value
		} else if (value === null) {
			return Infinity
		}

		throw new Error(`${this.constructor.name}: Unexpected type of value ${value}`)
	}
}
