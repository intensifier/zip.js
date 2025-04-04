/*
 Copyright (c) 2022 Gildas Lormeau. All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 1. Redistributions of source code must retain the above copyright notice,
 this list of conditions and the following disclaimer.

 2. Redistributions in binary form must reproduce the above copyright 
 notice, this list of conditions and the following disclaimer in 
 the documentation and/or other materials provided with the distribution.

 3. The names of the authors may not be used to endorse or promote products
 derived from this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
 INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
 INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
 OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import { Deflate } from "./core/streams/codecs/deflate.js";
import { Inflate } from "./core/streams/codecs/inflate.js";
import { configure } from "./core/configuration.js";
import { configureWebWorker } from "./z-worker-inline.js";
import { getMimeType } from "./core/util/default-mime-type.js";
import { initShimAsyncCodec } from "./core/util/stream-codec-shim.js";
import { terminateWorkers } from "./core/codec-pool.js";

let baseURL;
try {
	baseURL = import.meta.url;
	// eslint-disable-next-line no-unused-vars
} catch (_) {
	// ignored
}
configureWebWorker(configure);
configure({ Deflate, Inflate, baseURL });

export * from "./core/io.js";
export * from "./core/zip-reader.js";
export * from "./core/zip-writer.js";
export {
	configure,
	getMimeType,
	initShimAsyncCodec,
	terminateWorkers
};