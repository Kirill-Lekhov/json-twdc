import type { FieldType } from "./type"
import type IFieldOptions from "../field/IOptions"
import {
	AnyField,
	BaseField,
	BooleanField,
	DateField,
	InfinityField,
	NumberField,
	StringField,
	Nullable,
} from "../field"


interface IOptions extends IFieldOptions {
	type: Omit<FieldType, "array" | "object" | "enum" | "set" | "record">
	nullable?: boolean
	optional?: boolean
	alias?: string
}


export default function Field(options: { type: "any" } & IFieldOptions): AnyField
export default function Field(options: { type: "infinity" } & IFieldOptions): InfinityField
export default function Field(options: { type: "string" } & IOptions & { nullable?: false }): StringField
export default function Field(options: { type: "string" } & IOptions & { nullable: true }): BaseField<string | null>
export default function Field(options: { type: "number" } & IOptions & { nullable?: false }): NumberField
export default function Field(options: { type: "number" } & IOptions & { nullable: true }): BaseField<number | null>
export default function Field(options: { type: "boolean" } & IOptions & { nullable?: false }): BooleanField
export default function Field(options: { type: "boolean" } & IOptions & { nullable: true }): BaseField<boolean | null>
export default function Field(options: { type: "date" } & IOptions & { nullable?: false }): DateField
export default function Field(options: { type: "date" } & IOptions & { nullable: true }): BaseField<Date | null>
export default function Field(options: IOptions) {
	switch (options.type) {
		case "infinity":
			return new InfinityField(options)
		case "any":
			return new AnyField(options)
		case "string":
			if (options.nullable) {
				return Nullable(new StringField(options))
			}

			return new StringField(options)
		case "number":
			if (options.nullable) {
				return Nullable(new NumberField(options))
			}

			return new NumberField(options)
		case "boolean":
			if (options.nullable) {
				return Nullable(new BooleanField(options))
			}

			return new BooleanField(options)
		case "date":
			if (options.nullable) {
				return Nullable(new DateField(options))
			}

			return new DateField(options)
		default:
			throw new Error(`Unknown field type: ${options.type}`)
	}
}
