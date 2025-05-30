import { RecordSerializer } from "../serializer"
import RecordField from "./RecordField"
import StringField from "./StringField"
import NumberField from "./NumberField"

import { describe, test, expect } from "vitest"


class AttendanceSerializer extends RecordSerializer<Record<string, number>> {
	public keysSerializer = new StringField({})
	public valuesSerializer = new NumberField({})
}


describe("RecordField class", () => {
	test("_serialize method", () => {
		const field = new RecordField({ serializer: new AttendanceSerializer() })

		expect(field._serialize({})).toStrictEqual({})
		expect(field._serialize({ "Doe": 1, "Eden": 2, "Ivanov": 0 })).toStrictEqual({ Doe: 1, Eden: 2, Ivanov: 0 })
	})

	test("_deserialize method", () => {
		const field = new RecordField({ serializer: new AttendanceSerializer() })

		expect(field._deserialize({})).toStrictEqual({})
		expect(field._deserialize({ Doe: 1, Eden: 2, Ivanov: 0 })).toStrictEqual({ "Doe": 1, "Eden": 2, "Ivanov": 0 })
	})
})
