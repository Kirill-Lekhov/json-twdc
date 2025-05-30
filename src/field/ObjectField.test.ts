import { ObjectSerializer } from "../serializer"
import ObjectField from "./ObjectField"

import { describe, test, expect } from "vitest"
import StringField from "./StringField"
import NumberField from "./NumberField"


class Person {
	public firstName: string
	public age: number

	constructor(firstName: string, age: number) {
		this.firstName = firstName
		this.age = age
	}
}


class PersonSerializer extends ObjectSerializer<typeof Person> {
	public builder = Person
	public fields = {
		firstName: new StringField({}),
		age: new NumberField({}),
	}
}


describe("ObjectField class", () => {
	test("_serialize method", () => {
		const field = new ObjectField({ serializer: new PersonSerializer() })

		expect(field._serialize(new Person("John", 22))).toStrictEqual({ firstName: "John", age: 22 })
	})

	test("_deserialize method", () => {
		const field = new ObjectField({ serializer: new PersonSerializer() })

		expect(field._deserialize({ firstName: "John", age: 22 })).toStrictEqual(new Person("John", 22))
	})
})
