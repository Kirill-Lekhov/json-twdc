import BaseField from "./BaseField"


const TimezoneSeparatorRE = new RegExp("[\+\-]")


export default class DateField extends BaseField<Date> {
	_serialize(value: Date): string {
		return value.toISOString()
	}

	_deserialize(raw: any): Date {
		if (typeof raw !== "string") {
			throw new Error(`${this.constructor.name}: Unexpected type of raw ${raw}`)
		}

		// Removing seconds from timezone
		let cleanedDate: string
		let [date, time] = raw.split("T")

		if (time) {
			let [naiveTime, timezone] = (time ?? "").split(TimezoneSeparatorRE)
			timezone = (timezone ?? "").split(":").slice(0, 2).join(":")

			if (timezone) {
				const tzSeparator: "+" | "-" = time.search(/\+/) > 0 ? "+" : "-"
				cleanedDate = `${date}T${naiveTime}${tzSeparator}${timezone}`
			} else {
				cleanedDate = `${date}T${naiveTime}`
			}
		} else {
			cleanedDate = date
		}

		return new Date(cleanedDate)
	}
}
