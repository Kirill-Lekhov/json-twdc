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
The basic abstract class of the field.

#### AnyField
A field that doesn't check anything. Use it only in exceptional cases.

```typescript
import { Field } from "json-twdc/schema"
import { AnyField } from "json-twdc/field"

let field = new AnyField({})
field = Field({ type: "any" })
```

#### BooleanField
Boolean type field.

```typescript
import { Field } from "json-twdc/schema"
import { BooleanField } from "json-twdc/field"

let field = new BooleanField({})
field = Field({ type: "boolean" })
```

#### DateField
Date type field. It works with dates (and times). Converts a date string in ISO 8601 format to a standard JS Date object and vice versa.

```typescript
import { Field } from "json-twdc/schema"
import { DateField } from "json-twdc/field"

let field = new DateField({})
field = Field({ type: "date" })
```

#### NumberField
Number type field.

```typescript
import { Field } from "json-twdc/schema"
import { NumberField } from "json-twdc/field"

let field = new NumberField({})
field = Field({ type: "number" })
```

#### InfinityField
Number type field. Unlike NumberField, it accepts null values and interprets them as Infinity.

```typescript
import { Field } from "json-twdc/schema"
import { InfinityField } from "json-twdc/field"

let field = new InfinityField({})
field = Field({ type: "infinity" })
```

#### StringField
String type field.

```typescript
import { Field } from "json-twdc/schema"
import { StringField } from "json-twdc/field"

let field = new StringField({})
field = Field({ type: "string" })
```

### Complex fields
Complex fields are fields that require specifying child serializers and usually work with one complex types, like objects.

#### EnumField
Checks the value for belonging to a specific enumeration.

```typescript
import { EnumField } from "json-twdc/field"


enum Role {
	USER = "USER",
	STUFF = "STUFF",
	ADMIN = "ADMIN",
}

let field = new EnumField({ enumeration: Role })
```

#### ArrayField
Array type field.

```typescript
import { ArrayField, StringField } from "json-twdc/field"

let subfield = new StringField({})
let field = new ArrayField({ serializer: subfield })
```

#### ObjectField
Object type field. Allows to transform objects into objects of a certain class.

Limitations:
* Constructor must have the same arguments as the attributes specified in class body.
* When creating a serializer, the order of the fields must match the order of the constructor arguments.

```typescript
import { ObjectSerializer } from "json-twdc"
import { ObjectField, StringField } from "json-twdc/field"


class Person {
	public readonly name: string

	constructor(name: string) {
		this.name = name
	}
}


class PersonSerializer extends ObjectSerializer<typeof Person> {
	builder = Person
	fields = {
		name: new StringField({}),
	}
}


let field = new ObjectField({ serializer: new PersonSerializer() })
```

#### RecordField
Record type field.

```typescript
import { RecordSerializer } from "json-twdc"
import { RecordField } from "json-twdc/field"


class AttendanceSerializer extends RecordSerializer<Record<string, number>> {
	public keysSerializer = new StringField({})
	public valuesSerializer = new NumberField({})
}


let field = new RecordField({ serializer: new AttendanceSerializer() })
```

#### SetField
Set type field.

```typescript
import { SetField, StringField } from "json-twdc/field"

let subfield = new StringField({})
let field = new SetField({ serializer: subfield })
```

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
		if (typeof value !== "string") {
			throw new Error(`${this.constructor.name}: Value must be of string type`)
		}

		if ((value.match(/-?\d+;-?\d+/) || []).length !== 1) {
			throw new Error(`${this.constructor.name}: Value must be present in format X;Y`)
		}

		const [x, y] = value.split(";")

		return new Point(+x, +y)
	}
}
```

### Modifiers
#### Nullable
Allows to add support for nullable values to any type of field.

```typescript
import { Nullable, StringField } from "json-twdc/field"


let field = Nullable(new StringField({}))
```

## Default serializers
### BaseSerializer
Basic abstract serializer.

### Interface serializer
Allows to check objects for the implementation of a specific interface.

```typescript
import { InterfaceSerializer } from "json-twdc"
import { Field } from "json-twdc/schema"


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


let serializer = new UserSerializer()
```

### Object serializer
Allows you to validate raw objects and transform them into objects of a specific class.

Limitations:
* Constructor must have the same arguments as the attributes specified in class body.
* When creating a serializer, the order of the fields must match the order of the constructor arguments.

```typescript
import { ObjectSerializer } from "json-twdc"
import { StringField } from "json-twdc/field"


class Person {
	public readonly name: string

	constructor(name: string) {
		this.name = name
	}
}


class PersonSerializer extends ObjectSerializer<typeof Person> {
	builder = Person
	fields = {
		name: new StringField({}),
	}
}


let serializer = new PersonSerializer()
```

### Record serializer
Allows to check whether raw objects belong to a specific record type.

```typescript
import { RecordSerializer } from "json-twdc"


class AttendanceSerializer extends RecordSerializer<Record<string, number>> {
	public keysSerializer = new StringField({})
	public valuesSerializer = new NumberField({})
}


const serializer = new AttendanceSerializer()
```
