import EnumField from "./EnumField"

import { describe, test, expect } from "vitest"


enum IndicatorType {
	POWER = 1,
	INTELLIGENCE,
	DEXTERITY
}


describe("EnumField class", () => {
	test("_serialize method", () => {
		const field = new EnumField({ enumeration: IndicatorType })

		expect(field._serialize(IndicatorType.POWER)).toBe(1)
		expect(field._serialize(IndicatorType.INTELLIGENCE)).toBe(2)
		expect(field._serialize(IndicatorType.DEXTERITY)).toBe(3)
	})

	test("_deserialize method", () => {
		const field = new EnumField({ enumeration: IndicatorType })

		expect(field._deserialize(1)).toBe(IndicatorType.POWER)
		expect(field._deserialize(2)).toBe(IndicatorType.INTELLIGENCE)
		expect(field._deserialize(3)).toBe(IndicatorType.DEXTERITY)
		expect(() => field._deserialize("UNKNOWN")).toThrowError(new Error("EnumField: Unexpected enum value UNKNOWN"))
	})
})
