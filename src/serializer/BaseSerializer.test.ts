import BaseSerializer from "./BaseSerializer"

import { describe, test, expect } from "vitest"


class TestSerializer extends BaseSerializer<string> {
	serialize(value: string): any {
		return value
	}

	deserialize(raw: any): string {
		return String(raw)
	}
}


describe("BaseSerializer class", () => {
	test("deserializeMany method", () => {
		const serializer = new TestSerializer()

		expect(serializer.deserializeMany([])).toStrictEqual([])
		expect(serializer.deserializeMany(["1", "2", "3"])).toStrictEqual(["1", "2", "3"])
		expect(() => serializer.deserializeMany("[1, 2, 3]")).toThrowError("TestSerializer: Value must be of array type")
	})
})
