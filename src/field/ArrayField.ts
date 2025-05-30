import type ISerializer from "../serializer/ISerializer"
import BaseField from "./BaseField"
import type _IOptions from "./IOptions"


export interface IOptions<T> extends _IOptions {
	serializer: ISerializer<T>
}


export default class ArrayField<T> extends BaseField<T[], IOptions<T>> {
	_serialize(value: T[]): any {
		const result = []

		for (const item of value) {
			result.push(this.options.serializer.serialize(item))
		}

		return value
	}

	_deserialize(raw: any): T[] {
		if (!Array.isArray(raw)) {
			throw new Error(`${this.constructor.name}: Unexpected type of value ${raw}`)
		}

		return raw.map((e: any) => this.options.serializer.deserialize(e))
	}
}
