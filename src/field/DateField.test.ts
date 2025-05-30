import DateField from "./DateField"

import { describe, test, expect } from "vitest"


describe("DateField class", () => {
	test("_serialize method", () => {
		const field = new DateField({})

		expect(field._serialize(new Date("2025-01-01T12:30:30"))).toBe("2025-01-01T12:30:30.000Z")
	})

	test("_deserialize method", () => {
		const field = new DateField({})

		expect(field._deserialize("2025-01-01")).toStrictEqual(new Date("2025-01-01T00:00:00"))
		expect(field._deserialize("2025-01-01T12:30:30")).toStrictEqual(new Date("2025-01-01T12:30:30"))
		expect(field._deserialize("2025-01-01T12:30:30.000Z")).toStrictEqual(new Date("2025-01-01T12:30:30"))
		expect(field._deserialize("2025-01-01T12:30:30-07:00")).toStrictEqual(new Date("2025-01-01T19:30:30"))
		expect(field._deserialize("2025-01-01T12:30:30-07:00:27")).toStrictEqual(new Date("2025-01-01T19:30:30"))
		expect(field._deserialize("2025-01-01T12:30:30+04:00:27")).toStrictEqual(new Date("2025-01-01T08:30:30"))
		expect(field._deserialize("2025-01-01T12:30:30+04:00:27")).toStrictEqual(new Date("2025-01-01T08:30:30"))
		expect(() => field._deserialize(15)).toThrowError(new Error("DateField: Unexpected type of raw 15"))
	})
})
