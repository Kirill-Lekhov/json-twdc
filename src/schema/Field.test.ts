import { AnyField, BooleanField, DateField, InfinityField, NumberField, StringField } from "../field"
import Field from "./Field"

import { describe, expect, test } from "vitest"


describe("Field function", () => {
	test("any field making", () => {
		expect(Field({ type: "any" })).instanceOf(AnyField)
	})
	test("infinity field making", () => {
		expect(Field({ type: "infinity" })).instanceOf(InfinityField)
	})
	test("string field making", () => {
		expect(Field({ type: "string" })).instanceOf(StringField)
		expect(Field({ type: "string", nullable: false })).instanceOf(StringField)
		expect(() => Field({ type: "string", nullable: false }).deserialize(null)).toThrow()
		expect(Field({ type: "string", nullable: true })).instanceOf(StringField)
		expect(Field({ type: "string", nullable: true }).deserialize(null)).toBeNull()
	})
	test("number field making", () => {
		expect(Field({ type: "number" })).instanceOf(NumberField)
		expect(Field({ type: "number", nullable: false })).instanceOf(NumberField)
		expect(() => Field({ type: "number", nullable: false }).deserialize(null)).toThrow()
		expect(Field({ type: "number", nullable: true })).instanceOf(NumberField)
		expect(Field({ type: "number", nullable: true }).deserialize(null)).toBeNull()
	})
	test("boolean field making", () => {
		expect(Field({ type: "boolean" })).instanceOf(BooleanField)
		expect(Field({ type: "boolean", nullable: false })).instanceOf(BooleanField)
		expect(() => Field({ type: "boolean", nullable: false }).deserialize(null)).toThrow()
		expect(Field({ type: "boolean", nullable: true })).instanceOf(BooleanField)
		expect(Field({ type: "boolean", nullable: true }).deserialize(null)).toBeNull()
	})
	test("date field making", () => {
		expect(Field({ type: "date" })).instanceOf(DateField)
		expect(Field({ type: "date", nullable: false })).instanceOf(DateField)
		expect(() => Field({ type: "date", nullable: false }).deserialize(null)).toThrow()
		expect(Field({ type: "date", nullable: true })).instanceOf(DateField)
		expect(Field({ type: "date", nullable: true }).deserialize(null)).toBeNull()
	})
	test("unknown type will throw an error", () => {
		// @ts-expect-error
		expect(() => Field({ type: "UNKNOWN" })).toThrowError(new Error("Unknown field type: UNKNOWN"))
	})
})
