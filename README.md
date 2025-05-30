# json-twdc
A tool for creating JSON object serializers/deserializers for typescript interfaces and classes

## Installation
```shell
npm add json-twdc
# or
pnpm add json-twdc
```

## Basic usage
```typescript
import { InterfaceSerializer, Field } from "json-twdc"
import { ArrayField } from "json-twdc/field"


interface IBook {
	title: string
	publishedAt: Date | null
	authors: string[]
}


class IBookSerializer extends InterfaceSerializer<IBook> {
	fields = {
		title: Field({ type: "string" }),
		publishedAt: Field({ type: "date", nullable: true, alias: "published_at" }),
		authors: new ArrayField({ serializer: Field({ type: "string" }) }),
	}
}

const serializer = new IBookSerialize()
const book: IBook = serializer.deserialize({ title: "Martin Eden", published_at: "1909-09-01T00:00:00.000Z", authors: [ "Jack London" ] })
```

## Schema
### Fast field creation
The `Field` function allows to speed up the creation of scalar fields.

```typescript
import { Field } from "json-twdc/schema"


const field = Field({ type: "string", nullable: false, alias: "string_field" })
```

## Default fields
### Scalar fields
Scalar fields are fields that do not require specifying child serializers and usually work with one specific type.

#### BaseField

#### AnyField

#### BooleanField

#### DateField

#### InfinityField

#### NumberField

#### StringField

### Complex fields
Scalar fields are fields that require specifying child serializers and usually work with one complex types, like objects.

#### ArrayField

#### EnumField

#### ObjectField

#### RecordField

#### SetField

### Custom fields
You are also free to create custom fields if you need it.

```typescript
import BaseField from "json-twdc/field"


class Point {
	public x: number
	public y: number

	constructor(x: number, y: number) {
		this.x = x
		this.y = y
	}
}


class PointField extends BaseField<Point> {
	_serialize(value: Point): any {
		return `${value.x};${value.y}`
	}

	_deserialize(value: any): Point {
		if (typeof value !=== "string") {
			throw new Error(`${this.constructor.name}: Value must be of string type`)
		}

		if ((value.match(/;/g) || []).length === 1) {
			throw new Error(`${this.constructor.name}: Value must be present in format X;Y`)
		}
	}
}
```

### Modifiers
#### Nullable

## Default serializers
### BaseSerializer
### Interface serializer
### Object serializer
### Record serializer
