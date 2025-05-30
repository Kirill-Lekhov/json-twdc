import AnyField from "./AnyField"

import { describe, test, expect } from "vitest"


describe("AnyField class", () => {
	test("_serialize method", () => {
		const field = new AnyField({})

		expect(field._serialize(null)).toBeNull()
		expect(field._serialize("string")).toBe("string")
		expect(field._serialize(5)).toBe(5)
		expect(field._serialize({ name: "John" })).toStrictEqual({ name: "John" })
		expect(field._serialize([1, 2, 3, 4])).toStrictEqual([1, 2, 3, 4])
	})

	test("_deserialize method", () => {
		const field = new AnyField({})

		expect(field._deserialize(null)).toBeNull()
		expect(field._deserialize("string")).toBe("string")
		expect(field._deserialize(5)).toBe(5)
		expect(field._deserialize({ name: "John" })).toStrictEqual({ name: "John" })
		expect(field._deserialize([1, 2, 3, 4])).toStrictEqual([1, 2, 3, 4])
	})
})
