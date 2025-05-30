import BooleanField from "./BooleanField"

import { describe, test, expect } from "vitest"


describe("BooleanField class", () => {
	test("_serialize method", () => {
		const field = new BooleanField({})

		expect(field._serialize(true)).toBeTruthy()
		expect(field._serialize(false)).toBeFalsy()
	})

	test("_deserialize method", () => {
		const field = new BooleanField({})

		expect(field._deserialize(true)).toBeTruthy()
		expect(field._deserialize(false)).toBeFalsy()
		expect(() => field._deserialize("false")).toThrowError("BooleanField: Value must be of boolean type")
	})
})
