import SerializerField from "../field/SerializerField"


/**
 * Marks field as optional which allows to skip field during serialization/deserialization.
 *
 * @template {any} T - Type of deserialized value of child field.
 * @param {SerializerField<T>} child - Serializer field to wrap.
 * @returns {_Optional<T>} - Serializer field marked as optional.
 */
export default function Optional<T>(child: SerializerField<T>): _Optional<T> {
	return new _Optional(child)
}


class _Optional<T> extends SerializerField<T | undefined, false> {
	protected readonly _child: SerializerField<T>

	constructor(child: SerializerField<T>) {
		super(false)

		this._child = child
	}

	protected _deserialize(value: any): T | undefined {
		if (value === undefined) {
			return undefined
		}

		return this._child.deserialize(value)
	}
}
