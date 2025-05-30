import BaseField from "./BaseField"


export default class NumberField extends BaseField<number> {
	_serialize(value: number): any {
		return value
	}

	_deserialize(raw: any): number {
		if (typeof raw !== "number") {
			throw new Error(`${this.constructor.name}: Value must be of number type`)
		}

		return raw
	}
}
