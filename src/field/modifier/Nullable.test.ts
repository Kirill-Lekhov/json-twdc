import Nullable from "./Nullable"
import BaseField from "../BaseField"

import { describe, test, expect } from "vitest"


class TestField extends BaseField<string> {
	_serialize(value: string): any {
		return value
	}

	_deserialize(raw: any): string {
		if (typeof raw !== "string") {
			throw new Error("Value must be of string type")
		}

		return raw
	}

	echo(message: string): string {
		return message
	}
}


describe("Nullable function", ()=> {
	test("serialize method", () => {
		const field = new TestField({})
		const nullableField = Nullable(field)

		expect(nullableField.serialize(null)).toBeNull()
		expect(nullableField.serialize("Hello World")).toBe("Hello World")
	})

	test("deserialize method", () => {
		const field = new TestField({})
		const nullableField = Nullable(field)

		expect(nullableField.deserialize(null)).toBeNull()
		expect(nullableField.deserialize("Hello World")).toBe("Hello World")
		expect(() => nullableField.deserialize(5)).toThrowError(new Error("Value must be of string type"))
	})

	test("other methods are untouched", () => {
		const field = new TestField({})
		const nullableField = Nullable(field)

		expect((nullableField as TestField).echo("MESSAGE")).toBe("MESSAGE")
	})
})
