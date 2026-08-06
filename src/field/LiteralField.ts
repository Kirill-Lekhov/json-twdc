import BaseField from "./BaseField"
import type _IOptions from "./IOptions"


type LiteralTypes = string | number | boolean | null


export interface IOptions<T extends LiteralTypes> extends _IOptions {
	value: T
}


export default class LiteralField<T extends LiteralTypes> extends BaseField<T, IOptions<T>> {
	_serialize(value: T): any {
		return value
	}

	_deserialize(raw: any): T {
		if (raw !== this.options.value) {
			throw new Error(`${this.constructor.name}: Invalid value ${raw}, expected ${this.options.value}`)
		}

		return raw
	}
}
