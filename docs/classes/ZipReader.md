[**@zip.js/zip.js**](../README.md)

***

[@zip.js/zip.js](../globals.md) / ZipReader

# Class: ZipReader\<Type\>

Represents an instance used to read a zip file.

## Example

Here is an example showing how to read the text data of the first entry from a zip file:
```
// create a BlobReader to read with a ZipReader the zip from a Blob object
const reader = new zip.ZipReader(new zip.BlobReader(blob));

// get all entries from the zip
const entries = await reader.getEntries();
if (entries.length) {

  // get first entry content as text by using a TextWriter
  const text = await entries[0].getData(
    // writer
    new zip.TextWriter(),
    // options
    {
      onprogress: (index, max) => {
        // onprogress callback
      }
    }
  );
  // text contains the entry data as a String
  console.log(text);
}

// close the ZipReader
await reader.close();
```

## Type Parameters

• **Type**

## Constructors

### new ZipReader()

> **new ZipReader**\<`Type`\>(`reader`, `options`?): [`ZipReader`](ZipReader.md)\<`Type`\>

Creates the instance

#### Parameters

##### reader

The [Reader](Reader.md) instance used to read data.

`ReadableStream`\<`any`\> | [`ReadableReader`](../interfaces/ReadableReader.md) | [`Reader`](Reader.md)\<`unknown`\>[] | [`ReadableReader`](../interfaces/ReadableReader.md)[] | `ReadableStream`\<`any`\>[] | [`Reader`](Reader.md)\<`Type`\>

##### options?

[`ZipReaderConstructorOptions`](../interfaces/ZipReaderConstructorOptions.md)

The options.

#### Returns

[`ZipReader`](ZipReader.md)\<`Type`\>

#### Defined in

[index.d.ts:708](https://github.com/gildas-lormeau/zip.js/blob/24ecd74cb4237f29fe97eb10cff1144c3877ce3d/index.d.ts#L708)

## Properties

### appendedData?

> `optional` **appendedData**: `Uint8Array`\<`ArrayBufferLike`\>

The data appended after the zip file.

#### Defined in

[index.d.ts:729](https://github.com/gildas-lormeau/zip.js/blob/24ecd74cb4237f29fe97eb10cff1144c3877ce3d/index.d.ts#L729)

***

### comment

> **comment**: `Uint8Array`\<`ArrayBufferLike`\>

The global comment of the zip file.

#### Defined in

[index.d.ts:721](https://github.com/gildas-lormeau/zip.js/blob/24ecd74cb4237f29fe97eb10cff1144c3877ce3d/index.d.ts#L721)

***

### prependedData?

> `optional` **prependedData**: `Uint8Array`\<`ArrayBufferLike`\>

The data prepended before the zip file.

#### Defined in

[index.d.ts:725](https://github.com/gildas-lormeau/zip.js/blob/24ecd74cb4237f29fe97eb10cff1144c3877ce3d/index.d.ts#L725)

## Methods

### close()

> **close**(): `Promise`\<`void`\>

Closes the zip file

#### Returns

`Promise`\<`void`\>

#### Defined in

[index.d.ts:749](https://github.com/gildas-lormeau/zip.js/blob/24ecd74cb4237f29fe97eb10cff1144c3877ce3d/index.d.ts#L749)

***

### getEntries()

> **getEntries**(`options`?): `Promise`\<[`Entry`](../interfaces/Entry.md)[]\>

Returns all the entries in the zip file

#### Parameters

##### options?

[`ZipReaderGetEntriesOptions`](../interfaces/ZipReaderGetEntriesOptions.md)

The options.

#### Returns

`Promise`\<[`Entry`](../interfaces/Entry.md)[]\>

A promise resolving to an `array` of [Entry](../interfaces/Entry.md) instances.

#### Defined in

[index.d.ts:736](https://github.com/gildas-lormeau/zip.js/blob/24ecd74cb4237f29fe97eb10cff1144c3877ce3d/index.d.ts#L736)

***

### getEntriesGenerator()

> **getEntriesGenerator**(`options`?): `AsyncGenerator`\<[`Entry`](../interfaces/Entry.md), `boolean`, `any`\>

Returns a generator used to iterate on all the entries in the zip file

#### Parameters

##### options?

[`ZipReaderGetEntriesOptions`](../interfaces/ZipReaderGetEntriesOptions.md)

The options.

#### Returns

`AsyncGenerator`\<[`Entry`](../interfaces/Entry.md), `boolean`, `any`\>

An asynchronous generator of [Entry](../interfaces/Entry.md) instances.

#### Defined in

[index.d.ts:743](https://github.com/gildas-lormeau/zip.js/blob/24ecd74cb4237f29fe97eb10cff1144c3877ce3d/index.d.ts#L743)