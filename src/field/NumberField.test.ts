import NumberField from "./NumberField"

import { describe, test, expect } from "vitest"


describe("NumberField class", () => {
	test("_serialize method", () => {
		const field = new NumberField({})

		expect(field._serialize(6)).toBe(6)
	})

	test("_deserialize method", () => {
		const field = new NumberField({})

		expect(field._deserialize(6)).toBe(6)
		expect(() => field._deserialize("6")).toThrowError(new Error("NumberField: Value must be of number type"))
	})
})
