import BaseSerializer from "./BaseSerializer"
import type BaseField from "../field/BaseField"


type InstanceKeys<T extends new (...args: any) => InstanceType<T>> = keyof InstanceType<T>
type InstanceBaseFields<T extends new (...args: any) => InstanceType<T>> = BaseField<InstanceType<T>[InstanceKeys<T>]>


/**
 * Allows to transform objects into objects of a certain class.
 *
 * Limitations:
 * * Constructor must have the same arguments as the attributes specified in class body.
 * * When creating a serializer, the order of the fields must match the order of the constructor arguments.
 *
 * @example
 * ```typescript
 * class User {
 * 	public username: string
 * 	public joinedAt: Date
 * 	public note?: string
 *
 * 	constructor(username: string, joinedAt: Date, note?: string) {
 * 		this.username = username
 * 		this.joinedAt = joinedAt
 * 		this.note = note
 * 	}
 * }
 *
 *
 *  class UserSerializer extends ObjectSerializer<typeof User> {
 * 	public builder = User
 * 	public fields = {
 * 		username: Field({ type: "string" }),
 * 		joinedAt: Field({ type: "date", alias: "joined_at" }),
 * 		note: Field({ type: "string", optional: true }),
 * 	}
 * }
 *
 * const serializer = new UserSerialize()
 * const user = serializer.deserialize({ username: "JohnDoe", joined_at: "2025-01-01T12:30:30.000Z" })		// User
 * ```
 */
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
