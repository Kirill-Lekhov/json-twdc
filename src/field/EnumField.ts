import BaseField from "./BaseField"
import type _IOptions from "./IOptions"
import { getKeyByValue } from "../generic/enumeration"


export interface IOptions<T extends object> extends _IOptions {
	enumeration: T
}


export default class EnumField<T extends object> extends BaseField<T[keyof T], IOptions<T>> {
	_serialize(value: T[keyof T]): any {
		return value
	}

	_deserialize(raw: any): T[keyof T] {
		let enumKey = getKeyByValue(this.options.enumeration, raw)

		if (enumKey === null || typeof this.options.enumeration[enumKey] === "function") {
			throw new Error(`${this.constructor.name}: Unexpected enum value ${raw}`)
		}

		return this.options.enumeration[enumKey]
	}
}
