import BaseField from "./BaseField"


export default class AnyField extends BaseField<any> {
	_serialize(value: any) {
		return value
	}

	_deserialize(raw: any) {
		return raw
	}
}
