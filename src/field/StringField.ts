import BaseField from "./BaseField"


export default class StringField extends BaseField<string> {
	_serialize(value: string): any {
		return value
	}

	_deserialize(raw: any): string {
		if (typeof raw !== "string") {
			throw new Error(`${this.constructor.name}: Unexpected type of value ${raw}`)
		}

		return raw
	}
}
