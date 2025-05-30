import RecordSerializer from "./RecordSerializer"
import { NumberField, StringField } from "../field"

import { describe, test, expect } from "vitest"


class AttendanceSerializer extends RecordSerializer<Record<string, number>> {
	public keysSerializer = new StringField({})
	public valuesSerializer = new NumberField({})
}


describe("RecordSerializer class", () => {
	test("serialize", () => {
		const serializer = new AttendanceSerializer()

		expect(serializer.serialize({})).toStrictEqual({})
		expect(serializer.serialize({ "Doe": 1, "Eden": 2, "Ivanov": 0 })).toStrictEqual({ Doe: 1, Eden: 2, Ivanov: 0 })
	})

	test("deserialize", () => {
		const serializer = new AttendanceSerializer()

		expect(serializer.deserialize({})).toStrictEqual({})
		expect(serializer.deserialize({ "Doe": 1, "Eden": 2, "Ivanov": 0 })).toStrictEqual({ Doe: 1, Eden: 2, Ivanov: 0 })
		expect(() => serializer.deserialize(1)).toThrowError(new Error("AttendanceSerializer: Value is not object"))
		expect(() => serializer.deserialize(null)).toThrowError(new Error("AttendanceSerializer: Value is not object"))
		expect(() => serializer.deserialize({ "Doe": null }))
		.toThrowError(new Error(
			"AttendanceSerializer: Value deserialization error - Error: NumberField: Value must be of number type"
		))
	})
})
