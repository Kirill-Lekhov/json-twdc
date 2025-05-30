import BaseField from "./BaseField"

import { describe, test, expect, vi } from "vitest"


class TestField extends BaseField<boolean> {
	_serialize(value: boolean) {
		return value
	}

	_deserialize(raw: any): boolean {
		if (typeof raw !== "boolean") {
			throw new Error("Value is not of boolean type")
		}

		return raw
	}
}


describe("BaseField class", () => {
	test("constructor", () => {
		let field = new TestField({ })

		expect(field.options).toStrictEqual({})

		field = new TestField({ optional: true, alias: "enabled" })
		expect(field.options).toStrictEqual({ optional: true, alias: "enabled" })
	})

	test("_serialize method", () => {
		const field = new TestField({})
		const serializeMethodSpy = vi.spyOn(field, "_serialize")

		expect(field.serialize(true)).toBe(true)
		expect(serializeMethodSpy).toBeCalled()
	})

	test("_deserialize method", () => {
		const field = new TestField({})
		const deserializeMethodSpy = vi.spyOn(field, "_deserialize")

		expect(field.deserialize(true)).toBe(true)
		expect(deserializeMethodSpy).toBeCalled()
	})
})
