import type ISerializer from "../serializer/ISerializer"
import type IOptions from "./IOptions"


export default abstract class BaseField<T, O extends IOptions = IOptions> implements ISerializer<T> {
	public readonly options: O

	constructor(options: O) {
		this.options = options
	}

	abstract _serialize(value: T): any
	abstract _deserialize(raw: any): T

	serialize(value: T): any {
		return this._serialize(value)
	}

	deserialize(raw: any): T {
		return this._deserialize(raw)
	}
}
