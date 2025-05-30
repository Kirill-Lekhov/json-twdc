import ArrayField from "./ArrayField"
import StringField from "./StringField"

import { describe, test, expect } from "vitest"


describe("ArrayField class", () => {
	test("_serialize method", () => {
		const childField = new StringField({})
		const field = new ArrayField({ serializer: childField })

		expect(field._serialize([])).toStrictEqual([])
		expect(field._serialize(["1", "2", "3"])).toStrictEqual(["1", "2", "3"])
	})

	test("_deserialize method", () => {
		const childField = new StringField({})
		const field = new ArrayField({ serializer: childField })

		expect(field._deserialize([])).toStrictEqual([])
		expect(field._deserialize(["1", "2", "3"])).toStrictEqual(["1", "2", "3"])
		expect(() => field._deserialize("[1, 2, 3]")).toThrowError(new Error("ArrayField: Unexpected type of value [1, 2, 3]"))
		expect(() => field._deserialize([1, 2, 3])).toThrowError(new Error("StringField: Unexpected type of value 1"))
	})
})
