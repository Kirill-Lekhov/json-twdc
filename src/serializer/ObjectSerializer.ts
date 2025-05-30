import BaseSerializer from "./BaseSerializer"
import type BaseField from "../field/BaseField"


type InstanceKeys<T extends new (...args: any) => InstanceType<T>> = keyof InstanceType<T>
type InstanceBaseFields<T extends new (...args: any) => InstanceType<T>> = BaseField<InstanceType<T>[InstanceKeys<T>]>


export default abstract class ObjectSerializer<T extends new (...args: any) => InstanceType<T>> extends BaseSerializer<InstanceType<T>> {
	public abstract readonly builder: T
	public abstract readonly fields: Record<InstanceKeys<T>, InstanceBaseFields<T>>

	serialize(value: InstanceType<T>): any {
		const result: {[index: string]: any} = {}

		for (const [attrName, field] of Object.entries(this.fields) as [InstanceKeys<T>, InstanceBaseFields<T>][]) {
			if (typeof attrName !== "string") {
				continue
			}

			if (value[attrName] === undefined && field.options.optional) {
				continue
			}

			result[field.options.alias ?? attrName] = field.serialize(value[attrName])
		}

		return result
	}

	deserialize(raw: any): InstanceType<T> {
		const constructorArgs: any[] = []

		for (const [attrName, field] of Object.entries(this.fields) as [InstanceKeys<T>, InstanceBaseFields<T>][]) {
			if (typeof attrName !== "string") {
				continue
			}

			const expectedAttrName = field.options.alias ?? attrName

			if (field.options.optional && raw[expectedAttrName] === undefined) {
				continue
			}

			try {
				constructorArgs.push(field.deserialize(raw[expectedAttrName]))
			} catch (error) {
				throw new Error(`Field: ${attrName}; ${(error as Error).message}`)
			}
		}

		return new this.builder(...constructorArgs)
	}
}
