import type ISerializer from "./ISerializer"
import type SerializerField from "./field/SerializerField"


/**
 * Default class of object serializers.
 * Allows to serialize/deserialize objects with using typescript type guards.
 * @property {{[index: string]: SerializerField}} fields - Serializer fields.
 * @example
 * ```typescript
 * class Project {
 * 	readonly public id: number
 * 	readonly public title: string
 *
 * 	constructor(id: number, title: string) {
 * 		this.id = id
 * 		this.title = title
 * 	}
 * }
 *
 * class ProjectSerializer extends ObjectSerializer<Project> {
 * 	fields = {
 * 		id: NumberField(),
 * 		title: StringField(),
 * 	}
 *
 * 	makeObject(cleanedData: object): Project {
 * 		return new Project(...Object.values(cleanedData))
 * 	}
 * }
 *
 * const projectSerializer = new ProjectSerializer()
 * const project = projectSerializer.deserialize({id: 1, title: "MyProject"})
 * project.id === 1 && project.title === "MyProject"
 * ```
 * */
export default abstract class ObjectSerializer<T, C extends new (...args: any[]) => T> implements ISerializer<T> {
	public abstract readonly fields: {[index in keyof T]: SerializerField<T[keyof T]>}

	abstract makeObject(...cleanedData: ConstructorParameters<C>): T

	// @ts-expect-error
	serialize(obj: T): object | never {
		throw new Error("Serialization is not implemented")
	}

	deserialize(raw: any): T {
		const cleanedData: any = {}		// TODO: Set safe type

		for (const [name, field] of Object.entries(this.fields)) {
			try {
				cleanedData[name] = (field as SerializerField<T[keyof T]>).deserialize(raw[name])
			} catch (error) {
				throw new Error(`Field: ${name}; ${(error as Error).message}`)
			}
		}

		return this.makeObject(...(Array.from(Object.values(cleanedData)) as ConstructorParameters<C>))
	}

	deserializeMany(raw: any): T[] {
		if (!Array.isArray(raw)) {
			throw new Error("Data is not array")
		}

		return raw.map(e => this.deserialize(e))
	}
}
