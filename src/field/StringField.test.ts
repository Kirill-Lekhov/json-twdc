import StringField from "./StringField"

import { describe, test, expect } from "vitest"


describe("StringField class", () => {
	test("_serialize method", () => {
		const field = new StringField({})

		expect(field._serialize("text")).toBe("text")
	})

	test("_deserialize method", () => {
		const field = new StringField({})

		expect(field._deserialize("text")).toBe("text")
		expect(() => field._deserialize(111)).toThrowError(new Error("StringField: Unexpected type of value 111"))
	})
})
