[**@zip.js/zip.js**](../README.md)

***

[@zip.js/zip.js](../globals.md) / SplitZipReader

# Class: ~~SplitZipReader~~

Defined in: [index.d.ts:386](https://github.com/gildas-lormeau/zip.js/blob/be8a40fccb32dc320b3cf56a5faf9a609e60a6cb/index.d.ts#L386)

Represents a [Reader](Reader.md) instance used to read data provided as an array of [ReadableReader](../interfaces/ReadableReader.md) instances (e.g. split zip files).

## Deprecated

Use [SplitDataReader](SplitDataReader.md) instead.

## Extends

- [`SplitDataReader`](SplitDataReader.md)

## Constructors

### new SplitZipReader()

> **new SplitZipReader**(`value`): [`SplitZipReader`](SplitZipReader.md)

Defined in: [index.d.ts:338](https://github.com/gildas-lormeau/zip.js/blob/be8a40fccb32dc320b3cf56a5faf9a609e60a6cb/index.d.ts#L338)

Creates the [Reader](Reader.md) instance

#### Parameters

##### value

The data to read.

[`Reader`](Reader.md)\<`unknown`\>[] | [`ReadableReader`](../interfaces/ReadableReader.md)[] | `ReadableStream`[]

#### Returns

[`SplitZipReader`](SplitZipReader.md)

#### Inherited from

[`SplitDataReader`](SplitDataReader.md).[`constructor`](SplitDataReader.md#constructors)

## Properties

### ~~readable~~

> **readable**: `ReadableStream`

Defined in: [index.d.ts:342](https://github.com/gildas-lormeau/zip.js/blob/be8a40fccb32dc320b3cf56a5faf9a609e60a6cb/index.d.ts#L342)

The `ReadableStream` instance.

#### Inherited from

[`SplitDataReader`](SplitDataReader.md).[`readable`](SplitDataReader.md#readable)

***

### ~~size~~

> **size**: `number`

Defined in: [index.d.ts:346](https://github.com/gildas-lormeau/zip.js/blob/be8a40fccb32dc320b3cf56a5faf9a609e60a6cb/index.d.ts#L346)

The total size of the data in bytes.

#### Inherited from

[`SplitDataReader`](SplitDataReader.md).[`size`](SplitDataReader.md#size)

## Methods

### ~~init()?~~

> `optional` **init**(): `Promise`\<`void`\>

Defined in: [index.d.ts:350](https://github.com/gildas-lormeau/zip.js/blob/be8a40fccb32dc320b3cf56a5faf9a609e60a6cb/index.d.ts#L350)

Initializes the instance asynchronously

#### Returns

`Promise`\<`void`\>

#### Inherited from

[`SplitDataReader`](SplitDataReader.md).[`init`](SplitDataReader.md#init)

***

### ~~readUint8Array()~~

> **readUint8Array**(`index`, `length`): `Promise`\<`Uint8Array`\>

Defined in: [index.d.ts:358](https://github.com/gildas-lormeau/zip.js/blob/be8a40fccb32dc320b3cf56a5faf9a609e60a6cb/index.d.ts#L358)

Reads a chunk of data

#### Parameters

##### index

`number`

The byte index of the data to read.

##### length

`number`

The length of the data to read in bytes.

#### Returns

`Promise`\<`Uint8Array`\>

A promise resolving to a chunk of data.

#### Inherited from

[`SplitDataReader`](SplitDataReader.md).[`readUint8Array`](SplitDataReader.md#readuint8array)
