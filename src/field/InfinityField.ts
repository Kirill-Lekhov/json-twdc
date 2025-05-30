import BaseField from "./BaseField"


export default class InfinityField extends BaseField<number> {
	_serialize(value: number) {
		if (value === Infinity) {
			return null
		}

		return value
	}

	_deserialize(raw: any): number {
		if (raw === null) {
			return Infinity
		} else if (typeof raw === "number") {
			return raw
		}

		throw new Error(`${this.constructor.name}: Value must be of number type or null`)
	}
}
