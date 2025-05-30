import InfinityField from "./InfinityField"

import { describe, test, expect } from "vitest"


describe("InfinityField class", () => {
	test("_serialize method", () => {
		const field = new InfinityField({})

		expect(field._serialize(Infinity)).toBeNull()
		expect(field._serialize(2007)).toBe(2007)
	})

	test("_deserialize method", () => {
		const field = new InfinityField({})

		expect(field._deserialize(null)).toBe(Infinity)
		expect(field._deserialize(2007)).toBe(2007)
		expect(() => field._deserialize("2007")).toThrowError(new Error("InfinityField: Value must be of number type or null"))
	})
})
