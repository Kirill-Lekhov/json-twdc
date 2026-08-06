import LiteralField from "./LiteralField"

import { describe, test, expect } from "vitest"


describe("LiteralField class", () => {
	test("_serialize method", () => {
		const booleanLiteralField = new LiteralField({ value: true })
		expect(booleanLiteralField._serialize(true)).toBeTruthy()

		const stringLiteralField = new LiteralField({ value: "hello" })
		expect(stringLiteralField._serialize("hello")).toBe("hello")

		const numberLiteralField = new LiteralField({ value: 123 })
		expect(numberLiteralField._serialize(123)).toBe(123)

		const nullLiteralField = new LiteralField({ value: null })
		expect(nullLiteralField._serialize(null)).toBeNull()
	})

	test("_deserialize method", () => {
		const booleanLiteralField = new LiteralField({ value: true })

		expect(booleanLiteralField._deserialize(true)).toBeTruthy()
		expect(() => booleanLiteralField._deserialize("hello"))
			.toThrowError(new Error("LiteralField: Invalid value hello, expected true"))
		expect(() => booleanLiteralField._deserialize(123))
			.toThrowError(new Error("LiteralField: Invalid value 123, expected true"))
		expect(() => booleanLiteralField._deserialize(null))
			.toThrowError(new Error("LiteralField: Invalid value null, expected true"))

		const stringLiteralField = new LiteralField({ value: "hello" })

		expect(() => stringLiteralField._deserialize(true))
			.toThrowError(new Error("LiteralField: Invalid value true, expected hello"))
		expect(stringLiteralField._deserialize("hello")).toBe("hello")
		expect(() => stringLiteralField._deserialize(123))
			.toThrowError(new Error("LiteralField: Invalid value 123, expected hello"))
		expect(() => stringLiteralField._deserialize(null))
			.toThrowError(new Error("LiteralField: Invalid value null, expected hello"))

		const numberLiteralField = new LiteralField({ value: 123 })

		expect(() => numberLiteralField._deserialize(true))
			.toThrowError(new Error("LiteralField: Invalid value true, expected 123"))
		expect(() => numberLiteralField._deserialize("hello"))
			.toThrowError(new Error("LiteralField: Invalid value hello, expected 123"))
		expect(numberLiteralField._deserialize(123)).toBe(123)
		expect(() => numberLiteralField._deserialize(null))
			.toThrowError(new Error("LiteralField: Invalid value null, expected 123"))

		const nullLiteralField = new LiteralField({ value: null })

		expect(() => nullLiteralField._deserialize(true))
			.toThrowError(new Error("LiteralField: Invalid value true, expected null"))
		expect(() => nullLiteralField._deserialize("hello"))
			.toThrowError(new Error("LiteralField: Invalid value hello, expected null"))
		expect(() => nullLiteralField._deserialize(123))
			.toThrowError(new Error("LiteralField: Invalid value 123, expected null"))
		expect(nullLiteralField._deserialize(null)).toBeNull()
	})
})
