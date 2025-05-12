import SerializerField from "./SerializerField"


export default function DateField(nullable: true): _DateField<true>
export default function DateField(nullable?: false): _DateField<false>
export default function DateField(nullable: boolean = false): _DateField<true> | _DateField<false> {
	const field = new _DateField(nullable)

	if (nullable) {
		return field as _DateField<true>
	} else {
		return field as _DateField<false>
	}
}


class _DateField<Nullable extends boolean> extends SerializerField<Date, Nullable> {
	protected _deserialize(value: any): Date {
		if (typeof value !== "string") {
			throw new Error(`${this.constructor.name}: Unexpected type of value ${value}`)
		}

		let [datetime, timezone] = value.split("+")
		timezone = (timezone ?? "").split(":").slice(0, 2).join(":")

		if (timezone) {
			value = `${datetime}+${timezone}`
		} else {
			value = datetime
		}

		return new Date(value)
	}
}
