import BaseField from "./BaseField"


export default class BooleanField extends BaseField<boolean> {
	_serialize(value: boolean): any {
		return value
	}

	_deserialize(raw: any): boolean {
		if (typeof raw !== "boolean") {
			throw new Error(`${this.constructor.name}: Value must be of boolean type`)
		}

		return raw
	}
}
