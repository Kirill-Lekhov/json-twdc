import SetField from "./SetField"
import StringField from "./StringField"

import { describe, test, expect } from "vitest"


describe("SetField class", () => {
	test("_serialize method", () => {
		const childField = new StringField({})
		const field = new SetField({ serializer: childField })

		expect(field._serialize(new Set())).toStrictEqual([])
		expect(field._serialize(new Set(["1", "2", "3"]))).toStrictEqual(["1", "2", "3"])
	})

	test("_deserialize method", () => {
		const childField = new StringField({})
		const field = new SetField({ serializer: childField })

		expect(field._deserialize([])).toStrictEqual(new Set())
		expect(field._deserialize(["1", "2", "3"])).toStrictEqual(new Set(["1", "2", "3"]))
		expect(field._deserialize(["1", "1", "2", "2", "3", "3"])).toStrictEqual(new Set(["1", "2", "3"]))
		expect(() => field._deserialize("[1, 2, 3]")).toThrowError(new Error("SetField: Unexpected type of value [1, 2, 3]"))
		expect(() => field._deserialize([1, 2, 3])).toThrowError(new Error("StringField: Unexpected type of value 1"))
	})
})
