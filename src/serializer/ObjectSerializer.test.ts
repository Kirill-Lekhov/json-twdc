import ObjectSerializer from "./ObjectSerializer"
import { Field } from "../schema"

import { describe, test, expect } from "vitest"


class User {
	public username: string
	public joinedAt: Date
	public note?: string

	constructor(username: string, joinedAt: Date, note?: string) {
		this.username = username
		this.joinedAt = joinedAt
		this.note = note
	}
}


class UserSerializer extends ObjectSerializer<typeof User> {
	public builder = User
	public fields = {
		username: Field({ type: "string" }),
		joinedAt: Field({ type: "date", alias: "joined_at" }),
		note: Field({ type: "string", optional: true }),
	}
}


describe("ObjectSerializer class", () => {
	test("serialize method", () => {
		const serializer = new UserSerializer()

		expect(serializer.serialize(new User("JohnDoe", new Date("2007-01-01T00:00:00.000Z")))).toStrictEqual({
			username: "JohnDoe",
			joined_at: "2007-01-01T00:00:00.000Z",
		})
		expect(serializer.serialize(new User("JohnDoe", new Date("2007-01-01T00:00:00.000Z"), "NOTE"))).toStrictEqual({
			username: "JohnDoe",
			joined_at: "2007-01-01T00:00:00.000Z",
			note: "NOTE",
		})
	})

	test("deserialize method", () => {
		const serializer = new UserSerializer()

		expect(serializer.deserialize({ username: "JohnDoe", joined_at: "2007-01-01T00:00:00.000Z" }))
		.toStrictEqual(new User("JohnDoe", new Date("2007-01-01T00:00:00.000Z")))
		expect(serializer.deserialize({ username: "JohnDoe", joined_at: "2007-01-01T00:00:00.000Z", note: "NOTE" }))
		.toStrictEqual(new User("JohnDoe", new Date("2007-01-01T00:00:00.000Z"), "NOTE"))

		expect(() => serializer.deserialize({})).toThrowError(new Error("Field: username; StringField: Unexpected type of value undefined"))
	})
})
