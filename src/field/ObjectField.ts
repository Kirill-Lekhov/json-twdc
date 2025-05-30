import BaseField from "./BaseField"
import type ISerializer from "../serializer/ISerializer"
import type _IOptions from "./IOptions"


export interface IOptions<T extends object> extends _IOptions {
	serializer: ISerializer<T>
}


export default class ObjectField<T extends object> extends BaseField<T, IOptions<T>> {
	_serialize(value: T): any {
		return this.options.serializer.serialize(value)
	}

	_deserialize(raw: any): T {
		return this.options.serializer.deserialize(raw)
	}
}
