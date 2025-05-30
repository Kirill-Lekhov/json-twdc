import { getKeyByValue } from "./enumeration"

import { describe, test, expect } from "vitest"


enum StrEnum {
	KEY_1 = "VALUE_1",
	KEY_2 = "VALUE_2",
	KEY_3 = "VALUE_3",
}
enum NumberField {
	KEY_1 = 1,
	KEY_2 = 2,
	KEY_3 = 3,
}


describe("getKeyByValue function", () => {
	test("str enums are allowed", () => {
		expect(getKeyByValue(StrEnum, "VALUE_1")).toBe("KEY_1")
		expect(getKeyByValue(StrEnum, "VALUE_2")).toBe("KEY_2")
		expect(getKeyByValue(StrEnum, "VALUE_3")).toBe("KEY_3")
		expect(getKeyByValue(StrEnum, "UNKNOWN")).toBeNull()
	})

	test("int enums are allowed", () => {
		expect(getKeyByValue(NumberField, 1)).toBe("KEY_1")
		expect(getKeyByValue(NumberField, 2)).toBe("KEY_2")
		expect(getKeyByValue(NumberField, 3)).toBe("KEY_3")
		expect(getKeyByValue(NumberField, -1)).toBeNull()
	})
})
