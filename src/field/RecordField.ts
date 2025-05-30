import type ISerializer from "../serializer/ISerializer"
import BaseField from "./BaseField"
import type _IOptions from "./IOptions"


type AnyRecord = Record<string | number | symbol, any>


export interface IOptions<T extends AnyRecord> extends _IOptions {
	serializer: ISerializer<T>
}


export default class RecordField<T extends AnyRecord> extends BaseField<T, IOptions<T>> {
	_serialize(value: T): any {
		return this.options.serializer.serialize(value)
	}

	_deserialize(raw: any): T {
		return this.options.serializer.deserialize(raw)
	}
}
