import InterfaceSerializer from "./InterfaceSerializer"
import { Field } from "../schema"

import { describe, test, expect } from "vitest"


interface User {
	username: string
	joinedAt: Date
	note?: string
}


class UserSerializer extends InterfaceSerializer<User> {
	fields = {
		username: Field({ type: "string" }),
		joinedAt: Field({ type: "date", alias: "joined_at" }),
		note: Field({ type: "string", optional: true })
	}
}


describe("InterfaceSerializer class", () => {
	test("serialize method", () => {
		const serializer = new UserSerializer()
		expect(
			serializer.serialize({ username: "JohnDoe", joinedAt: new Date("2007-01-01T00:00:00") })
		).toStrictEqual({ username: "JohnDoe", joined_at: "2007-01-01T00:00:00.000Z" })
		expect(
			serializer.serialize({ username: "JohnDoe", joinedAt: new Date("2007-01-01T00:00:00"), note: "User note" })
		).toStrictEqual({ username: "JohnDoe", joined_at: "2007-01-01T00:00:00.000Z", note: "User note" })
		expect(
			serializer.serialize({
				username: "JohnDoe",
				joinedAt: new Date("2007-01-01T00:00:00"),
				note: "User note",
				code: 676,
			} as User & { code: number })
		).toStrictEqual({ username: "JohnDoe", joined_at: "2007-01-01T00:00:00.000Z", note: "User note" })
	})

	test("deserialize method", () => {
		const serializer = new UserSerializer()
		expect(
			serializer.deserialize({ username: "JohnDoe", joined_at: "2007-01-01T00:00:00.000Z" })
		).toStrictEqual({ username: "JohnDoe", joinedAt: new Date("2007-01-01T00:00:00") })
		expect(
			serializer.deserialize({ username: "JohnDoe", joined_at: "2007-01-01T00:00:00.000Z", note: "User note" })
		).toStrictEqual({ username: "JohnDoe", joinedAt: new Date("2007-01-01T00:00:00"), note: "User note" })
		expect(
			serializer.deserialize({ username: "JohnDoe", joined_at: "2007-01-01T00:00:00.000Z", note: "User note", code: 676 })
		).toStrictEqual({ username: "JohnDoe", joinedAt: new Date("2007-01-01T00:00:00"), note: "User note" })
		expect(() => serializer.deserialize({})).toThrowError(new Error("Field: username; StringField: Unexpected type of value undefined"))
	})
})
