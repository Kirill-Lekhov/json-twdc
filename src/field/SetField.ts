import type ISerializer from "../serializer/ISerializer"
import BaseField from "./BaseField"
import type _IOptions from "./IOptions"


export interface IOptions<T> extends _IOptions {
	serializer: ISerializer<T>
}


export default class SetField<T> extends BaseField<Set<T>, IOptions<T>> {
	_serialize(value: Set<T>): any {
		const result = []

		for (const item of value.values()) {
			result.push(this.options.serializer.serialize(item))
		}

		return result
	}

	_deserialize(raw: any): Set<T> {
		if (!Array.isArray(raw)) {
			throw new Error(`${this.constructor.name}: Unexpected type of value ${raw}`)
		}

		return new Set(raw.map((e: any) => this.options.serializer.deserialize(e)))
	}
}
