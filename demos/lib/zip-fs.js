(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.zip = {}));
})(this, (function (exports) { 'use strict';

	const { Array, Object, String, BigInt, Math, Date, Map, URL, Error, Uint8Array, Uint16Array, Uint32Array, DataView, Blob, Promise, TextEncoder, TextDecoder, document, crypto, btoa, TransformStream, ReadableStream, WritableStream, CompressionStream, DecompressionStream, navigator } = globalThis;

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

	/* global navigator */

	const MINIMUM_CHUNK_SIZE = 64;
	const UNDEFINED_TYPE$2 = undefined;
	const DEFAULT_CONFIGURATION = {
		chunkSize: 512 * 1024,
		maxWorkers: (typeof navigator != "undefined" && navigator.hardwareConcurrency) || 2,
		terminateWorkerTimeout: 5000,
		useWebWorkers: true,
		workerScripts: undefined
	};

	const config = Object.assign({}, DEFAULT_CONFIGURATION);

	function getConfiguration() {
		return config;
	}

	function getChunkSize(config) {
		return Math.max(config.chunkSize, MINIMUM_CHUNK_SIZE);
	}

	function configure(configuration) {
		const {
			baseURL,
			chunkSize,
			maxWorkers,
			terminateWorkerTimeout,
			useCompressionStream,
			useWebWorkers,
			Deflate,
			Inflate,
			workerScripts
		} = configuration;
		if (baseURL !== UNDEFINED_TYPE$2) {
			config.baseURL = baseURL;
		}
		if (chunkSize !== UNDEFINED_TYPE$2) {
			config.chunkSize = chunkSize;
		}
		if (maxWorkers !== UNDEFINED_TYPE$2) {
			config.maxWorkers = maxWorkers;
		}
		if (terminateWorkerTimeout !== UNDEFINED_TYPE$2) {
			config.terminateWorkerTimeout = terminateWorkerTimeout;
		}
		if (useCompressionStream !== UNDEFINED_TYPE$2) {
			config.useCompressionStream = useCompressionStream;
		}
		if (useWebWorkers !== UNDEFINED_TYPE$2) {
			config.useWebWorkers = useWebWorkers;
		}
		if (Deflate !== UNDEFINED_TYPE$2) {
			config.Deflate = Deflate;
		}
		if (Inflate !== UNDEFINED_TYPE$2) {
			config.Inflate = Inflate;
		}
		if (workerScripts !== UNDEFINED_TYPE$2) {
			const { deflate, inflate } = workerScripts;
			if (deflate || inflate) {
				if (!config.workerScripts) {
					config.workerScripts = {};
				}
			}
			if (deflate) {
				if (!Array.isArray(deflate)) {
					throw new Error("workerScripts.deflate must be an array");
				}
				config.workerScripts.deflate = deflate;
			}
			if (inflate) {
				if (!Array.isArray(inflate)) {
					throw new Error("workerScripts.inflate must be an array");
				}
				config.workerScripts.inflate = inflate;
			}
		}
	}

	var e=e=>{if("function"==typeof URL.createObjectURL){const t=()=>URL.createObjectURL(new Blob(['const{Array:t,Object:e,Math:n,Error:r,Uint8Array:s,Uint16Array:i,Uint32Array:o,Int32Array:f,DataView:c,Promise:l,TextEncoder:a,crypto:u,postMessage:w,TransformStream:h,ReadableStream:d,WritableStream:p,CompressionStream:b,DecompressionStream:y}=globalThis,m=[];for(let t=0;256>t;t++){let e=t;for(let t=0;8>t;t++)1&e?e=e>>>1^3988292384:e>>>=1;m[t]=e}class g{constructor(t){this.t=t||-1}append(t){let e=0|this.t;for(let n=0,r=0|t.length;r>n;n++)e=e>>>8^m[255&(e^t[n])];this.t=e}get(){return~this.t}}class k extends h{constructor(){super({start(){this.i=new g},transform(t){this.i.append(t)},flush(t){const e=new s(4);new c(e.buffer).setUint32(0,this.i.get()),t.enqueue(e)}})}}const v={concat(t,e){if(0===t.length||0===e.length)return t.concat(e);const n=t[t.length-1],r=v.o(n);return 32===r?t.concat(e):v.l(e,r,0|n,t.slice(0,t.length-1))},u(t){const e=t.length;if(0===e)return 0;const n=t[e-1];return 32*(e-1)+v.o(n)},h(t,e){if(32*t.length<e)return t;const r=(t=t.slice(0,n.ceil(e/32))).length;return e&=31,r>0&&e&&(t[r-1]=v.p(e,t[r-1]&2147483648>>e-1,1)),t},p:(t,e,n)=>32===t?e:(n?0|e:e<<32-t)+1099511627776*t,o:t=>n.round(t/1099511627776)||32,l(t,e,n,r){for(void 0===r&&(r=[]);e>=32;e-=32)r.push(n),n=0;if(0===e)return r.concat(t);for(let s=0;s<t.length;s++)r.push(n|t[s]>>>e),n=t[s]<<32-e;const s=t.length?t[t.length-1]:0,i=v.o(s);return r.push(v.p(e+i&31,e+i>32?n:r.pop(),1)),r}},S={m:{g(t){const e=v.u(t)/8,n=new s(e);let r;for(let s=0;e>s;s++)0==(3&s)&&(r=t[s/4]),n[s]=r>>>24,r<<=8;return n},k(t){const e=[];let n,r=0;for(n=0;n<t.length;n++)r=r<<8|t[n],3==(3&n)&&(e.push(r),r=0);return 3&n&&e.push(v.p(8*(3&n),r)),e}}},_={v:function(t){t?(this.S=t.S.slice(0),this._=t._.slice(0),this.C=t.C):this.reset()}};_.v.prototype={blockSize:512,reset(){const t=this;return t.S=this.I.slice(0),t._=[],t.C=0,t},update(t){const e=this;"string"==typeof t&&(t=S.A.k(t));const n=e._=v.concat(e._,t),s=e.C,i=e.C=s+v.u(t);if(i>9007199254740991)throw new r("Cannot hash more than 2^53 - 1 bits");const f=new o(n);let c=0;for(let t=e.blockSize+s-(e.blockSize+s&e.blockSize-1);i>=t;t+=e.blockSize)e.V(f.subarray(16*c,16*(c+1))),c+=1;return n.splice(0,16*c),e},B(){const t=this;let e=t._;const r=t.S;e=v.concat(e,[v.p(1,1)]);for(let t=e.length+2;15&t;t++)e.push(0);for(e.push(n.floor(t.C/4294967296)),e.push(0|t.C);e.length;)t.V(e.splice(0,16));return t.reset(),r},I:[1732584193,4023233417,2562383102,271733878,3285377520],D:[1518500249,1859775393,2400959708,3395469782],M:(t,e,n,r)=>t>19?t>39?t>59?t>79?void 0:e^n^r:e&n|e&r|n&r:e^n^r:e&n|~e&r,P:(t,e)=>e<<t|e>>>32-t,V(e){const r=this,s=r.S,i=t(80);for(let t=0;16>t;t++)i[t]=e[t];let o=s[0],f=s[1],c=s[2],l=s[3],a=s[4];for(let t=0;79>=t;t++){16>t||(i[t]=r.P(1,i[t-3]^i[t-8]^i[t-14]^i[t-16]));const e=r.P(5,o)+r.M(t,f,c,l)+a+i[t]+r.D[n.floor(t/20)]|0;a=l,l=c,c=r.P(30,f),f=o,o=e}s[0]=s[0]+o|0,s[1]=s[1]+f|0,s[2]=s[2]+c|0,s[3]=s[3]+l|0,s[4]=s[4]+a|0}};const z={getRandomValues(t){const e=new o(t.buffer),r=t=>{let e=987654321;const r=4294967295;return()=>(e=36969*(65535&e)+(e>>16)&r,(((e<<16)+(t=18e3*(65535&t)+(t>>16)&r)&r)/4294967296+.5)*(n.random()>.5?1:-1))};for(let s,i=0;i<t.length;i+=4){const t=r(4294967296*(s||n.random()));s=987654071*t(),e[i/4]=4294967296*t()|0}return t}},C={importKey:t=>new C.R(S.m.k(t)),T(t,e,n,s){if(n=n||1e4,0>s||0>n)throw new r("invalid params to pbkdf2");const i=1+(s>>5)<<2;let o,f,l,a,u;const w=new ArrayBuffer(i),h=new c(w);let d=0;const p=v;for(e=S.m.k(e),u=1;(i||1)>d;u++){for(o=f=t.encrypt(p.concat(e,[u])),l=1;n>l;l++)for(f=t.encrypt(f),a=0;a<f.length;a++)o[a]^=f[a];for(l=0;(i||1)>d&&l<o.length;l++)h.setInt32(d,o[l]),d+=4}return w.slice(0,s/8)},R:class{constructor(t){const e=this,n=e.U=_.v,r=[[],[]],s=n.prototype.blockSize/32;e.W=[new n,new n],t.length>s&&(t=n.hash(t));for(let e=0;s>e;e++)r[0][e]=909522486^t[e],r[1][e]=1549556828^t[e];e.W[0].update(r[0]),e.W[1].update(r[1]),e.j=new n(e.W[0])}reset(){const t=this;t.j=new t.U(t.W[0]),t.H=!1}update(t){this.H=!0,this.j.update(t)}digest(){const t=this,e=t.j.B(),n=new t.U(t.W[1]).update(e).B();return t.reset(),n}encrypt(t){if(this.H)throw new r("encrypt on already updated hmac called!");return this.update(t),this.digest(t)}}},I={name:"PBKDF2"},x=e.assign({hash:{name:"HMAC"}},I),A=e.assign({iterations:1e3,hash:{name:"SHA-1"}},I),V=["deriveBits"],B=[8,12,16],D=[16,24,32],E=[0,0,0,0],M=void 0!==u,P=M&&void 0!==u.subtle,R=M&&"function"==typeof u.getRandomValues,T=M&&P&&"function"==typeof u.subtle.importKey,U=M&&P&&"function"==typeof u.subtle.deriveBits,W=S.m,j=class{constructor(t){const e=this;e.K=[[[],[],[],[],[]],[[],[],[],[],[]]],e.K[0][0][0]||e.L();const n=e.K[0][4],s=e.K[1],i=t.length;let o,f,c,l=1;if(4!==i&&6!==i&&8!==i)throw new r("invalid aes key size");for(e.D=[f=t.slice(0),c=[]],o=i;4*i+28>o;o++){let t=f[o-1];(o%i==0||8===i&&o%i==4)&&(t=n[t>>>24]<<24^n[t>>16&255]<<16^n[t>>8&255]<<8^n[255&t],o%i==0&&(t=t<<8^t>>>24^l<<24,l=l<<1^283*(l>>7))),f[o]=f[o-i]^t}for(let t=0;o;t++,o--){const e=f[3&t?o:o-4];c[t]=4>=o||4>t?e:s[0][n[e>>>24]]^s[1][n[e>>16&255]]^s[2][n[e>>8&255]]^s[3][n[255&e]]}}encrypt(t){return this.F(t,0)}decrypt(t){return this.F(t,1)}L(){const t=this.K[0],e=this.K[1],n=t[4],r=e[4],s=[],i=[];let o,f,c,l;for(let t=0;256>t;t++)i[(s[t]=t<<1^283*(t>>7))^t]=t;for(let a=o=0;!n[a];a^=f||1,o=i[o]||1){let i=o^o<<1^o<<2^o<<3^o<<4;i=i>>8^255&i^99,n[a]=i,r[i]=a,l=s[c=s[f=s[a]]];let u=16843009*l^65537*c^257*f^16843008*a,w=257*s[i]^16843008*i;for(let n=0;4>n;n++)t[n][a]=w=w<<24^w>>>8,e[n][i]=u=u<<24^u>>>8}for(let n=0;5>n;n++)t[n]=t[n].slice(0),e[n]=e[n].slice(0)}F(t,e){if(4!==t.length)throw new r("invalid aes block size");const n=this.D[e],s=n.length/4-2,i=[0,0,0,0],o=this.K[e],f=o[0],c=o[1],l=o[2],a=o[3],u=o[4];let w,h,d,p=t[0]^n[0],b=t[e?3:1]^n[1],y=t[2]^n[2],m=t[e?1:3]^n[3],g=4;for(let t=0;s>t;t++)w=f[p>>>24]^c[b>>16&255]^l[y>>8&255]^a[255&m]^n[g],h=f[b>>>24]^c[y>>16&255]^l[m>>8&255]^a[255&p]^n[g+1],d=f[y>>>24]^c[m>>16&255]^l[p>>8&255]^a[255&b]^n[g+2],m=f[m>>>24]^c[p>>16&255]^l[b>>8&255]^a[255&y]^n[g+3],g+=4,p=w,b=h,y=d;for(let t=0;4>t;t++)i[e?3&-t:t]=u[p>>>24]<<24^u[b>>16&255]<<16^u[y>>8&255]<<8^u[255&m]^n[g++],w=p,p=b,b=y,y=m,m=w;return i}},H=class{constructor(t,e){this.N=t,this.O=e,this.q=e}reset(){this.q=this.O}update(t){return this.G(this.N,t,this.q)}J(t){if(255==(t>>24&255)){let e=t>>16&255,n=t>>8&255,r=255&t;255===e?(e=0,255===n?(n=0,255===r?r=0:++r):++n):++e,t=0,t+=e<<16,t+=n<<8,t+=r}else t+=1<<24;return t}X(t){0===(t[0]=this.J(t[0]))&&(t[1]=this.J(t[1]))}G(t,e,n){let r;if(!(r=e.length))return[];const s=v.u(e);for(let s=0;r>s;s+=4){this.X(n);const r=t.encrypt(n);e[s]^=r[0],e[s+1]^=r[1],e[s+2]^=r[2],e[s+3]^=r[3]}return v.h(e,s)}},K=C.R;class L extends h{constructor(n,i,o){let f;super({start(){e.assign(this,{ready:new l((t=>this.Y=t)),password:n,signed:i,Z:o-1,pending:new s})},async transform(e,n){const i=this;if(i.password){const n=i.password;i.password=null;const s=G(e,0,B[i.Z]+2);await(async(t,e,n)=>{await O(t,n,G(e,0,B[t.Z]));const s=G(e,B[t.Z]),i=t.keys.passwordVerification;if(i[0]!=s[0]||i[1]!=s[1])throw new r("Invalid pasword")})(i,s,n),i.$=new H(new j(i.keys.key),t.from(E)),i.tt=new K(i.keys.et),e=G(e,B[i.Z]+2),i.Y()}else await i.ready;const o=new s(e.length-10-(e.length-10)%16);n.enqueue(N(i,e,o,0,10,!0))},async flush(t){const e=this;await e.ready;const n=e.pending,r=G(n,0,n.length-10),i=G(n,n.length-10);let o=new s;if(r.length){const t=Q(W,r);e.tt.update(t);const n=e.$.update(t);o=J(W,n)}if(f.valid=!0,e.signed){const t=G(J(W,e.tt.digest()),0,10);for(let e=0;10>e;e++)t[e]!=i[e]&&(f.valid=!1)}t.enqueue(o)}}),f=this}}class F extends h{constructor(n,r){let i;super({start(){e.assign(this,{ready:new l((t=>this.Y=t)),password:n,Z:r-1,pending:new s})},async transform(e,n){const r=this;let i=new s;if(r.password){const e=r.password;r.password=null,i=await(async(t,e)=>{const n=(r=new s(B[t.Z]),R?u.getRandomValues(r):z.getRandomValues(r));var r;return await O(t,e,n),q(n,t.keys.passwordVerification)})(r,e),r.$=new H(new j(r.keys.key),t.from(E)),r.tt=new K(r.keys.et),r.Y()}else await r.ready;const o=new s(i.length+e.length-e.length%16);o.set(i,0),n.enqueue(N(r,e,o,i.length,0))},async flush(t){const e=this;await e.ready;let n=new s;if(e.pending.length){const t=e.$.update(Q(W,e.pending));e.tt.update(t),n=J(W,t)}i.signature=J(W,e.tt.digest()).slice(0,10),t.enqueue(q(n,i.signature))}}),i=this}}function N(t,e,n,r,i,o){const f=e.length-i;let c;for(t.pending.length&&(e=q(t.pending,e),n=((t,e)=>{if(e&&e>t.length){const n=t;(t=new s(e)).set(n,0)}return t})(n,f-f%16)),c=0;f-16>=c;c+=16){const s=Q(W,G(e,c,c+16));o&&t.tt.update(s);const i=t.$.update(s);o||t.tt.update(i),n.set(J(W,i),c+r)}return t.pending=G(e,c),n}async function O(t,n,r){const i=(t=>{if(void 0===a){const e=new s((t=unescape(encodeURIComponent(t))).length);for(let n=0;n<e.length;n++)e[n]=t.charCodeAt(n);return e}return(new a).encode(t)})(n),o=await((t,e,n,r,s)=>T?u.subtle.importKey("raw",e,n,!1,s):C.importKey(e))(0,i,x,0,V),f=await(async(t,e,n)=>U?await u.subtle.deriveBits(t,e,n):C.T(e,t.salt,A.iterations,n))(e.assign({salt:r},A),o,8*(2*D[t.Z]+2)),c=new s(f);t.keys={key:Q(W,G(c,0,D[t.Z])),et:Q(W,G(c,D[t.Z],2*D[t.Z])),passwordVerification:G(c,2*D[t.Z])}}function q(t,e){let n=t;return t.length+e.length&&(n=new s(t.length+e.length),n.set(t,0),n.set(e,t.length)),n}function G(t,e,n){return t.subarray(e,n)}function J(t,e){return t.g(e)}function Q(t,e){return t.k(e)}class X extends h{constructor(t,n){let s;super({start(){e.assign(this,{password:t,passwordVerification:n}),tt(this,t)},transform(t,e){const n=this;if(n.password){const e=Z(n,t.subarray(0,12));if(n.password=null,e[11]!=n.passwordVerification)throw new r("Invalid pasword");t=t.subarray(12)}e.enqueue(Z(n,t))},flush(){s.valid=!0}}),s=this}}class Y extends h{constructor(t,n){super({start(){e.assign(this,{password:t,passwordVerification:n}),tt(this,t)},transform(t,e){const n=this;let r,i;if(n.password){n.password=null;const e=u.getRandomValues(new s(12));e[11]=n.passwordVerification,r=new s(t.length+e.length),r.set($(n,e),0),i=12}else r=new s(t.length),i=0;r.set($(n,t),i),e.enqueue(r)},flush(){}})}}function Z(t,e){const n=new s(e.length);for(let r=0;r<e.length;r++)n[r]=nt(t)^e[r],et(t,n[r]);return n}function $(t,e){const n=new s(e.length);for(let r=0;r<e.length;r++)n[r]=nt(t)^e[r],et(t,e[r]);return n}function tt(t,e){t.keys=[305419896,591751049,878082192],t.nt=new g(t.keys[0]),t.rt=new g(t.keys[2]);for(let n=0;n<e.length;n++)et(t,e.charCodeAt(n))}function et(t,e){t.nt.append([e]),t.keys[0]=~t.nt.get(),t.keys[1]=st(t.keys[1]+rt(t.keys[0])),t.keys[1]=st(n.imul(t.keys[1],134775813)+1),t.rt.append([t.keys[1]>>>24]),t.keys[2]=~t.rt.get()}function nt(t){const e=2|t.keys[2];return rt(n.imul(e,1^e)>>>8)}function rt(t){return 255&t}function st(t){return 4294967295&t}class it extends h{constructor(t,e){let n;super({start(){n=new t(e)},transform(t,e){t=n.append(t),e.enqueue(t)},flush(t){const e=n.flush();e&&t.enqueue(e)}})}}const ot=void 0===b,ft=void 0===y;let ct=!0,lt=!0;class at extends h{constructor(t,e,{chunkSize:n},...r){super({},...r);const{compressed:s,st:i,password:o,passwordVerification:f,encryptionStrength:l,zipCrypto:a,signed:u}=e,w=this;let h,d,p=ht(super.readable);const y=!!o;if(y&&!a||!u||([p,h]=p.tee(),h=h.pipeThrough(new k)),s)if(void 0!==i&&!i||ot&&!lt)p=wt(t,p,n);else try{p=p.pipeThrough(new b("deflate-raw"))}catch(e){lt=!1,p=wt(t,p,n)}y&&(a?p=p.pipeThrough(new Y(o,f)):(d=new F(o,l),p=p.pipeThrough(d))),dt(w,p,(async()=>{let t;y&&!a&&(t=d.signature),y&&!a||!u||(t=await h.getReader().read(),t=new c(t.value.buffer).getUint32(0)),w.signature=t}))}}class ut extends h{constructor(t,e,{chunkSize:n},...s){super({},...s);const{zipCrypto:i,password:o,passwordVerification:f,signed:l,encryptionStrength:a,compressed:u,st:w}=e;let h,d,p=ht(super.readable);const b=!!o;if(b&&(i?p=p.pipeThrough(new X(o,f)):(d=new L(o,l,a),p=p.pipeThrough(d))),u)if(void 0!==w&&!w||ft&&!ct)p=wt(t,p,n);else try{p=p.pipeThrough(new y("deflate-raw"))}catch(e){ct=!1,p=wt(t,p,n)}b&&!i||!l||([p,h]=p.tee(),h=h.pipeThrough(new k)),dt(this,p,(async()=>{if(b&&!i&&!d.valid)throw new r("Invalid signature");if((!b||i)&&l){const t=await h.getReader().read();if(t!=new c(t.value.buffer).getUint32(0,!1))throw new r("Invalid signature")}}))}}function wt(t,e,n){return e.pipeThrough(new it(t,{chunkSize:n}))}function ht(t){return t.pipeThrough(new h({transform(t,e){t&&t.length&&e.enqueue(t)}}))}function dt(t,n,r){t.length=0,n=n.pipeThrough(new h({transform(e,n){e&&e.length&&(t.length+=e.length,n.enqueue(e))},flush:r})),e.defineProperty(t,"readable",{get:()=>n})}const pt=new Map;let bt,yt=0;async function mt(t){try{const{options:e,scripts:n,config:r}=t,{codecType:s}=e;let i;n&&n.length&&importScripts.apply(void 0,n),self.initCodec&&self.initCodec(),s.startsWith("deflate")?i=self.Deflate:s.startsWith("inflate")&&(i=self.Inflate);const o={highWaterMark:1,size:()=>r.chunkSize},f=new d({async pull(t){let e=new l(((t,e)=>pt.set(yt,{resolve:t,reject:e})));gt({type:"pull",messageId:yt}),yt=(yt+1)%Number.MAX_SAFE_INTEGER;const{value:n,done:r}=await e;t.enqueue(n),r&&t.close()}},o),c=new p({write(t){gt({type:"data",data:t})}},o);bt=((t,e,n,r,s)=>{const i=new AbortController,{signal:o}=i;if(r.codecType.startsWith("deflate"))return{it:()=>f(at),abort:c};if(r.codecType.startsWith("inflate"))return{it:()=>f(ut),abort:c};async function f(i){const f=new i(t,r,s);await e.pipeThrough(f,{signal:o}).pipeTo(n,{ot:!0});const{length:c,signature:l}=f;return{length:c,signature:l}}function c(){i.abort()}})(i,f,c,e,r),gt({type:"close",result:await bt.it()})}catch(t){const{message:e,stack:n}=t;w({error:{message:e,stack:n}})}}function gt(t){if(t.data){let{data:e}=t;if(e&&e.length)try{e.length!=e.buffer.byteLength&&(e=new s(e)),t.data=e.buffer,w(t,[t.data])}catch(e){w(t)}else w(t)}else w(t)}addEventListener("message",(async t=>{const e=t.data,{type:n,messageId:r,data:i,done:o}=e;try{if("start"==n&&mt(e),"data"==n){const{resolve:t}=pt.get(r);pt.delete(r),t({value:new s(i),done:o})}}catch(t){w({error:{message:t.message,stack:t.stack}})}}));const kt=(()=>{const e=-2;function o(e){return f(e.map((([e,n])=>new t(e).fill(n,0,e))))}function f(e){return e.reduce(((e,n)=>e.concat(t.isArray(n)?f(n):n)),[])}const c=[0,1,2,3].concat(...o([[2,4],[2,5],[4,6],[4,7],[8,8],[8,9],[16,10],[16,11],[32,12],[32,13],[64,14],[64,15],[2,0],[1,16],[1,17],[2,18],[2,19],[4,20],[4,21],[8,22],[8,23],[16,24],[16,25],[32,26],[32,27],[64,28],[64,29]]));function l(){const t=this;function e(t,e){let n=0;do{n|=1&t,t>>>=1,n<<=1}while(--e>0);return n>>>1}t.ft=r=>{const s=t.ct,i=t.ut.lt,o=t.ut.wt;let f,c,l,a=-1;for(r.ht=0,r.dt=573,f=0;o>f;f++)0!==s[2*f]?(r.bt[++r.ht]=a=f,r.yt[f]=0):s[2*f+1]=0;for(;2>r.ht;)l=r.bt[++r.ht]=2>a?++a:0,s[2*l]=1,r.yt[l]=0,r.gt--,i&&(r.kt-=i[2*l+1]);for(t.vt=a,f=n.floor(r.ht/2);f>=1;f--)r.St(s,f);l=o;do{f=r.bt[1],r.bt[1]=r.bt[r.ht--],r.St(s,1),c=r.bt[1],r.bt[--r.dt]=f,r.bt[--r.dt]=c,s[2*l]=s[2*f]+s[2*c],r.yt[l]=n.max(r.yt[f],r.yt[c])+1,s[2*f+1]=s[2*c+1]=l,r.bt[1]=l++,r.St(s,1)}while(r.ht>=2);r.bt[--r.dt]=r.bt[1],(e=>{const n=t.ct,r=t.ut.lt,s=t.ut._t,i=t.ut.zt,o=t.ut.Ct;let f,c,l,a,u,w,h=0;for(a=0;15>=a;a++)e.It[a]=0;for(n[2*e.bt[e.dt]+1]=0,f=e.dt+1;573>f;f++)c=e.bt[f],a=n[2*n[2*c+1]+1]+1,a>o&&(a=o,h++),n[2*c+1]=a,c>t.vt||(e.It[a]++,u=0,i>c||(u=s[c-i]),w=n[2*c],e.gt+=w*(a+u),r&&(e.kt+=w*(r[2*c+1]+u)));if(0!==h){do{for(a=o-1;0===e.It[a];)a--;e.It[a]--,e.It[a+1]+=2,e.It[o]--,h-=2}while(h>0);for(a=o;0!==a;a--)for(c=e.It[a];0!==c;)l=e.bt[--f],l>t.vt||(n[2*l+1]!=a&&(e.gt+=(a-n[2*l+1])*n[2*l],n[2*l+1]=a),c--)}})(r),((t,n,r)=>{const s=[];let i,o,f,c=0;for(i=1;15>=i;i++)s[i]=c=c+r[i-1]<<1;for(o=0;n>=o;o++)f=t[2*o+1],0!==f&&(t[2*o]=e(s[f]++,f))})(s,t.vt,r.It)}}function a(t,e,n,r,s){const i=this;i.lt=t,i._t=e,i.zt=n,i.wt=r,i.Ct=s}l.xt=[0,1,2,3,4,5,6,7].concat(...o([[2,8],[2,9],[2,10],[2,11],[4,12],[4,13],[4,14],[4,15],[8,16],[8,17],[8,18],[8,19],[16,20],[16,21],[16,22],[16,23],[32,24],[32,25],[32,26],[31,27],[1,28]])),l.At=[0,1,2,3,4,5,6,7,8,10,12,14,16,20,24,28,32,40,48,56,64,80,96,112,128,160,192,224,0],l.Vt=[0,1,2,3,4,6,8,12,16,24,32,48,64,96,128,192,256,384,512,768,1024,1536,2048,3072,4096,6144,8192,12288,16384,24576],l.Bt=t=>256>t?c[t]:c[256+(t>>>7)],l.Dt=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],l.Et=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],l.Mt=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],l.Pt=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];const u=o([[144,8],[112,9],[24,7],[8,8]]);a.Rt=f([12,140,76,204,44,172,108,236,28,156,92,220,60,188,124,252,2,130,66,194,34,162,98,226,18,146,82,210,50,178,114,242,10,138,74,202,42,170,106,234,26,154,90,218,58,186,122,250,6,134,70,198,38,166,102,230,22,150,86,214,54,182,118,246,14,142,78,206,46,174,110,238,30,158,94,222,62,190,126,254,1,129,65,193,33,161,97,225,17,145,81,209,49,177,113,241,9,137,73,201,41,169,105,233,25,153,89,217,57,185,121,249,5,133,69,197,37,165,101,229,21,149,85,213,53,181,117,245,13,141,77,205,45,173,109,237,29,157,93,221,61,189,125,253,19,275,147,403,83,339,211,467,51,307,179,435,115,371,243,499,11,267,139,395,75,331,203,459,43,299,171,427,107,363,235,491,27,283,155,411,91,347,219,475,59,315,187,443,123,379,251,507,7,263,135,391,71,327,199,455,39,295,167,423,103,359,231,487,23,279,151,407,87,343,215,471,55,311,183,439,119,375,247,503,15,271,143,399,79,335,207,463,47,303,175,431,111,367,239,495,31,287,159,415,95,351,223,479,63,319,191,447,127,383,255,511,0,64,32,96,16,80,48,112,8,72,40,104,24,88,56,120,4,68,36,100,20,84,52,116,3,131,67,195,35,163,99,227].map(((t,e)=>[t,u[e]])));const w=o([[30,5]]);function h(t,e,n,r,s){const i=this;i.Tt=t,i.Ut=e,i.Wt=n,i.jt=r,i.Ht=s}a.Kt=f([0,16,8,24,4,20,12,28,2,18,10,26,6,22,14,30,1,17,9,25,5,21,13,29,3,19,11,27,7,23].map(((t,e)=>[t,w[e]]))),a.Lt=new a(a.Rt,l.Dt,257,286,15),a.Ft=new a(a.Kt,l.Et,0,30,15),a.Nt=new a(null,l.Mt,0,19,7);const d=[new h(0,0,0,0,0),new h(4,4,8,4,1),new h(4,5,16,8,1),new h(4,6,32,32,1),new h(4,4,16,16,2),new h(8,16,32,32,2),new h(8,16,128,128,2),new h(8,32,128,256,2),new h(32,128,258,1024,2),new h(32,258,258,4096,2)],p=["need dictionary","stream end","","","stream error","data error","","buffer error","",""],b=113,y=666,m=262;function g(t,e,n,r){const s=t[2*e],i=t[2*n];return i>s||s==i&&r[e]<=r[n]}function k(){const t=this;let r,o,f,c,u,w,h,k,v,S,_,z,C,I,x,A,V,B,D,E,M,P,R,T,U,W,j,H,K,L,F,N,O;const q=new l,G=new l,J=new l;let Q,X,Y,Z,$,tt;function et(){let e;for(e=0;286>e;e++)F[2*e]=0;for(e=0;30>e;e++)N[2*e]=0;for(e=0;19>e;e++)O[2*e]=0;F[512]=1,t.gt=t.kt=0,X=Y=0}function nt(t,e){let n,r=-1,s=t[1],i=0,o=7,f=4;0===s&&(o=138,f=3),t[2*(e+1)+1]=65535;for(let c=0;e>=c;c++)n=s,s=t[2*(c+1)+1],++i<o&&n==s||(f>i?O[2*n]+=i:0!==n?(n!=r&&O[2*n]++,O[32]++):i>10?O[36]++:O[34]++,i=0,r=n,0===s?(o=138,f=3):n==s?(o=6,f=3):(o=7,f=4))}function rt(e){t.Ot[t.pending++]=e}function st(t){rt(255&t),rt(t>>>8&255)}function it(t,e){let n;const r=e;tt>16-r?(n=t,$|=n<<tt&65535,st($),$=n>>>16-tt,tt+=r-16):($|=t<<tt&65535,tt+=r)}function ot(t,e){const n=2*t;it(65535&e[n],65535&e[n+1])}function ft(t,e){let n,r,s=-1,i=t[1],o=0,f=7,c=4;for(0===i&&(f=138,c=3),n=0;e>=n;n++)if(r=i,i=t[2*(n+1)+1],++o>=f||r!=i){if(c>o)do{ot(r,O)}while(0!=--o);else 0!==r?(r!=s&&(ot(r,O),o--),ot(16,O),it(o-3,2)):o>10?(ot(18,O),it(o-11,7)):(ot(17,O),it(o-3,3));o=0,s=r,0===i?(f=138,c=3):r==i?(f=6,c=3):(f=7,c=4)}}function ct(){16==tt?(st($),$=0,tt=0):8>tt||(rt(255&$),$>>>=8,tt-=8)}function lt(e,r){let s,i,o;if(t.qt[X]=e,t.Gt[X]=255&r,X++,0===e?F[2*r]++:(Y++,e--,F[2*(l.xt[r]+256+1)]++,N[2*l.Bt(e)]++),0==(8191&X)&&j>2){for(s=8*X,i=M-V,o=0;30>o;o++)s+=N[2*o]*(5+l.Et[o]);if(s>>>=3,Y<n.floor(X/2)&&s<n.floor(i/2))return!0}return X==Q-1}function at(e,n){let r,s,i,o,f=0;if(0!==X)do{r=t.qt[f],s=t.Gt[f],f++,0===r?ot(s,e):(i=l.xt[s],ot(i+256+1,e),o=l.Dt[i],0!==o&&(s-=l.At[i],it(s,o)),r--,i=l.Bt(r),ot(i,n),o=l.Et[i],0!==o&&(r-=l.Vt[i],it(r,o)))}while(X>f);ot(256,e),Z=e[513]}function ut(){tt>8?st($):tt>0&&rt(255&$),$=0,tt=0}function wt(e,n,r){it(0+(r?1:0),3),((e,n)=>{ut(),Z=8,st(n),st(~n),t.Ot.set(k.subarray(e,e+n),t.pending),t.pending+=n})(e,n)}function ht(e){((e,n,r)=>{let s,i,o=0;j>0?(q.ft(t),G.ft(t),o=(()=>{let e;for(nt(F,q.vt),nt(N,G.vt),J.ft(t),e=18;e>=3&&0===O[2*l.Pt[e]+1];e--);return t.gt+=14+3*(e+1),e})(),s=t.gt+3+7>>>3,i=t.kt+3+7>>>3,i>s||(s=i)):s=i=n+5,n+4>s||-1==e?i==s?(it(2+(r?1:0),3),at(a.Rt,a.Kt)):(it(4+(r?1:0),3),((t,e,n)=>{let r;for(it(t-257,5),it(e-1,5),it(n-4,4),r=0;n>r;r++)it(O[2*l.Pt[r]+1],3);ft(F,t-1),ft(N,e-1)})(q.vt+1,G.vt+1,o+1),at(F,N)):wt(e,n,r),et(),r&&ut()})(0>V?-1:V,M-V,e),V=M,r.Jt()}function dt(){let t,e,n,s;do{if(s=v-R-M,0===s&&0===M&&0===R)s=u;else if(-1==s)s--;else if(M>=u+u-m){k.set(k.subarray(u,u+u),0),P-=u,M-=u,V-=u,t=C,n=t;do{e=65535&_[--n],_[n]=u>e?0:e-u}while(0!=--t);t=u,n=t;do{e=65535&S[--n],S[n]=u>e?0:e-u}while(0!=--t);s+=u}if(0===r.Qt)return;t=r.Xt(k,M+R,s),R+=t,3>R||(z=255&k[M],z=(z<<A^255&k[M+1])&x)}while(m>R&&0!==r.Qt)}function pt(t){let e,n,r=U,s=M,i=T;const o=M>u-m?M-(u-m):0;let f=L;const c=h,l=M+258;let a=k[s+i-1],w=k[s+i];K>T||(r>>=2),f>R&&(f=R);do{if(e=t,k[e+i]==w&&k[e+i-1]==a&&k[e]==k[s]&&k[++e]==k[s+1]){s+=2,e++;do{}while(k[++s]==k[++e]&&k[++s]==k[++e]&&k[++s]==k[++e]&&k[++s]==k[++e]&&k[++s]==k[++e]&&k[++s]==k[++e]&&k[++s]==k[++e]&&k[++s]==k[++e]&&l>s);if(n=258-(l-s),s=l-258,n>i){if(P=t,i=n,n>=f)break;a=k[s+i-1],w=k[s+i]}}}while((t=65535&S[t&c])>o&&0!=--r);return i>R?R:i}t.yt=[],t.It=[],t.bt=[],F=[],N=[],O=[],t.St=(e,n)=>{const r=t.bt,s=r[n];let i=n<<1;for(;i<=t.ht&&(i<t.ht&&g(e,r[i+1],r[i],t.yt)&&i++,!g(e,s,r[i],t.yt));)r[n]=r[i],n=i,i<<=1;r[n]=s},t.Yt=(r,l,p,y,m,g)=>(y||(y=8),m||(m=8),g||(g=0),r.Zt=null,-1==l&&(l=6),1>m||m>9||8!=y||9>p||p>15||0>l||l>9||0>g||g>2?e:(r.$t=t,w=p,u=1<<w,h=u-1,I=m+7,C=1<<I,x=C-1,A=n.floor((I+3-1)/3),k=new s(2*u),S=[],_=[],Q=1<<m+6,t.Ot=new s(4*Q),f=4*Q,t.qt=new i(Q),t.Gt=new s(Q),j=l,H=g,(e=>(e.te=e.ee=0,e.Zt=null,t.pending=0,t.ne=0,o=b,c=0,q.ct=F,q.ut=a.Lt,G.ct=N,G.ut=a.Ft,J.ct=O,J.ut=a.Nt,$=0,tt=0,Z=8,et(),(()=>{v=2*u,_[C-1]=0;for(let t=0;C-1>t;t++)_[t]=0;W=d[j].Ut,K=d[j].Tt,L=d[j].Wt,U=d[j].jt,M=0,V=0,R=0,B=T=2,E=0,z=0})(),0))(r))),t.re=()=>42!=o&&o!=b&&o!=y?e:(t.Gt=null,t.qt=null,t.Ot=null,_=null,S=null,k=null,t.$t=null,o==b?-3:0),t.se=(t,n,r)=>{let s=0;return-1==n&&(n=6),0>n||n>9||0>r||r>2?e:(d[j].Ht!=d[n].Ht&&0!==t.te&&(s=t.ie(1)),j!=n&&(j=n,W=d[j].Ut,K=d[j].Tt,L=d[j].Wt,U=d[j].jt),H=r,s)},t.oe=(t,n,r)=>{let s,i=r,f=0;if(!n||42!=o)return e;if(3>i)return 0;for(i>u-m&&(i=u-m,f=r-i),k.set(n.subarray(f,f+i),0),M=i,V=i,z=255&k[0],z=(z<<A^255&k[1])&x,s=0;i-3>=s;s++)z=(z<<A^255&k[s+2])&x,S[s&h]=_[z],_[z]=s;return 0},t.ie=(n,s)=>{let i,l,g,v,I;if(s>4||0>s)return e;if(!n.fe||!n.ce&&0!==n.Qt||o==y&&4!=s)return n.Zt=p[4],e;if(0===n.le)return n.Zt=p[7],-5;var U;if(r=n,v=c,c=s,42==o&&(l=8+(w-8<<4)<<8,g=(j-1&255)>>1,g>3&&(g=3),l|=g<<6,0!==M&&(l|=32),l+=31-l%31,o=b,rt((U=l)>>8&255),rt(255&U)),0!==t.pending){if(r.Jt(),0===r.le)return c=-1,0}else if(0===r.Qt&&v>=s&&4!=s)return r.Zt=p[7],-5;if(o==y&&0!==r.Qt)return n.Zt=p[7],-5;if(0!==r.Qt||0!==R||0!=s&&o!=y){switch(I=-1,d[j].Ht){case 0:I=(t=>{let e,n=65535;for(n>f-5&&(n=f-5);;){if(1>=R){if(dt(),0===R&&0==t)return 0;if(0===R)break}if(M+=R,R=0,e=V+n,(0===M||M>=e)&&(R=M-e,M=e,ht(!1),0===r.le))return 0;if(M-V>=u-m&&(ht(!1),0===r.le))return 0}return ht(4==t),0===r.le?4==t?2:0:4==t?3:1})(s);break;case 1:I=(t=>{let e,n=0;for(;;){if(m>R){if(dt(),m>R&&0==t)return 0;if(0===R)break}if(3>R||(z=(z<<A^255&k[M+2])&x,n=65535&_[z],S[M&h]=_[z],_[z]=M),0===n||(M-n&65535)>u-m||2!=H&&(B=pt(n)),3>B)e=lt(0,255&k[M]),R--,M++;else if(e=lt(M-P,B-3),R-=B,B>W||3>R)M+=B,B=0,z=255&k[M],z=(z<<A^255&k[M+1])&x;else{B--;do{M++,z=(z<<A^255&k[M+2])&x,n=65535&_[z],S[M&h]=_[z],_[z]=M}while(0!=--B);M++}if(e&&(ht(!1),0===r.le))return 0}return ht(4==t),0===r.le?4==t?2:0:4==t?3:1})(s);break;case 2:I=(t=>{let e,n,s=0;for(;;){if(m>R){if(dt(),m>R&&0==t)return 0;if(0===R)break}if(3>R||(z=(z<<A^255&k[M+2])&x,s=65535&_[z],S[M&h]=_[z],_[z]=M),T=B,D=P,B=2,0!==s&&W>T&&u-m>=(M-s&65535)&&(2!=H&&(B=pt(s)),5>=B&&(1==H||3==B&&M-P>4096)&&(B=2)),3>T||B>T)if(0!==E){if(e=lt(0,255&k[M-1]),e&&ht(!1),M++,R--,0===r.le)return 0}else E=1,M++,R--;else{n=M+R-3,e=lt(M-1-D,T-3),R-=T-1,T-=2;do{++M>n||(z=(z<<A^255&k[M+2])&x,s=65535&_[z],S[M&h]=_[z],_[z]=M)}while(0!=--T);if(E=0,B=2,M++,e&&(ht(!1),0===r.le))return 0}}return 0!==E&&(e=lt(0,255&k[M-1]),E=0),ht(4==t),0===r.le?4==t?2:0:4==t?3:1})(s)}if(2!=I&&3!=I||(o=y),0==I||2==I)return 0===r.le&&(c=-1),0;if(1==I){if(1==s)it(2,3),ot(256,a.Rt),ct(),9>1+Z+10-tt&&(it(2,3),ot(256,a.Rt),ct()),Z=7;else if(wt(0,0,!1),3==s)for(i=0;C>i;i++)_[i]=0;if(r.Jt(),0===r.le)return c=-1,0}}return 4!=s?0:1}}function v(){const t=this;t.ae=0,t.ue=0,t.Qt=0,t.te=0,t.le=0,t.ee=0}return v.prototype={Yt(t,e){const n=this;return n.$t=new k,e||(e=15),n.$t.Yt(n,t,e)},ie(t){const n=this;return n.$t?n.$t.ie(n,t):e},re(){const t=this;if(!t.$t)return e;const n=t.$t.re();return t.$t=null,n},se(t,n){const r=this;return r.$t?r.$t.se(r,t,n):e},oe(t,n){const r=this;return r.$t?r.$t.oe(r,t,n):e},Xt(t,e,n){const r=this;let s=r.Qt;return s>n&&(s=n),0===s?0:(r.Qt-=s,t.set(r.ce.subarray(r.ae,r.ae+s),e),r.ae+=s,r.te+=s,s)},Jt(){const t=this;let e=t.$t.pending;e>t.le&&(e=t.le),0!==e&&(t.fe.set(t.$t.Ot.subarray(t.$t.ne,t.$t.ne+e),t.ue),t.ue+=e,t.$t.ne+=e,t.ee+=e,t.le-=e,t.$t.pending-=e,0===t.$t.pending&&(t.$t.ne=0))}},function(t){const e=new v,i=(o=t&&t.chunkSize?t.chunkSize:65536)+5*(n.floor(o/16383)+1);var o;const f=new s(i);let c=t?t.level:-1;void 0===c&&(c=-1),e.Yt(c),e.fe=f,this.append=(t,n)=>{let o,c,l=0,a=0,u=0;const w=[];if(t.length){e.ae=0,e.ce=t,e.Qt=t.length;do{if(e.ue=0,e.le=i,o=e.ie(0),0!=o)throw new r("deflating: "+e.Zt);e.ue&&(e.ue==i?w.push(new s(f)):w.push(f.slice(0,e.ue))),u+=e.ue,n&&e.ae>0&&e.ae!=l&&(n(e.ae),l=e.ae)}while(e.Qt>0||0===e.le);return w.length>1?(c=new s(u),w.forEach((t=>{c.set(t,a),a+=t.length}))):c=w[0]||new s,c}},this.flush=()=>{let t,n,o=0,c=0;const l=[];do{if(e.ue=0,e.le=i,t=e.ie(4),1!=t&&0!=t)throw new r("deflating: "+e.Zt);i-e.le>0&&l.push(f.slice(0,e.ue)),c+=e.ue}while(e.Qt>0||0===e.le);return e.re(),n=new s(c),l.forEach((t=>{n.set(t,o),o+=t.length})),n}}})(),vt=(()=>{const t=-2,e=-3,i=-5,o=[0,1,3,7,15,31,63,127,255,511,1023,2047,4095,8191,16383,32767,65535],c=[96,7,256,0,8,80,0,8,16,84,8,115,82,7,31,0,8,112,0,8,48,0,9,192,80,7,10,0,8,96,0,8,32,0,9,160,0,8,0,0,8,128,0,8,64,0,9,224,80,7,6,0,8,88,0,8,24,0,9,144,83,7,59,0,8,120,0,8,56,0,9,208,81,7,17,0,8,104,0,8,40,0,9,176,0,8,8,0,8,136,0,8,72,0,9,240,80,7,4,0,8,84,0,8,20,85,8,227,83,7,43,0,8,116,0,8,52,0,9,200,81,7,13,0,8,100,0,8,36,0,9,168,0,8,4,0,8,132,0,8,68,0,9,232,80,7,8,0,8,92,0,8,28,0,9,152,84,7,83,0,8,124,0,8,60,0,9,216,82,7,23,0,8,108,0,8,44,0,9,184,0,8,12,0,8,140,0,8,76,0,9,248,80,7,3,0,8,82,0,8,18,85,8,163,83,7,35,0,8,114,0,8,50,0,9,196,81,7,11,0,8,98,0,8,34,0,9,164,0,8,2,0,8,130,0,8,66,0,9,228,80,7,7,0,8,90,0,8,26,0,9,148,84,7,67,0,8,122,0,8,58,0,9,212,82,7,19,0,8,106,0,8,42,0,9,180,0,8,10,0,8,138,0,8,74,0,9,244,80,7,5,0,8,86,0,8,22,192,8,0,83,7,51,0,8,118,0,8,54,0,9,204,81,7,15,0,8,102,0,8,38,0,9,172,0,8,6,0,8,134,0,8,70,0,9,236,80,7,9,0,8,94,0,8,30,0,9,156,84,7,99,0,8,126,0,8,62,0,9,220,82,7,27,0,8,110,0,8,46,0,9,188,0,8,14,0,8,142,0,8,78,0,9,252,96,7,256,0,8,81,0,8,17,85,8,131,82,7,31,0,8,113,0,8,49,0,9,194,80,7,10,0,8,97,0,8,33,0,9,162,0,8,1,0,8,129,0,8,65,0,9,226,80,7,6,0,8,89,0,8,25,0,9,146,83,7,59,0,8,121,0,8,57,0,9,210,81,7,17,0,8,105,0,8,41,0,9,178,0,8,9,0,8,137,0,8,73,0,9,242,80,7,4,0,8,85,0,8,21,80,8,258,83,7,43,0,8,117,0,8,53,0,9,202,81,7,13,0,8,101,0,8,37,0,9,170,0,8,5,0,8,133,0,8,69,0,9,234,80,7,8,0,8,93,0,8,29,0,9,154,84,7,83,0,8,125,0,8,61,0,9,218,82,7,23,0,8,109,0,8,45,0,9,186,0,8,13,0,8,141,0,8,77,0,9,250,80,7,3,0,8,83,0,8,19,85,8,195,83,7,35,0,8,115,0,8,51,0,9,198,81,7,11,0,8,99,0,8,35,0,9,166,0,8,3,0,8,131,0,8,67,0,9,230,80,7,7,0,8,91,0,8,27,0,9,150,84,7,67,0,8,123,0,8,59,0,9,214,82,7,19,0,8,107,0,8,43,0,9,182,0,8,11,0,8,139,0,8,75,0,9,246,80,7,5,0,8,87,0,8,23,192,8,0,83,7,51,0,8,119,0,8,55,0,9,206,81,7,15,0,8,103,0,8,39,0,9,174,0,8,7,0,8,135,0,8,71,0,9,238,80,7,9,0,8,95,0,8,31,0,9,158,84,7,99,0,8,127,0,8,63,0,9,222,82,7,27,0,8,111,0,8,47,0,9,190,0,8,15,0,8,143,0,8,79,0,9,254,96,7,256,0,8,80,0,8,16,84,8,115,82,7,31,0,8,112,0,8,48,0,9,193,80,7,10,0,8,96,0,8,32,0,9,161,0,8,0,0,8,128,0,8,64,0,9,225,80,7,6,0,8,88,0,8,24,0,9,145,83,7,59,0,8,120,0,8,56,0,9,209,81,7,17,0,8,104,0,8,40,0,9,177,0,8,8,0,8,136,0,8,72,0,9,241,80,7,4,0,8,84,0,8,20,85,8,227,83,7,43,0,8,116,0,8,52,0,9,201,81,7,13,0,8,100,0,8,36,0,9,169,0,8,4,0,8,132,0,8,68,0,9,233,80,7,8,0,8,92,0,8,28,0,9,153,84,7,83,0,8,124,0,8,60,0,9,217,82,7,23,0,8,108,0,8,44,0,9,185,0,8,12,0,8,140,0,8,76,0,9,249,80,7,3,0,8,82,0,8,18,85,8,163,83,7,35,0,8,114,0,8,50,0,9,197,81,7,11,0,8,98,0,8,34,0,9,165,0,8,2,0,8,130,0,8,66,0,9,229,80,7,7,0,8,90,0,8,26,0,9,149,84,7,67,0,8,122,0,8,58,0,9,213,82,7,19,0,8,106,0,8,42,0,9,181,0,8,10,0,8,138,0,8,74,0,9,245,80,7,5,0,8,86,0,8,22,192,8,0,83,7,51,0,8,118,0,8,54,0,9,205,81,7,15,0,8,102,0,8,38,0,9,173,0,8,6,0,8,134,0,8,70,0,9,237,80,7,9,0,8,94,0,8,30,0,9,157,84,7,99,0,8,126,0,8,62,0,9,221,82,7,27,0,8,110,0,8,46,0,9,189,0,8,14,0,8,142,0,8,78,0,9,253,96,7,256,0,8,81,0,8,17,85,8,131,82,7,31,0,8,113,0,8,49,0,9,195,80,7,10,0,8,97,0,8,33,0,9,163,0,8,1,0,8,129,0,8,65,0,9,227,80,7,6,0,8,89,0,8,25,0,9,147,83,7,59,0,8,121,0,8,57,0,9,211,81,7,17,0,8,105,0,8,41,0,9,179,0,8,9,0,8,137,0,8,73,0,9,243,80,7,4,0,8,85,0,8,21,80,8,258,83,7,43,0,8,117,0,8,53,0,9,203,81,7,13,0,8,101,0,8,37,0,9,171,0,8,5,0,8,133,0,8,69,0,9,235,80,7,8,0,8,93,0,8,29,0,9,155,84,7,83,0,8,125,0,8,61,0,9,219,82,7,23,0,8,109,0,8,45,0,9,187,0,8,13,0,8,141,0,8,77,0,9,251,80,7,3,0,8,83,0,8,19,85,8,195,83,7,35,0,8,115,0,8,51,0,9,199,81,7,11,0,8,99,0,8,35,0,9,167,0,8,3,0,8,131,0,8,67,0,9,231,80,7,7,0,8,91,0,8,27,0,9,151,84,7,67,0,8,123,0,8,59,0,9,215,82,7,19,0,8,107,0,8,43,0,9,183,0,8,11,0,8,139,0,8,75,0,9,247,80,7,5,0,8,87,0,8,23,192,8,0,83,7,51,0,8,119,0,8,55,0,9,207,81,7,15,0,8,103,0,8,39,0,9,175,0,8,7,0,8,135,0,8,71,0,9,239,80,7,9,0,8,95,0,8,31,0,9,159,84,7,99,0,8,127,0,8,63,0,9,223,82,7,27,0,8,111,0,8,47,0,9,191,0,8,15,0,8,143,0,8,79,0,9,255],l=[80,5,1,87,5,257,83,5,17,91,5,4097,81,5,5,89,5,1025,85,5,65,93,5,16385,80,5,3,88,5,513,84,5,33,92,5,8193,82,5,9,90,5,2049,86,5,129,192,5,24577,80,5,2,87,5,385,83,5,25,91,5,6145,81,5,7,89,5,1537,85,5,97,93,5,24577,80,5,4,88,5,769,84,5,49,92,5,12289,82,5,13,90,5,3073,86,5,193,192,5,24577],a=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],u=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,112,112],w=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577],h=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13];function d(){let t,n,r,s,o,c;function l(t,n,f,l,a,u,w,h,d,p,b){let y,m,g,k,v,S,_,z,C,I,x,A,V,B,D;I=0,v=f;do{r[t[n+I]]++,I++,v--}while(0!==v);if(r[0]==f)return w[0]=-1,h[0]=0,0;for(z=h[0],S=1;15>=S&&0===r[S];S++);for(_=S,S>z&&(z=S),v=15;0!==v&&0===r[v];v--);for(g=v,z>v&&(z=v),h[0]=z,B=1<<S;v>S;S++,B<<=1)if(0>(B-=r[S]))return e;if(0>(B-=r[v]))return e;for(r[v]+=B,c[1]=S=0,I=1,V=2;0!=--v;)c[V]=S+=r[I],V++,I++;v=0,I=0;do{0!==(S=t[n+I])&&(b[c[S]++]=v),I++}while(++v<f);for(f=c[g],c[0]=v=0,I=0,k=-1,A=-z,o[0]=0,x=0,D=0;g>=_;_++)for(y=r[_];0!=y--;){for(;_>A+z;){if(k++,A+=z,D=g-A,D=D>z?z:D,(m=1<<(S=_-A))>y+1&&(m-=y+1,V=_,D>S))for(;++S<D&&(m<<=1)>r[++V];)m-=r[V];if(D=1<<S,p[0]+D>1440)return e;o[k]=x=p[0],p[0]+=D,0!==k?(c[k]=v,s[0]=S,s[1]=z,S=v>>>A-z,s[2]=x-o[k-1]-S,d.set(s,3*(o[k-1]+S))):w[0]=x}for(s[1]=_-A,f>I?b[I]<l?(s[0]=256>b[I]?0:96,s[2]=b[I++]):(s[0]=u[b[I]-l]+16+64,s[2]=a[b[I++]-l]):s[0]=192,m=1<<_-A,S=v>>>A;D>S;S+=m)d.set(s,3*(x+S));for(S=1<<_-1;0!=(v&S);S>>>=1)v^=S;for(v^=S,C=(1<<A)-1;(v&C)!=c[k];)k--,A-=z,C=(1<<A)-1}return 0!==B&&1!=g?i:0}function d(e){let i;for(t||(t=[],n=[],r=new f(16),s=[],o=new f(15),c=new f(16)),n.length<e&&(n=[]),i=0;e>i;i++)n[i]=0;for(i=0;16>i;i++)r[i]=0;for(i=0;3>i;i++)s[i]=0;o.set(r.subarray(0,15),0),c.set(r.subarray(0,16),0)}this.we=(r,s,o,f,c)=>{let a;return d(19),t[0]=0,a=l(r,0,19,19,null,null,o,s,f,t,n),a==e?c.Zt="oversubscribed dynamic bit lengths tree":a!=i&&0!==s[0]||(c.Zt="incomplete dynamic bit lengths tree",a=e),a},this.he=(r,s,o,f,c,p,b,y,m)=>{let g;return d(288),t[0]=0,g=l(o,0,r,257,a,u,p,f,y,t,n),0!=g||0===f[0]?(g==e?m.Zt="oversubscribed literal/length tree":-4!=g&&(m.Zt="incomplete literal/length tree",g=e),g):(d(288),g=l(o,r,s,0,w,h,b,c,y,t,n),0!=g||0===c[0]&&r>257?(g==e?m.Zt="oversubscribed distance tree":g==i?(m.Zt="incomplete distance tree",g=e):-4!=g&&(m.Zt="empty distance tree with lengths",g=e),g):0)}}function p(){const n=this;let r,s,i,f,c=0,l=0,a=0,u=0,w=0,h=0,d=0,p=0,b=0,y=0;function m(t,n,r,s,i,f,c,l){let a,u,w,h,d,p,b,y,m,g,k,v,S,_,z,C;b=l.ae,y=l.Qt,d=c.de,p=c.pe,m=c.write,g=m<c.read?c.read-m-1:c.end-m,k=o[t],v=o[n];do{for(;20>p;)y--,d|=(255&l.be(b++))<<p,p+=8;if(a=d&k,u=r,w=s,C=3*(w+a),0!==(h=u[C]))for(;;){if(d>>=u[C+1],p-=u[C+1],0!=(16&h)){for(h&=15,S=u[C+2]+(d&o[h]),d>>=h,p-=h;15>p;)y--,d|=(255&l.be(b++))<<p,p+=8;for(a=d&v,u=i,w=f,C=3*(w+a),h=u[C];;){if(d>>=u[C+1],p-=u[C+1],0!=(16&h)){for(h&=15;h>p;)y--,d|=(255&l.be(b++))<<p,p+=8;if(_=u[C+2]+(d&o[h]),d>>=h,p-=h,g-=S,_>m){z=m-_;do{z+=c.end}while(0>z);if(h=c.end-z,S>h){if(S-=h,m-z>0&&h>m-z)do{c.ye[m++]=c.ye[z++]}while(0!=--h);else c.ye.set(c.ye.subarray(z,z+h),m),m+=h,z+=h,h=0;z=0}}else z=m-_,m-z>0&&2>m-z?(c.ye[m++]=c.ye[z++],c.ye[m++]=c.ye[z++],S-=2):(c.ye.set(c.ye.subarray(z,z+2),m),m+=2,z+=2,S-=2);if(m-z>0&&S>m-z)do{c.ye[m++]=c.ye[z++]}while(0!=--S);else c.ye.set(c.ye.subarray(z,z+S),m),m+=S,z+=S,S=0;break}if(0!=(64&h))return l.Zt="invalid distance code",S=l.Qt-y,S=S>p>>3?p>>3:S,y+=S,b-=S,p-=S<<3,c.de=d,c.pe=p,l.Qt=y,l.te+=b-l.ae,l.ae=b,c.write=m,e;a+=u[C+2],a+=d&o[h],C=3*(w+a),h=u[C]}break}if(0!=(64&h))return 0!=(32&h)?(S=l.Qt-y,S=S>p>>3?p>>3:S,y+=S,b-=S,p-=S<<3,c.de=d,c.pe=p,l.Qt=y,l.te+=b-l.ae,l.ae=b,c.write=m,1):(l.Zt="invalid literal/length code",S=l.Qt-y,S=S>p>>3?p>>3:S,y+=S,b-=S,p-=S<<3,c.de=d,c.pe=p,l.Qt=y,l.te+=b-l.ae,l.ae=b,c.write=m,e);if(a+=u[C+2],a+=d&o[h],C=3*(w+a),0===(h=u[C])){d>>=u[C+1],p-=u[C+1],c.ye[m++]=u[C+2],g--;break}}else d>>=u[C+1],p-=u[C+1],c.ye[m++]=u[C+2],g--}while(g>=258&&y>=10);return S=l.Qt-y,S=S>p>>3?p>>3:S,y+=S,b-=S,p-=S<<3,c.de=d,c.pe=p,l.Qt=y,l.te+=b-l.ae,l.ae=b,c.write=m,0}n.init=(t,e,n,o,c,l)=>{r=0,d=t,p=e,i=n,b=o,f=c,y=l,s=null},n.me=(n,g,k)=>{let v,S,_,z,C,I,x,A=0,V=0,B=0;for(B=g.ae,z=g.Qt,A=n.de,V=n.pe,C=n.write,I=C<n.read?n.read-C-1:n.end-C;;)switch(r){case 0:if(I>=258&&z>=10&&(n.de=A,n.pe=V,g.Qt=z,g.te+=B-g.ae,g.ae=B,n.write=C,k=m(d,p,i,b,f,y,n,g),B=g.ae,z=g.Qt,A=n.de,V=n.pe,C=n.write,I=C<n.read?n.read-C-1:n.end-C,0!=k)){r=1==k?7:9;break}a=d,s=i,l=b,r=1;case 1:for(v=a;v>V;){if(0===z)return n.de=A,n.pe=V,g.Qt=z,g.te+=B-g.ae,g.ae=B,n.write=C,n.ge(g,k);k=0,z--,A|=(255&g.be(B++))<<V,V+=8}if(S=3*(l+(A&o[v])),A>>>=s[S+1],V-=s[S+1],_=s[S],0===_){u=s[S+2],r=6;break}if(0!=(16&_)){w=15&_,c=s[S+2],r=2;break}if(0==(64&_)){a=_,l=S/3+s[S+2];break}if(0!=(32&_)){r=7;break}return r=9,g.Zt="invalid literal/length code",k=e,n.de=A,n.pe=V,g.Qt=z,g.te+=B-g.ae,g.ae=B,n.write=C,n.ge(g,k);case 2:for(v=w;v>V;){if(0===z)return n.de=A,n.pe=V,g.Qt=z,g.te+=B-g.ae,g.ae=B,n.write=C,n.ge(g,k);k=0,z--,A|=(255&g.be(B++))<<V,V+=8}c+=A&o[v],A>>=v,V-=v,a=p,s=f,l=y,r=3;case 3:for(v=a;v>V;){if(0===z)return n.de=A,n.pe=V,g.Qt=z,g.te+=B-g.ae,g.ae=B,n.write=C,n.ge(g,k);k=0,z--,A|=(255&g.be(B++))<<V,V+=8}if(S=3*(l+(A&o[v])),A>>=s[S+1],V-=s[S+1],_=s[S],0!=(16&_)){w=15&_,h=s[S+2],r=4;break}if(0==(64&_)){a=_,l=S/3+s[S+2];break}return r=9,g.Zt="invalid distance code",k=e,n.de=A,n.pe=V,g.Qt=z,g.te+=B-g.ae,g.ae=B,n.write=C,n.ge(g,k);case 4:for(v=w;v>V;){if(0===z)return n.de=A,n.pe=V,g.Qt=z,g.te+=B-g.ae,g.ae=B,n.write=C,n.ge(g,k);k=0,z--,A|=(255&g.be(B++))<<V,V+=8}h+=A&o[v],A>>=v,V-=v,r=5;case 5:for(x=C-h;0>x;)x+=n.end;for(;0!==c;){if(0===I&&(C==n.end&&0!==n.read&&(C=0,I=C<n.read?n.read-C-1:n.end-C),0===I&&(n.write=C,k=n.ge(g,k),C=n.write,I=C<n.read?n.read-C-1:n.end-C,C==n.end&&0!==n.read&&(C=0,I=C<n.read?n.read-C-1:n.end-C),0===I)))return n.de=A,n.pe=V,g.Qt=z,g.te+=B-g.ae,g.ae=B,n.write=C,n.ge(g,k);n.ye[C++]=n.ye[x++],I--,x==n.end&&(x=0),c--}r=0;break;case 6:if(0===I&&(C==n.end&&0!==n.read&&(C=0,I=C<n.read?n.read-C-1:n.end-C),0===I&&(n.write=C,k=n.ge(g,k),C=n.write,I=C<n.read?n.read-C-1:n.end-C,C==n.end&&0!==n.read&&(C=0,I=C<n.read?n.read-C-1:n.end-C),0===I)))return n.de=A,n.pe=V,g.Qt=z,g.te+=B-g.ae,g.ae=B,n.write=C,n.ge(g,k);k=0,n.ye[C++]=u,I--,r=0;break;case 7:if(V>7&&(V-=8,z++,B--),n.write=C,k=n.ge(g,k),C=n.write,I=C<n.read?n.read-C-1:n.end-C,n.read!=n.write)return n.de=A,n.pe=V,g.Qt=z,g.te+=B-g.ae,g.ae=B,n.write=C,n.ge(g,k);r=8;case 8:return k=1,n.de=A,n.pe=V,g.Qt=z,g.te+=B-g.ae,g.ae=B,n.write=C,n.ge(g,k);case 9:return k=e,n.de=A,n.pe=V,g.Qt=z,g.te+=B-g.ae,g.ae=B,n.write=C,n.ge(g,k);default:return k=t,n.de=A,n.pe=V,g.Qt=z,g.te+=B-g.ae,g.ae=B,n.write=C,n.ge(g,k)}},n.ke=()=>{}}d.ve=(t,e,n,r)=>(t[0]=9,e[0]=5,n[0]=c,r[0]=l,0);const b=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];function y(n,r){const c=this;let l,a=0,u=0,w=0,h=0;const y=[0],m=[0],g=new p;let k=0,v=new f(4320);const S=new d;c.pe=0,c.de=0,c.ye=new s(r),c.end=r,c.read=0,c.write=0,c.reset=(t,e)=>{e&&(e[0]=0),6==a&&g.ke(t),a=0,c.pe=0,c.de=0,c.read=c.write=0},c.reset(n,null),c.ge=(t,e)=>{let n,r,s;return r=t.ue,s=c.read,n=(s>c.write?c.end:c.write)-s,n>t.le&&(n=t.le),0!==n&&e==i&&(e=0),t.le-=n,t.ee+=n,t.fe.set(c.ye.subarray(s,s+n),r),r+=n,s+=n,s==c.end&&(s=0,c.write==c.end&&(c.write=0),n=c.write-s,n>t.le&&(n=t.le),0!==n&&e==i&&(e=0),t.le-=n,t.ee+=n,t.fe.set(c.ye.subarray(s,s+n),r),r+=n,s+=n),t.ue=r,c.read=s,e},c.me=(n,r)=>{let s,i,f,p,_,z,C,I;for(p=n.ae,_=n.Qt,i=c.de,f=c.pe,z=c.write,C=z<c.read?c.read-z-1:c.end-z;;){let x,A,V,B,D,E,M,P;switch(a){case 0:for(;3>f;){if(0===_)return c.de=i,c.pe=f,n.Qt=_,n.te+=p-n.ae,n.ae=p,c.write=z,c.ge(n,r);r=0,_--,i|=(255&n.be(p++))<<f,f+=8}switch(s=7&i,k=1&s,s>>>1){case 0:i>>>=3,f-=3,s=7&f,i>>>=s,f-=s,a=1;break;case 1:x=[],A=[],V=[[]],B=[[]],d.ve(x,A,V,B),g.init(x[0],A[0],V[0],0,B[0],0),i>>>=3,f-=3,a=6;break;case 2:i>>>=3,f-=3,a=3;break;case 3:return i>>>=3,f-=3,a=9,n.Zt="invalid block type",r=e,c.de=i,c.pe=f,n.Qt=_,n.te+=p-n.ae,n.ae=p,c.write=z,c.ge(n,r)}break;case 1:for(;32>f;){if(0===_)return c.de=i,c.pe=f,n.Qt=_,n.te+=p-n.ae,n.ae=p,c.write=z,c.ge(n,r);r=0,_--,i|=(255&n.be(p++))<<f,f+=8}if((~i>>>16&65535)!=(65535&i))return a=9,n.Zt="invalid stored block lengths",r=e,c.de=i,c.pe=f,n.Qt=_,n.te+=p-n.ae,n.ae=p,c.write=z,c.ge(n,r);u=65535&i,i=f=0,a=0!==u?2:0!==k?7:0;break;case 2:if(0===_)return c.de=i,c.pe=f,n.Qt=_,n.te+=p-n.ae,n.ae=p,c.write=z,c.ge(n,r);if(0===C&&(z==c.end&&0!==c.read&&(z=0,C=z<c.read?c.read-z-1:c.end-z),0===C&&(c.write=z,r=c.ge(n,r),z=c.write,C=z<c.read?c.read-z-1:c.end-z,z==c.end&&0!==c.read&&(z=0,C=z<c.read?c.read-z-1:c.end-z),0===C)))return c.de=i,c.pe=f,n.Qt=_,n.te+=p-n.ae,n.ae=p,c.write=z,c.ge(n,r);if(r=0,s=u,s>_&&(s=_),s>C&&(s=C),c.ye.set(n.Xt(p,s),z),p+=s,_-=s,z+=s,C-=s,0!=(u-=s))break;a=0!==k?7:0;break;case 3:for(;14>f;){if(0===_)return c.de=i,c.pe=f,n.Qt=_,n.te+=p-n.ae,n.ae=p,c.write=z,c.ge(n,r);r=0,_--,i|=(255&n.be(p++))<<f,f+=8}if(w=s=16383&i,(31&s)>29||(s>>5&31)>29)return a=9,n.Zt="too many length or distance symbols",r=e,c.de=i,c.pe=f,n.Qt=_,n.te+=p-n.ae,n.ae=p,c.write=z,c.ge(n,r);if(s=258+(31&s)+(s>>5&31),!l||l.length<s)l=[];else for(I=0;s>I;I++)l[I]=0;i>>>=14,f-=14,h=0,a=4;case 4:for(;4+(w>>>10)>h;){for(;3>f;){if(0===_)return c.de=i,c.pe=f,n.Qt=_,n.te+=p-n.ae,n.ae=p,c.write=z,c.ge(n,r);r=0,_--,i|=(255&n.be(p++))<<f,f+=8}l[b[h++]]=7&i,i>>>=3,f-=3}for(;19>h;)l[b[h++]]=0;if(y[0]=7,s=S.we(l,y,m,v,n),0!=s)return(r=s)==e&&(l=null,a=9),c.de=i,c.pe=f,n.Qt=_,n.te+=p-n.ae,n.ae=p,c.write=z,c.ge(n,r);h=0,a=5;case 5:for(;s=w,258+(31&s)+(s>>5&31)>h;){let t,u;for(s=y[0];s>f;){if(0===_)return c.de=i,c.pe=f,n.Qt=_,n.te+=p-n.ae,n.ae=p,c.write=z,c.ge(n,r);r=0,_--,i|=(255&n.be(p++))<<f,f+=8}if(s=v[3*(m[0]+(i&o[s]))+1],u=v[3*(m[0]+(i&o[s]))+2],16>u)i>>>=s,f-=s,l[h++]=u;else{for(I=18==u?7:u-14,t=18==u?11:3;s+I>f;){if(0===_)return c.de=i,c.pe=f,n.Qt=_,n.te+=p-n.ae,n.ae=p,c.write=z,c.ge(n,r);r=0,_--,i|=(255&n.be(p++))<<f,f+=8}if(i>>>=s,f-=s,t+=i&o[I],i>>>=I,f-=I,I=h,s=w,I+t>258+(31&s)+(s>>5&31)||16==u&&1>I)return l=null,a=9,n.Zt="invalid bit length repeat",r=e,c.de=i,c.pe=f,n.Qt=_,n.te+=p-n.ae,n.ae=p,c.write=z,c.ge(n,r);u=16==u?l[I-1]:0;do{l[I++]=u}while(0!=--t);h=I}}if(m[0]=-1,D=[],E=[],M=[],P=[],D[0]=9,E[0]=6,s=w,s=S.he(257+(31&s),1+(s>>5&31),l,D,E,M,P,v,n),0!=s)return s==e&&(l=null,a=9),r=s,c.de=i,c.pe=f,n.Qt=_,n.te+=p-n.ae,n.ae=p,c.write=z,c.ge(n,r);g.init(D[0],E[0],v,M[0],v,P[0]),a=6;case 6:if(c.de=i,c.pe=f,n.Qt=_,n.te+=p-n.ae,n.ae=p,c.write=z,1!=(r=g.me(c,n,r)))return c.ge(n,r);if(r=0,g.ke(n),p=n.ae,_=n.Qt,i=c.de,f=c.pe,z=c.write,C=z<c.read?c.read-z-1:c.end-z,0===k){a=0;break}a=7;case 7:if(c.write=z,r=c.ge(n,r),z=c.write,C=z<c.read?c.read-z-1:c.end-z,c.read!=c.write)return c.de=i,c.pe=f,n.Qt=_,n.te+=p-n.ae,n.ae=p,c.write=z,c.ge(n,r);a=8;case 8:return r=1,c.de=i,c.pe=f,n.Qt=_,n.te+=p-n.ae,n.ae=p,c.write=z,c.ge(n,r);case 9:return r=e,c.de=i,c.pe=f,n.Qt=_,n.te+=p-n.ae,n.ae=p,c.write=z,c.ge(n,r);default:return r=t,c.de=i,c.pe=f,n.Qt=_,n.te+=p-n.ae,n.ae=p,c.write=z,c.ge(n,r)}}},c.ke=t=>{c.reset(t,null),c.ye=null,v=null},c.Se=(t,e,n)=>{c.ye.set(t.subarray(e,e+n),0),c.read=c.write=n},c._e=()=>1==a?1:0}const m=13,g=[0,0,255,255];function k(){const n=this;function r(e){return e&&e.ze?(e.te=e.ee=0,e.Zt=null,e.ze.mode=7,e.ze.Ce.reset(e,null),0):t}n.mode=0,n.method=0,n.Ie=[0],n.xe=0,n.marker=0,n.Ae=0,n.Ve=t=>(n.Ce&&n.Ce.ke(t),n.Ce=null,0),n.Be=(e,s)=>(e.Zt=null,n.Ce=null,8>s||s>15?(n.Ve(e),t):(n.Ae=s,e.ze.Ce=new y(e,1<<s),r(e),0)),n.De=(n,r)=>{let s,o;if(!n||!n.ze||!n.ce)return t;const f=n.ze;for(r=4==r?i:0,s=i;;)switch(f.mode){case 0:if(0===n.Qt)return s;if(s=r,n.Qt--,n.te++,8!=(15&(f.method=n.be(n.ae++)))){f.mode=m,n.Zt="unknown compression method",f.marker=5;break}if(8+(f.method>>4)>f.Ae){f.mode=m,n.Zt="invalid win size",f.marker=5;break}f.mode=1;case 1:if(0===n.Qt)return s;if(s=r,n.Qt--,n.te++,o=255&n.be(n.ae++),((f.method<<8)+o)%31!=0){f.mode=m,n.Zt="incorrect header check",f.marker=5;break}if(0==(32&o)){f.mode=7;break}f.mode=2;case 2:if(0===n.Qt)return s;s=r,n.Qt--,n.te++,f.xe=(255&n.be(n.ae++))<<24&4278190080,f.mode=3;case 3:if(0===n.Qt)return s;s=r,n.Qt--,n.te++,f.xe+=(255&n.be(n.ae++))<<16&16711680,f.mode=4;case 4:if(0===n.Qt)return s;s=r,n.Qt--,n.te++,f.xe+=(255&n.be(n.ae++))<<8&65280,f.mode=5;case 5:return 0===n.Qt?s:(s=r,n.Qt--,n.te++,f.xe+=255&n.be(n.ae++),f.mode=6,2);case 6:return f.mode=m,n.Zt="need dictionary",f.marker=0,t;case 7:if(s=f.Ce.me(n,s),s==e){f.mode=m,f.marker=0;break}if(0==s&&(s=r),1!=s)return s;s=r,f.Ce.reset(n,f.Ie),f.mode=12;case 12:return n.Qt=0,1;case m:return e;default:return t}},n.Ee=(e,n,r)=>{let s=0,i=r;if(!e||!e.ze||6!=e.ze.mode)return t;const o=e.ze;return i<1<<o.Ae||(i=(1<<o.Ae)-1,s=r-i),o.Ce.Se(n,s,i),o.mode=7,0},n.Me=n=>{let s,o,f,c,l;if(!n||!n.ze)return t;const a=n.ze;if(a.mode!=m&&(a.mode=m,a.marker=0),0===(s=n.Qt))return i;for(o=n.ae,f=a.marker;0!==s&&4>f;)n.be(o)==g[f]?f++:f=0!==n.be(o)?0:4-f,o++,s--;return n.te+=o-n.ae,n.ae=o,n.Qt=s,a.marker=f,4!=f?e:(c=n.te,l=n.ee,r(n),n.te=c,n.ee=l,a.mode=7,0)},n.Pe=e=>e&&e.ze&&e.ze.Ce?e.ze.Ce._e():t}function v(){}return v.prototype={Be(t){const e=this;return e.ze=new k,t||(t=15),e.ze.Be(e,t)},De(e){const n=this;return n.ze?n.ze.De(n,e):t},Ve(){const e=this;if(!e.ze)return t;const n=e.ze.Ve(e);return e.ze=null,n},Me(){const e=this;return e.ze?e.ze.Me(e):t},Ee(e,n){const r=this;return r.ze?r.ze.Ee(r,e,n):t},be(t){return this.ce[t]},Xt(t,e){return this.ce.subarray(t,t+e)}},function(t){const e=new v,o=t&&t.chunkSize?n.floor(2*t.chunkSize):131072,f=new s(o);let c=!1;e.Be(),e.fe=f,this.append=(t,n)=>{const l=[];let a,u,w=0,h=0,d=0;if(0!==t.length){e.ae=0,e.ce=t,e.Qt=t.length;do{if(e.ue=0,e.le=o,0!==e.Qt||c||(e.ae=0,c=!0),a=e.De(0),c&&a===i){if(0!==e.Qt)throw new r("inflating: bad input")}else if(0!==a&&1!==a)throw new r("inflating: "+e.Zt);if((c||1===a)&&e.Qt===t.length)throw new r("inflating: bad input");e.ue&&(e.ue===o?l.push(new s(f)):l.push(f.slice(0,e.ue))),d+=e.ue,n&&e.ae>0&&e.ae!=w&&(n(e.ae),w=e.ae)}while(e.Qt>0||0===e.le);return l.length>1?(u=new s(d),l.forEach((t=>{u.set(t,h),h+=t.length}))):u=l[0]||new s,u}},this.flush=()=>{e.Ve()}}})();self.initCodec=()=>{self.Deflate=kt,self.Inflate=vt};\n'],{type:"text/javascript"}));e({workerScripts:{inflate:[t],deflate:[t]}});}};

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

	function getMimeType() {
		return "application/octet-stream";
	}

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

	var streamCodecShim = (library, options = {}, registerDataHandler) => {
		return {
			Deflate: createCodecClass(library.Deflate, options.deflate, registerDataHandler),
			Inflate: createCodecClass(library.Inflate, options.inflate, registerDataHandler)
		};
	};

	function createCodecClass(constructor, constructorOptions, registerDataHandler) {
		return class {

			constructor(options) {
				const codecAdapter = this;
				const onData = data => {
					if (codecAdapter.pendingData) {
						const { pendingData } = codecAdapter;
						codecAdapter.pendingData = new Uint8Array(pendingData.length + data.length);
						codecAdapter.pendingData.set(pendingData, 0);
						codecAdapter.pendingData.set(data, pendingData.length);
					} else {
						codecAdapter.pendingData = new Uint8Array(data);
					}
				};
				// eslint-disable-next-line no-prototype-builtins
				if (options.hasOwnProperty("level") && options.level === undefined) {
					delete options.level;
				}
				codecAdapter.codec = new constructor(Object.assign({}, constructorOptions, options));
				registerDataHandler(codecAdapter.codec, onData);
			}
			append(data) {
				this.codec.push(data);
				return getResponse(this);
			}
			flush() {
				this.codec.push(new Uint8Array(), true);
				return getResponse(this);
			}
		};

		function getResponse(codec) {
			if (codec.pendingData) {
				const output = codec.pendingData;
				codec.pendingData = null;
				return output;
			} else {
				return new Uint8Array();
			}
		}
	}

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

	const table = [];
	for (let i = 0; i < 256; i++) {
		let t = i;
		for (let j = 0; j < 8; j++) {
			if (t & 1) {
				t = (t >>> 1) ^ 0xEDB88320;
			} else {
				t = t >>> 1;
			}
		}
		table[i] = t;
	}

	class Crc32 {

		constructor(crc) {
			this.crc = crc || -1;
		}

		append(data) {
			let crc = this.crc | 0;
			for (let offset = 0, length = data.length | 0; offset < length; offset++) {
				crc = (crc >>> 8) ^ table[(crc ^ data[offset]) & 0xFF];
			}
			this.crc = crc;
		}

		get() {
			return ~this.crc;
		}
	}

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

	class Crc32Stream extends TransformStream {

		constructor() {
			super({
				start() {
					this.crc32 = new Crc32();
				},
				transform(chunk) {
					this.crc32.append(chunk);
				},
				flush(controller) {
					const value = new Uint8Array(4);
					const dataView = new DataView(value.buffer);
					dataView.setUint32(0, this.crc32.get());
					controller.enqueue(value);
				}
			});
		}
	}

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

	function encodeText(value) {
		if (typeof TextEncoder == "undefined") {
			value = unescape(encodeURIComponent(value));
			const result = new Uint8Array(value.length);
			for (let i = 0; i < result.length; i++) {
				result[i] = value.charCodeAt(i);
			}
			return result;
		} else {
			return new TextEncoder().encode(value);
		}
	}

	// Derived from https://github.com/xqdoo00o/jszip/blob/master/lib/sjcl.js and https://github.com/bitwiseshiftleft/sjcl

	/*// deno-lint-ignore-file no-this-alias *

	/*
	 * SJCL is open. You can use, modify and redistribute it under a BSD
	 * license or under the GNU GPL, version 2.0.
	 */

	/** @fileOverview Javascript cryptography implementation.
	 *
	 * Crush to remove comments, shorten variable names and
	 * generally reduce transmission size.
	 *
	 * @author Emily Stark
	 * @author Mike Hamburg
	 * @author Dan Boneh
	 */

	/*jslint indent: 2, bitwise: false, nomen: false, plusplus: false, white: false, regexp: false */

	/** @fileOverview Arrays of bits, encoded as arrays of Numbers.
	 *
	 * @author Emily Stark
	 * @author Mike Hamburg
	 * @author Dan Boneh
	 */

	/**
	 * Arrays of bits, encoded as arrays of Numbers.
	 * @namespace
	 * @description
	 * <p>
	 * These objects are the currency accepted by SJCL's crypto functions.
	 * </p>
	 *
	 * <p>
	 * Most of our crypto primitives operate on arrays of 4-byte words internally,
	 * but many of them can take arguments that are not a multiple of 4 bytes.
	 * This library encodes arrays of bits (whose size need not be a multiple of 8
	 * bits) as arrays of 32-bit words.  The bits are packed, big-endian, into an
	 * array of words, 32 bits at a time.  Since the words are double-precision
	 * floating point numbers, they fit some extra data.  We use this (in a private,
	 * possibly-changing manner) to encode the number of bits actually  present
	 * in the last word of the array.
	 * </p>
	 *
	 * <p>
	 * Because bitwise ops clear this out-of-band data, these arrays can be passed
	 * to ciphers like AES which want arrays of words.
	 * </p>
	 */
	const bitArray = {
		/**
		 * Concatenate two bit arrays.
		 * @param {bitArray} a1 The first array.
		 * @param {bitArray} a2 The second array.
		 * @return {bitArray} The concatenation of a1 and a2.
		 */
		concat(a1, a2) {
			if (a1.length === 0 || a2.length === 0) {
				return a1.concat(a2);
			}

			const last = a1[a1.length - 1], shift = bitArray.getPartial(last);
			if (shift === 32) {
				return a1.concat(a2);
			} else {
				return bitArray._shiftRight(a2, shift, last | 0, a1.slice(0, a1.length - 1));
			}
		},

		/**
		 * Find the length of an array of bits.
		 * @param {bitArray} a The array.
		 * @return {Number} The length of a, in bits.
		 */
		bitLength(a) {
			const l = a.length;
			if (l === 0) {
				return 0;
			}
			const x = a[l - 1];
			return (l - 1) * 32 + bitArray.getPartial(x);
		},

		/**
		 * Truncate an array.
		 * @param {bitArray} a The array.
		 * @param {Number} len The length to truncate to, in bits.
		 * @return {bitArray} A new array, truncated to len bits.
		 */
		clamp(a, len) {
			if (a.length * 32 < len) {
				return a;
			}
			a = a.slice(0, Math.ceil(len / 32));
			const l = a.length;
			len = len & 31;
			if (l > 0 && len) {
				a[l - 1] = bitArray.partial(len, a[l - 1] & 0x80000000 >> (len - 1), 1);
			}
			return a;
		},

		/**
		 * Make a partial word for a bit array.
		 * @param {Number} len The number of bits in the word.
		 * @param {Number} x The bits.
		 * @param {Number} [_end=0] Pass 1 if x has already been shifted to the high side.
		 * @return {Number} The partial word.
		 */
		partial(len, x, _end) {
			if (len === 32) {
				return x;
			}
			return (_end ? x | 0 : x << (32 - len)) + len * 0x10000000000;
		},

		/**
		 * Get the number of bits used by a partial word.
		 * @param {Number} x The partial word.
		 * @return {Number} The number of bits used by the partial word.
		 */
		getPartial(x) {
			return Math.round(x / 0x10000000000) || 32;
		},

		/** Shift an array right.
		 * @param {bitArray} a The array to shift.
		 * @param {Number} shift The number of bits to shift.
		 * @param {Number} [carry=0] A byte to carry in
		 * @param {bitArray} [out=[]] An array to prepend to the output.
		 * @private
		 */
		_shiftRight(a, shift, carry, out) {
			if (out === undefined) {
				out = [];
			}

			for (; shift >= 32; shift -= 32) {
				out.push(carry);
				carry = 0;
			}
			if (shift === 0) {
				return out.concat(a);
			}

			for (let i = 0; i < a.length; i++) {
				out.push(carry | a[i] >>> shift);
				carry = a[i] << (32 - shift);
			}
			const last2 = a.length ? a[a.length - 1] : 0;
			const shift2 = bitArray.getPartial(last2);
			out.push(bitArray.partial(shift + shift2 & 31, (shift + shift2 > 32) ? carry : out.pop(), 1));
			return out;
		}
	};

	/** @fileOverview Bit array codec implementations.
	 *
	 * @author Emily Stark
	 * @author Mike Hamburg
	 * @author Dan Boneh
	 */

	/**
	 * Arrays of bytes
	 * @namespace
	 */
	const codec = {
		bytes: {
			/** Convert from a bitArray to an array of bytes. */
			fromBits(arr) {
				const bl = bitArray.bitLength(arr);
				const byteLength = bl / 8;
				const out = new Uint8Array(byteLength);
				let tmp;
				for (let i = 0; i < byteLength; i++) {
					if ((i & 3) === 0) {
						tmp = arr[i / 4];
					}
					out[i] = tmp >>> 24;
					tmp <<= 8;
				}
				return out;
			},
			/** Convert from an array of bytes to a bitArray. */
			toBits(bytes) {
				const out = [];
				let i;
				let tmp = 0;
				for (i = 0; i < bytes.length; i++) {
					tmp = tmp << 8 | bytes[i];
					if ((i & 3) === 3) {
						out.push(tmp);
						tmp = 0;
					}
				}
				if (i & 3) {
					out.push(bitArray.partial(8 * (i & 3), tmp));
				}
				return out;
			}
		}
	};

	const hash = {};

	/**
	 * Context for a SHA-1 operation in progress.
	 * @constructor
	 */
	hash.sha1 = function (hash) {
		if (hash) {
			this._h = hash._h.slice(0);
			this._buffer = hash._buffer.slice(0);
			this._length = hash._length;
		} else {
			this.reset();
		}
	};

	hash.sha1.prototype = {
		/**
		 * The hash's block size, in bits.
		 * @constant
		 */
		blockSize: 512,

		/**
		 * Reset the hash state.
		 * @return this
		 */
		reset() {
			const sha1 = this;
			sha1._h = this._init.slice(0);
			sha1._buffer = [];
			sha1._length = 0;
			return sha1;
		},

		/**
		 * Input several words to the hash.
		 * @param {bitArray|String} data the data to hash.
		 * @return this
		 */
		update(data) {
			const sha1 = this;
			if (typeof data === "string") {
				data = codec.utf8String.toBits(data);
			}
			const b = sha1._buffer = bitArray.concat(sha1._buffer, data);
			const ol = sha1._length;
			const nl = sha1._length = ol + bitArray.bitLength(data);
			if (nl > 9007199254740991) {
				throw new Error("Cannot hash more than 2^53 - 1 bits");
			}
			const c = new Uint32Array(b);
			let j = 0;
			for (let i = sha1.blockSize + ol - ((sha1.blockSize + ol) & (sha1.blockSize - 1)); i <= nl;
				i += sha1.blockSize) {
				sha1._block(c.subarray(16 * j, 16 * (j + 1)));
				j += 1;
			}
			b.splice(0, 16 * j);
			return sha1;
		},

		/**
		 * Complete hashing and output the hash value.
		 * @return {bitArray} The hash value, an array of 5 big-endian words. TODO
		 */
		finalize() {
			const sha1 = this;
			let b = sha1._buffer;
			const h = sha1._h;

			// Round out and push the buffer
			b = bitArray.concat(b, [bitArray.partial(1, 1)]);
			// Round out the buffer to a multiple of 16 words, less the 2 length words.
			for (let i = b.length + 2; i & 15; i++) {
				b.push(0);
			}

			// append the length
			b.push(Math.floor(sha1._length / 0x100000000));
			b.push(sha1._length | 0);

			while (b.length) {
				sha1._block(b.splice(0, 16));
			}

			sha1.reset();
			return h;
		},

		/**
		 * The SHA-1 initialization vector.
		 * @private
		 */
		_init: [0x67452301, 0xEFCDAB89, 0x98BADCFE, 0x10325476, 0xC3D2E1F0],

		/**
		 * The SHA-1 hash key.
		 * @private
		 */
		_key: [0x5A827999, 0x6ED9EBA1, 0x8F1BBCDC, 0xCA62C1D6],

		/**
		 * The SHA-1 logical functions f(0), f(1), ..., f(79).
		 * @private
		 */
		_f(t, b, c, d) {
			if (t <= 19) {
				return (b & c) | (~b & d);
			} else if (t <= 39) {
				return b ^ c ^ d;
			} else if (t <= 59) {
				return (b & c) | (b & d) | (c & d);
			} else if (t <= 79) {
				return b ^ c ^ d;
			}
		},

		/**
		 * Circular left-shift operator.
		 * @private
		 */
		_S(n, x) {
			return (x << n) | (x >>> 32 - n);
		},

		/**
		 * Perform one cycle of SHA-1.
		 * @param {Uint32Array|bitArray} words one block of words.
		 * @private
		 */
		_block(words) {
			const sha1 = this;
			const h = sha1._h;
			// When words is passed to _block, it has 16 elements. SHA1 _block
			// function extends words with new elements (at the end there are 80 elements). 
			// The problem is that if we use Uint32Array instead of Array, 
			// the length of Uint32Array cannot be changed. Thus, we replace words with a 
			// normal Array here.
			const w = Array(80); // do not use Uint32Array here as the instantiation is slower
			for (let j = 0; j < 16; j++) {
				w[j] = words[j];
			}

			let a = h[0];
			let b = h[1];
			let c = h[2];
			let d = h[3];
			let e = h[4];

			for (let t = 0; t <= 79; t++) {
				if (t >= 16) {
					w[t] = sha1._S(1, w[t - 3] ^ w[t - 8] ^ w[t - 14] ^ w[t - 16]);
				}
				const tmp = (sha1._S(5, a) + sha1._f(t, b, c, d) + e + w[t] +
					sha1._key[Math.floor(t / 20)]) | 0;
				e = d;
				d = c;
				c = sha1._S(30, b);
				b = a;
				a = tmp;
			}

			h[0] = (h[0] + a) | 0;
			h[1] = (h[1] + b) | 0;
			h[2] = (h[2] + c) | 0;
			h[3] = (h[3] + d) | 0;
			h[4] = (h[4] + e) | 0;
		}
	};

	/** @fileOverview Low-level AES implementation.
	 *
	 * This file contains a low-level implementation of AES, optimized for
	 * size and for efficiency on several browsers.  It is based on
	 * OpenSSL's aes_core.c, a public-domain implementation by Vincent
	 * Rijmen, Antoon Bosselaers and Paulo Barreto.
	 *
	 * An older version of this implementation is available in the public
	 * domain, but this one is (c) Emily Stark, Mike Hamburg, Dan Boneh,
	 * Stanford University 2008-2010 and BSD-licensed for liability
	 * reasons.
	 *
	 * @author Emily Stark
	 * @author Mike Hamburg
	 * @author Dan Boneh
	 */

	const cipher = {};

	/**
	 * Schedule out an AES key for both encryption and decryption.  This
	 * is a low-level class.  Use a cipher mode to do bulk encryption.
	 *
	 * @constructor
	 * @param {Array} key The key as an array of 4, 6 or 8 words.
	 */
	cipher.aes = class {
		constructor(key) {
			/**
			 * The expanded S-box and inverse S-box tables.  These will be computed
			 * on the client so that we don't have to send them down the wire.
			 *
			 * There are two tables, _tables[0] is for encryption and
			 * _tables[1] is for decryption.
			 *
			 * The first 4 sub-tables are the expanded S-box with MixColumns.  The
			 * last (_tables[01][4]) is the S-box itself.
			 *
			 * @private
			 */
			const aes = this;
			aes._tables = [[[], [], [], [], []], [[], [], [], [], []]];

			if (!aes._tables[0][0][0]) {
				aes._precompute();
			}

			const sbox = aes._tables[0][4];
			const decTable = aes._tables[1];
			const keyLen = key.length;

			let i, encKey, decKey, rcon = 1;

			if (keyLen !== 4 && keyLen !== 6 && keyLen !== 8) {
				throw new Error("invalid aes key size");
			}

			aes._key = [encKey = key.slice(0), decKey = []];

			// schedule encryption keys
			for (i = keyLen; i < 4 * keyLen + 28; i++) {
				let tmp = encKey[i - 1];

				// apply sbox
				if (i % keyLen === 0 || (keyLen === 8 && i % keyLen === 4)) {
					tmp = sbox[tmp >>> 24] << 24 ^ sbox[tmp >> 16 & 255] << 16 ^ sbox[tmp >> 8 & 255] << 8 ^ sbox[tmp & 255];

					// shift rows and add rcon
					if (i % keyLen === 0) {
						tmp = tmp << 8 ^ tmp >>> 24 ^ rcon << 24;
						rcon = rcon << 1 ^ (rcon >> 7) * 283;
					}
				}

				encKey[i] = encKey[i - keyLen] ^ tmp;
			}

			// schedule decryption keys
			for (let j = 0; i; j++, i--) {
				const tmp = encKey[j & 3 ? i : i - 4];
				if (i <= 4 || j < 4) {
					decKey[j] = tmp;
				} else {
					decKey[j] = decTable[0][sbox[tmp >>> 24]] ^
						decTable[1][sbox[tmp >> 16 & 255]] ^
						decTable[2][sbox[tmp >> 8 & 255]] ^
						decTable[3][sbox[tmp & 255]];
				}
			}
		}
		// public
		/* Something like this might appear here eventually
		name: "AES",
		blockSize: 4,
		keySizes: [4,6,8],
		*/

		/**
		 * Encrypt an array of 4 big-endian words.
		 * @param {Array} data The plaintext.
		 * @return {Array} The ciphertext.
		 */
		encrypt(data) {
			return this._crypt(data, 0);
		}

		/**
		 * Decrypt an array of 4 big-endian words.
		 * @param {Array} data The ciphertext.
		 * @return {Array} The plaintext.
		 */
		decrypt(data) {
			return this._crypt(data, 1);
		}

		/**
		 * Expand the S-box tables.
		 *
		 * @private
		 */
		_precompute() {
			const encTable = this._tables[0];
			const decTable = this._tables[1];
			const sbox = encTable[4];
			const sboxInv = decTable[4];
			const d = [];
			const th = [];
			let xInv, x2, x4, x8;

			// Compute double and third tables
			for (let i = 0; i < 256; i++) {
				th[(d[i] = i << 1 ^ (i >> 7) * 283) ^ i] = i;
			}

			for (let x = xInv = 0; !sbox[x]; x ^= x2 || 1, xInv = th[xInv] || 1) {
				// Compute sbox
				let s = xInv ^ xInv << 1 ^ xInv << 2 ^ xInv << 3 ^ xInv << 4;
				s = s >> 8 ^ s & 255 ^ 99;
				sbox[x] = s;
				sboxInv[s] = x;

				// Compute MixColumns
				x8 = d[x4 = d[x2 = d[x]]];
				let tDec = x8 * 0x1010101 ^ x4 * 0x10001 ^ x2 * 0x101 ^ x * 0x1010100;
				let tEnc = d[s] * 0x101 ^ s * 0x1010100;

				for (let i = 0; i < 4; i++) {
					encTable[i][x] = tEnc = tEnc << 24 ^ tEnc >>> 8;
					decTable[i][s] = tDec = tDec << 24 ^ tDec >>> 8;
				}
			}

			// Compactify.  Considerable speedup on Firefox.
			for (let i = 0; i < 5; i++) {
				encTable[i] = encTable[i].slice(0);
				decTable[i] = decTable[i].slice(0);
			}
		}

		/**
		 * Encryption and decryption core.
		 * @param {Array} input Four words to be encrypted or decrypted.
		 * @param dir The direction, 0 for encrypt and 1 for decrypt.
		 * @return {Array} The four encrypted or decrypted words.
		 * @private
		 */
		_crypt(input, dir) {
			if (input.length !== 4) {
				throw new Error("invalid aes block size");
			}

			const key = this._key[dir];

			const nInnerRounds = key.length / 4 - 2;
			const out = [0, 0, 0, 0];
			const table = this._tables[dir];

			// load up the tables
			const t0 = table[0];
			const t1 = table[1];
			const t2 = table[2];
			const t3 = table[3];
			const sbox = table[4];

			// state variables a,b,c,d are loaded with pre-whitened data
			let a = input[0] ^ key[0];
			let b = input[dir ? 3 : 1] ^ key[1];
			let c = input[2] ^ key[2];
			let d = input[dir ? 1 : 3] ^ key[3];
			let kIndex = 4;
			let a2, b2, c2;

			// Inner rounds.  Cribbed from OpenSSL.
			for (let i = 0; i < nInnerRounds; i++) {
				a2 = t0[a >>> 24] ^ t1[b >> 16 & 255] ^ t2[c >> 8 & 255] ^ t3[d & 255] ^ key[kIndex];
				b2 = t0[b >>> 24] ^ t1[c >> 16 & 255] ^ t2[d >> 8 & 255] ^ t3[a & 255] ^ key[kIndex + 1];
				c2 = t0[c >>> 24] ^ t1[d >> 16 & 255] ^ t2[a >> 8 & 255] ^ t3[b & 255] ^ key[kIndex + 2];
				d = t0[d >>> 24] ^ t1[a >> 16 & 255] ^ t2[b >> 8 & 255] ^ t3[c & 255] ^ key[kIndex + 3];
				kIndex += 4;
				a = a2; b = b2; c = c2;
			}

			// Last round.
			for (let i = 0; i < 4; i++) {
				out[dir ? 3 & -i : i] =
					sbox[a >>> 24] << 24 ^
					sbox[b >> 16 & 255] << 16 ^
					sbox[c >> 8 & 255] << 8 ^
					sbox[d & 255] ^
					key[kIndex++];
				a2 = a; a = b; b = c; c = d; d = a2;
			}

			return out;
		}
	};

	/**
	 * Random values
	 * @namespace
	 */
	const random = {
		/** 
		 * Generate random words with pure js, cryptographically not as strong & safe as native implementation.
		 * @param {TypedArray} typedArray The array to fill.
		 * @return {TypedArray} The random values.
		 */
		getRandomValues(typedArray) {
			const words = new Uint32Array(typedArray.buffer);
			const r = (m_w) => {
				let m_z = 0x3ade68b1;
				const mask = 0xffffffff;
				return function () {
					m_z = (0x9069 * (m_z & 0xFFFF) + (m_z >> 0x10)) & mask;
					m_w = (0x4650 * (m_w & 0xFFFF) + (m_w >> 0x10)) & mask;
					const result = ((((m_z << 0x10) + m_w) & mask) / 0x100000000) + .5;
					return result * (Math.random() > .5 ? 1 : -1);
				};
			};
			for (let i = 0, rcache; i < typedArray.length; i += 4) {
				const _r = r((rcache || Math.random()) * 0x100000000);
				rcache = _r() * 0x3ade67b7;
				words[i / 4] = (_r() * 0x100000000) | 0;
			}
			return typedArray;
		}
	};

	/** @fileOverview CTR mode implementation.
	 *
	 * Special thanks to Roy Nicholson for pointing out a bug in our
	 * implementation.
	 *
	 * @author Emily Stark
	 * @author Mike Hamburg
	 * @author Dan Boneh
	 */

	/** Brian Gladman's CTR Mode.
	* @constructor
	* @param {Object} _prf The aes instance to generate key.
	* @param {bitArray} _iv The iv for ctr mode, it must be 128 bits.
	*/

	const mode = {};

	/**
	 * Brian Gladman's CTR Mode.
	 * @namespace
	 */
	mode.ctrGladman = class {
		constructor(prf, iv) {
			this._prf = prf;
			this._initIv = iv;
			this._iv = iv;
		}

		reset() {
			this._iv = this._initIv;
		}

		/** Input some data to calculate.
		 * @param {bitArray} data the data to process, it must be intergral multiple of 128 bits unless it's the last.
		 */
		update(data) {
			return this.calculate(this._prf, data, this._iv);
		}

		incWord(word) {
			if (((word >> 24) & 0xff) === 0xff) { //overflow
				let b1 = (word >> 16) & 0xff;
				let b2 = (word >> 8) & 0xff;
				let b3 = word & 0xff;

				if (b1 === 0xff) { // overflow b1   
					b1 = 0;
					if (b2 === 0xff) {
						b2 = 0;
						if (b3 === 0xff) {
							b3 = 0;
						} else {
							++b3;
						}
					} else {
						++b2;
					}
				} else {
					++b1;
				}

				word = 0;
				word += (b1 << 16);
				word += (b2 << 8);
				word += b3;
			} else {
				word += (0x01 << 24);
			}
			return word;
		}

		incCounter(counter) {
			if ((counter[0] = this.incWord(counter[0])) === 0) {
				// encr_data in fileenc.c from  Dr Brian Gladman's counts only with DWORD j < 8
				counter[1] = this.incWord(counter[1]);
			}
		}

		calculate(prf, data, iv) {
			let l;
			if (!(l = data.length)) {
				return [];
			}
			const bl = bitArray.bitLength(data);
			for (let i = 0; i < l; i += 4) {
				this.incCounter(iv);
				const e = prf.encrypt(iv);
				data[i] ^= e[0];
				data[i + 1] ^= e[1];
				data[i + 2] ^= e[2];
				data[i + 3] ^= e[3];
			}
			return bitArray.clamp(data, bl);
		}
	};

	const misc = {
		importKey(password) {
			return new misc.hmacSha1(codec.bytes.toBits(password));
		},
		pbkdf2(prf, salt, count, length) {
			count = count || 10000;
			if (length < 0 || count < 0) {
				throw new Error("invalid params to pbkdf2");
			}
			const byteLength = ((length >> 5) + 1) << 2;
			let u, ui, i, j, k;
			const arrayBuffer = new ArrayBuffer(byteLength);
			const out = new DataView(arrayBuffer);
			let outLength = 0;
			const b = bitArray;
			salt = codec.bytes.toBits(salt);
			for (k = 1; outLength < (byteLength || 1); k++) {
				u = ui = prf.encrypt(b.concat(salt, [k]));
				for (i = 1; i < count; i++) {
					ui = prf.encrypt(ui);
					for (j = 0; j < ui.length; j++) {
						u[j] ^= ui[j];
					}
				}
				for (i = 0; outLength < (byteLength || 1) && i < u.length; i++) {
					out.setInt32(outLength, u[i]);
					outLength += 4;
				}
			}
			return arrayBuffer.slice(0, length / 8);
		}
	};

	/** @fileOverview HMAC implementation.
	 *
	 * @author Emily Stark
	 * @author Mike Hamburg
	 * @author Dan Boneh
	 */

	/** HMAC with the specified hash function.
	 * @constructor
	 * @param {bitArray} key the key for HMAC.
	 * @param {Object} [Hash=hash.sha1] The hash function to use.
	 */
	misc.hmacSha1 = class {

		constructor(key) {
			const hmac = this;
			const Hash = hmac._hash = hash.sha1;
			const exKey = [[], []];
			const bs = Hash.prototype.blockSize / 32;
			hmac._baseHash = [new Hash(), new Hash()];

			if (key.length > bs) {
				key = Hash.hash(key);
			}

			for (let i = 0; i < bs; i++) {
				exKey[0][i] = key[i] ^ 0x36363636;
				exKey[1][i] = key[i] ^ 0x5C5C5C5C;
			}

			hmac._baseHash[0].update(exKey[0]);
			hmac._baseHash[1].update(exKey[1]);
			hmac._resultHash = new Hash(hmac._baseHash[0]);
		}
		reset() {
			const hmac = this;
			hmac._resultHash = new hmac._hash(hmac._baseHash[0]);
			hmac._updated = false;
		}

		update(data) {
			const hmac = this;
			hmac._updated = true;
			hmac._resultHash.update(data);
		}

		digest() {
			const hmac = this;
			const w = hmac._resultHash.finalize();
			const result = new (hmac._hash)(hmac._baseHash[1]).update(w).finalize();

			hmac.reset();

			return result;
		}

		encrypt(data) {
			if (!this._updated) {
				this.update(data);
				return this.digest(data);
			} else {
				throw new Error("encrypt on already updated hmac called!");
			}
		}
	};

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

	const ERR_INVALID_PASSWORD = "Invalid pasword";
	const BLOCK_LENGTH = 16;
	const RAW_FORMAT = "raw";
	const PBKDF2_ALGORITHM = { name: "PBKDF2" };
	const HASH_ALGORITHM = { name: "HMAC" };
	const HASH_FUNCTION = "SHA-1";
	const BASE_KEY_ALGORITHM = Object.assign({ hash: HASH_ALGORITHM }, PBKDF2_ALGORITHM);
	const DERIVED_BITS_ALGORITHM = Object.assign({ iterations: 1000, hash: { name: HASH_FUNCTION } }, PBKDF2_ALGORITHM);
	const DERIVED_BITS_USAGE = ["deriveBits"];
	const SALT_LENGTH = [8, 12, 16];
	const KEY_LENGTH = [16, 24, 32];
	const SIGNATURE_LENGTH = 10;
	const COUNTER_DEFAULT_VALUE = [0, 0, 0, 0];
	const UNDEFINED_TYPE$1 = "undefined";
	const FUNCTION_TYPE = "function";
	const CRYPTO_API_SUPPORTED = typeof crypto != UNDEFINED_TYPE$1;
	const SUBTLE_API_SUPPORTED = CRYPTO_API_SUPPORTED && typeof crypto.subtle != UNDEFINED_TYPE$1;
	const GET_RANDOM_VALUES_SUPPORTED = CRYPTO_API_SUPPORTED && typeof crypto.getRandomValues == FUNCTION_TYPE;
	const IMPORT_KEY_SUPPORTED = CRYPTO_API_SUPPORTED && SUBTLE_API_SUPPORTED && typeof crypto.subtle.importKey == FUNCTION_TYPE;
	const DERIVE_BITS_SUPPORTED = CRYPTO_API_SUPPORTED && SUBTLE_API_SUPPORTED && typeof crypto.subtle.deriveBits == FUNCTION_TYPE;
	const codecBytes = codec.bytes;
	const Aes = cipher.aes;
	const CtrGladman = mode.ctrGladman;
	const HmacSha1 = misc.hmacSha1;

	class AESDecryptionStream extends TransformStream {

		constructor(password, signed, strength) {
			let stream;
			super({
				start() {
					Object.assign(this, {
						ready: new Promise(resolve => this.resolveReady = resolve),
						password,
						signed,
						strength: strength - 1,
						pending: new Uint8Array()
					});
				},
				async transform(chunk, controller) {
					const aesCrypto = this;
					if (aesCrypto.password) {
						const password = aesCrypto.password;
						aesCrypto.password = null;
						const preamble = subarray(chunk, 0, SALT_LENGTH[aesCrypto.strength] + 2);
						await createDecryptionKeys(aesCrypto, preamble, password);
						aesCrypto.ctr = new CtrGladman(new Aes(aesCrypto.keys.key), Array.from(COUNTER_DEFAULT_VALUE));
						aesCrypto.hmac = new HmacSha1(aesCrypto.keys.authentication);
						chunk = subarray(chunk, SALT_LENGTH[aesCrypto.strength] + 2);
						aesCrypto.resolveReady();
					} else {
						await aesCrypto.ready;
					}
					const output = new Uint8Array(chunk.length - SIGNATURE_LENGTH - ((chunk.length - SIGNATURE_LENGTH) % BLOCK_LENGTH));
					controller.enqueue(append(aesCrypto, chunk, output, 0, SIGNATURE_LENGTH, true));
				},
				async flush(controller) {
					const aesCrypto = this;
					await aesCrypto.ready;
					const pending = aesCrypto.pending;
					const chunkToDecrypt = subarray(pending, 0, pending.length - SIGNATURE_LENGTH);
					const originalSignature = subarray(pending, pending.length - SIGNATURE_LENGTH);
					let decryptedChunkArray = new Uint8Array();
					if (chunkToDecrypt.length) {
						const encryptedChunk = toBits(codecBytes, chunkToDecrypt);
						aesCrypto.hmac.update(encryptedChunk);
						const decryptedChunk = aesCrypto.ctr.update(encryptedChunk);
						decryptedChunkArray = fromBits(codecBytes, decryptedChunk);
					}
					stream.valid = true;
					if (aesCrypto.signed) {
						const signature = subarray(fromBits(codecBytes, aesCrypto.hmac.digest()), 0, SIGNATURE_LENGTH);
						for (let indexSignature = 0; indexSignature < SIGNATURE_LENGTH; indexSignature++) {
							if (signature[indexSignature] != originalSignature[indexSignature]) {
								stream.valid = false;
							}
						}
					}
					controller.enqueue(decryptedChunkArray);
				}
			});
			stream = this;
		}
	}

	class AESEncryptionStream extends TransformStream {

		constructor(password, strength) {
			let stream;
			super({
				start() {
					Object.assign(this, {
						ready: new Promise(resolve => this.resolveReady = resolve),
						password,
						strength: strength - 1,
						pending: new Uint8Array()
					});
				},
				async transform(chunk, controller) {
					const aesCrypto = this;
					let preamble = new Uint8Array();
					if (aesCrypto.password) {
						const password = aesCrypto.password;
						aesCrypto.password = null;
						preamble = await createEncryptionKeys(aesCrypto, password);
						aesCrypto.ctr = new CtrGladman(new Aes(aesCrypto.keys.key), Array.from(COUNTER_DEFAULT_VALUE));
						aesCrypto.hmac = new HmacSha1(aesCrypto.keys.authentication);
						aesCrypto.resolveReady();
					} else {
						await aesCrypto.ready;
					}
					const output = new Uint8Array(preamble.length + chunk.length - (chunk.length % BLOCK_LENGTH));
					output.set(preamble, 0);
					controller.enqueue(append(aesCrypto, chunk, output, preamble.length, 0));
				},
				async flush(controller) {
					const aesCrypto = this;
					await aesCrypto.ready;
					let encryptedChunkArray = new Uint8Array();
					if (aesCrypto.pending.length) {
						const encryptedChunk = aesCrypto.ctr.update(toBits(codecBytes, aesCrypto.pending));
						aesCrypto.hmac.update(encryptedChunk);
						encryptedChunkArray = fromBits(codecBytes, encryptedChunk);
					}
					stream.signature = fromBits(codecBytes, aesCrypto.hmac.digest()).slice(0, SIGNATURE_LENGTH);
					controller.enqueue(concat(encryptedChunkArray, stream.signature));
				}
			});
			stream = this;
		}
	}

	function append(aesCrypto, input, output, paddingStart, paddingEnd, verifySignature) {
		const inputLength = input.length - paddingEnd;
		if (aesCrypto.pending.length) {
			input = concat(aesCrypto.pending, input);
			output = expand(output, inputLength - (inputLength % BLOCK_LENGTH));
		}
		let offset;
		for (offset = 0; offset <= inputLength - BLOCK_LENGTH; offset += BLOCK_LENGTH) {
			const inputChunk = toBits(codecBytes, subarray(input, offset, offset + BLOCK_LENGTH));
			if (verifySignature) {
				aesCrypto.hmac.update(inputChunk);
			}
			const outputChunk = aesCrypto.ctr.update(inputChunk);
			if (!verifySignature) {
				aesCrypto.hmac.update(outputChunk);
			}
			output.set(fromBits(codecBytes, outputChunk), offset + paddingStart);
		}
		aesCrypto.pending = subarray(input, offset);
		return output;
	}

	async function createDecryptionKeys(decrypt, preambleArray, password) {
		await createKeys$1(decrypt, password, subarray(preambleArray, 0, SALT_LENGTH[decrypt.strength]));
		const passwordVerification = subarray(preambleArray, SALT_LENGTH[decrypt.strength]);
		const passwordVerificationKey = decrypt.keys.passwordVerification;
		if (passwordVerificationKey[0] != passwordVerification[0] || passwordVerificationKey[1] != passwordVerification[1]) {
			throw new Error(ERR_INVALID_PASSWORD);
		}
	}

	async function createEncryptionKeys(encrypt, password) {
		const salt = getRandomValues(new Uint8Array(SALT_LENGTH[encrypt.strength]));
		await createKeys$1(encrypt, password, salt);
		return concat(salt, encrypt.keys.passwordVerification);
	}

	async function createKeys$1(target, password, salt) {
		const encodedPassword = encodeText(password);
		const basekey = await importKey(RAW_FORMAT, encodedPassword, BASE_KEY_ALGORITHM, false, DERIVED_BITS_USAGE);
		const derivedBits = await deriveBits(Object.assign({ salt }, DERIVED_BITS_ALGORITHM), basekey, 8 * ((KEY_LENGTH[target.strength] * 2) + 2));
		const compositeKey = new Uint8Array(derivedBits);
		target.keys = {
			key: toBits(codecBytes, subarray(compositeKey, 0, KEY_LENGTH[target.strength])),
			authentication: toBits(codecBytes, subarray(compositeKey, KEY_LENGTH[target.strength], KEY_LENGTH[target.strength] * 2)),
			passwordVerification: subarray(compositeKey, KEY_LENGTH[target.strength] * 2)
		};
	}

	function getRandomValues(array) {
		if (GET_RANDOM_VALUES_SUPPORTED) {
			return crypto.getRandomValues(array);
		} else {
			return random.getRandomValues(array);
		}
	}

	function importKey(format, password, algorithm, extractable, keyUsages) {
		if (IMPORT_KEY_SUPPORTED) {
			return crypto.subtle.importKey(format, password, algorithm, extractable, keyUsages);
		} else {
			return misc.importKey(password);
		}
	}

	async function deriveBits(algorithm, baseKey, length) {
		if (DERIVE_BITS_SUPPORTED) {
			return await crypto.subtle.deriveBits(algorithm, baseKey, length);
		} else {
			return misc.pbkdf2(baseKey, algorithm.salt, DERIVED_BITS_ALGORITHM.iterations, length);
		}
	}

	function concat(leftArray, rightArray) {
		let array = leftArray;
		if (leftArray.length + rightArray.length) {
			array = new Uint8Array(leftArray.length + rightArray.length);
			array.set(leftArray, 0);
			array.set(rightArray, leftArray.length);
		}
		return array;
	}

	function expand(inputArray, length) {
		if (length && length > inputArray.length) {
			const array = inputArray;
			inputArray = new Uint8Array(length);
			inputArray.set(array, 0);
		}
		return inputArray;
	}

	function subarray(array, begin, end) {
		return array.subarray(begin, end);
	}

	function fromBits(codecBytes, chunk) {
		return codecBytes.fromBits(chunk);
	}
	function toBits(codecBytes, chunk) {
		return codecBytes.toBits(chunk);
	}

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

	const HEADER_LENGTH = 12;

	class ZipCryptoDecryptionStream extends TransformStream {

		constructor(password, passwordVerification) {
			let stream;
			super({
				start() {
					Object.assign(this, {
						password,
						passwordVerification
					});
					createKeys(this, password);
				},
				transform(chunk, controller) {
					const zipCrypto = this;
					if (zipCrypto.password) {
						const decryptedHeader = decrypt(zipCrypto, chunk.subarray(0, HEADER_LENGTH));
						zipCrypto.password = null;
						if (decryptedHeader[HEADER_LENGTH - 1] != zipCrypto.passwordVerification) {
							throw new Error(ERR_INVALID_PASSWORD);
						}
						chunk = chunk.subarray(HEADER_LENGTH);
					}
					controller.enqueue(decrypt(zipCrypto, chunk));
				},
				flush() {
					stream.valid = true;
				}
			});
			stream = this;
		}
	}

	class ZipCryptoEncryptionStream extends TransformStream {

		constructor(password, passwordVerification) {
			super({
				start() {
					Object.assign(this, {
						password,
						passwordVerification
					});
					createKeys(this, password);
				},
				transform(chunk, controller) {
					const zipCrypto = this;
					let output;
					let offset;
					if (zipCrypto.password) {
						zipCrypto.password = null;
						const header = crypto.getRandomValues(new Uint8Array(HEADER_LENGTH));
						header[HEADER_LENGTH - 1] = zipCrypto.passwordVerification;
						output = new Uint8Array(chunk.length + header.length);
						output.set(encrypt(zipCrypto, header), 0);
						offset = HEADER_LENGTH;
					} else {
						output = new Uint8Array(chunk.length);
						offset = 0;
					}
					output.set(encrypt(zipCrypto, chunk), offset);
					controller.enqueue(output);
				},
				flush() {
				}
			});
		}
	}

	function decrypt(target, input) {
		const output = new Uint8Array(input.length);
		for (let index = 0; index < input.length; index++) {
			output[index] = getByte(target) ^ input[index];
			updateKeys(target, output[index]);
		}
		return output;
	}

	function encrypt(target, input) {
		const output = new Uint8Array(input.length);
		for (let index = 0; index < input.length; index++) {
			output[index] = getByte(target) ^ input[index];
			updateKeys(target, input[index]);
		}
		return output;
	}

	function createKeys(target, password) {
		target.keys = [0x12345678, 0x23456789, 0x34567890];
		target.crcKey0 = new Crc32(target.keys[0]);
		target.crcKey2 = new Crc32(target.keys[2]);
		for (let index = 0; index < password.length; index++) {
			updateKeys(target, password.charCodeAt(index));
		}
	}

	function updateKeys(target, byte) {
		target.crcKey0.append([byte]);
		target.keys[0] = ~target.crcKey0.get();
		target.keys[1] = getInt32(target.keys[1] + getInt8(target.keys[0]));
		target.keys[1] = getInt32(Math.imul(target.keys[1], 134775813) + 1);
		target.crcKey2.append([target.keys[1] >>> 24]);
		target.keys[2] = ~target.crcKey2.get();
	}

	function getByte(target) {
		const temp = target.keys[2] | 2;
		return getInt8(Math.imul(temp, (temp ^ 1)) >>> 8);
	}

	function getInt8(number) {
		return number & 0xFF;
	}

	function getInt32(number) {
		return number & 0xFFFFFFFF;
	}

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

	/*
	 * This program is based on JZlib 1.0.2 ymnk, JCraft,Inc.
	 * JZlib is based on zlib-1.1.3, so all credit should go authors
	 * Jean-loup Gailly(jloup@gzip.org) and Mark Adler(madler@alumni.caltech.edu)
	 * and contributors of zlib.
	 */

	/* global TransformStream */

	class CodecStream extends TransformStream {

		constructor(Codec, options) {
			let codec;
			super({
				start() {
					codec = new Codec(options);
				},
				transform(chunk, controller) {
					chunk = codec.append(chunk);
					controller.enqueue(chunk);
				},
				flush(controller) {
					const chunk = codec.flush();
					if (chunk) {
						controller.enqueue(chunk);
					}
				}
			});
		}
	}

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

	const ERR_INVALID_SIGNATURE = "Invalid signature";
	const COMPRESSION_FORMAT = "deflate-raw";
	const UNDEFINED_TYPE = "undefined";
	const COMPRESSION_STREAM_API_SUPPORTED = typeof CompressionStream == UNDEFINED_TYPE;
	const DECOMPRESSION_STREAM_API_SUPPORTED = typeof DecompressionStream == UNDEFINED_TYPE;
	let INFLATE_RAW_SUPPORTED = true;
	let DEFLATE_RAW_SUPPORTED = true;

	class DeflateStream extends TransformStream {

		constructor(codecConstructor, options, { chunkSize }, ...strategies) {
			super({}, ...strategies);
			const { compressed, useCompressionStream, password, passwordVerification, encryptionStrength, zipCrypto, signed } = options;
			const stream = this;
			let crc32Stream, encryptionStream;
			let readable = filterEmptyChunks(super.readable);
			const encrypted = Boolean(password);
			if ((!encrypted || zipCrypto) && signed) {
				[readable, crc32Stream] = readable.tee();
				crc32Stream = crc32Stream.pipeThrough(new Crc32Stream());
			}
			if (compressed) {
				if ((useCompressionStream !== undefined && !useCompressionStream) || (COMPRESSION_STREAM_API_SUPPORTED && !DEFLATE_RAW_SUPPORTED)) {
					readable = pipeCodecStream(codecConstructor, readable, chunkSize);
				} else {
					try {
						readable = readable.pipeThrough(new CompressionStream(COMPRESSION_FORMAT));
					} catch (_error) {
						DEFLATE_RAW_SUPPORTED = false;
						readable = pipeCodecStream(codecConstructor, readable, chunkSize);
					}
				}
			}
			if (encrypted) {
				if (zipCrypto) {
					readable = readable.pipeThrough(new ZipCryptoEncryptionStream(password, passwordVerification));
				} else {
					encryptionStream = new AESEncryptionStream(password, encryptionStrength);
					readable = readable.pipeThrough(encryptionStream);
				}
			}
			setReadable(stream, readable, async () => {
				let signature;
				if (encrypted && !zipCrypto) {
					signature = encryptionStream.signature;
				}
				if ((!encrypted || zipCrypto) && signed) {
					signature = await crc32Stream.getReader().read();
					signature = new DataView(signature.value.buffer).getUint32(0);
				}
				stream.signature = signature;
			});
		}
	}

	class InflateStream extends TransformStream {

		constructor(codecConstructor, options, { chunkSize }, ...strategies) {
			super({}, ...strategies);
			const { zipCrypto, password, passwordVerification, signed, encryptionStrength, compressed, useCompressionStream } = options;
			const stream = this;
			let crc32Stream, decryptionStream;
			let readable = filterEmptyChunks(super.readable);
			const encrypted = Boolean(password);
			if (encrypted) {
				if (zipCrypto) {
					readable = readable.pipeThrough(new ZipCryptoDecryptionStream(password, passwordVerification));
				} else {
					decryptionStream = new AESDecryptionStream(password, signed, encryptionStrength);
					readable = readable.pipeThrough(decryptionStream);
				}
			}
			if (compressed) {
				if ((useCompressionStream !== undefined && !useCompressionStream) || (DECOMPRESSION_STREAM_API_SUPPORTED && !INFLATE_RAW_SUPPORTED)) {
					readable = pipeCodecStream(codecConstructor, readable, chunkSize);
				} else {
					try {
						readable = readable.pipeThrough(new DecompressionStream(COMPRESSION_FORMAT));
					} catch (_error) {
						INFLATE_RAW_SUPPORTED = false;
						readable = pipeCodecStream(codecConstructor, readable, chunkSize);
					}
				}
			}
			if ((!encrypted || zipCrypto) && signed) {
				[readable, crc32Stream] = readable.tee();
				crc32Stream = crc32Stream.pipeThrough(new Crc32Stream());
			}
			setReadable(stream, readable, async () => {
				if (encrypted && !zipCrypto) {
					if (!decryptionStream.valid) {
						throw new Error(ERR_INVALID_SIGNATURE);
					}
				}
				if ((!encrypted || zipCrypto) && signed) {
					const signature = await crc32Stream.getReader().read();
					const dataViewSignature = new DataView(signature.value.buffer);
					if (signature != dataViewSignature.getUint32(0, false)) {
						throw new Error(ERR_INVALID_SIGNATURE);
					}
				}
			});
		}
	}

	function pipeCodecStream(codecConstructor, readable, chunkSize) {
		return readable.pipeThrough(new CodecStream(codecConstructor, { chunkSize }));
	}

	function filterEmptyChunks(readable) {
		return readable.pipeThrough(new TransformStream({
			transform(chunk, controller) {
				if (chunk && chunk.length) {
					controller.enqueue(chunk);
				}
			}
		}));
	}

	function setReadable(stream, readable, flush) {
		stream.length = 0;
		readable = readable.pipeThrough(new TransformStream({
			transform(chunk, controller) {
				if (chunk && chunk.length) {
					stream.length += chunk.length;
					controller.enqueue(chunk);
				}
			}, flush
		}));
		Object.defineProperty(stream, "readable", {
			get() {
				return readable;
			}
		});
	}

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

	const CODEC_DEFLATE = "deflate";
	const CODEC_INFLATE = "inflate";
	const MESSAGE_EVENT_TYPE = "message";
	const MESSAGE_START = "start";
	const MESSAGE_PULL = "pull";
	const MESSAGE_DATA = "data";
	const MESSAGE_CLOSE = "close";
	const ERR_ABORT = "AbortError";

	function createCodec(codecConstructor, readable, writable, options, config) {
		const controller = new AbortController();
		const { signal } = controller;
		if (options.codecType.startsWith(CODEC_DEFLATE)) {
			return {
				run: () => run(DeflateStream),
				abort
			};
		} else if (options.codecType.startsWith(CODEC_INFLATE)) {
			return {
				run: () => run(InflateStream),
				abort
			};
		}

		async function run(StreamConstructor) {
			const stream = new StreamConstructor(codecConstructor, options, config);
			await readable.pipeThrough(stream, { signal }).pipeTo(writable, { preventClose: true });
			const { length, signature } = stream;
			return { length, signature };
		}

		function abort() {
			controller.abort();
		}
	}

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

	let classicWorkersSupported = true;

	function getWorker(workerData, stream, workerOptions, onTaskFinished) {
		const { readable, writable } = stream;
		const { options, config, streamOptions, webWorker, scripts, codecConstructor } = workerOptions;
		Object.assign(workerData, {
			busy: true,
			codecConstructor,
			readable,
			writable,
			options: Object.assign({}, options),
			scripts,
			terminate() {
				if (workerData.worker && !workerData.busy) {
					workerData.worker.terminate();
					workerData.interface = null;
				}
			},
			onTaskFinished() {
				workerData.busy = false;
				onTaskFinished(workerData);
			}
		});
		const { signal, size, onstart, onprogress, onend } = streamOptions;
		if (signal || onstart || onprogress || onend) {
			let chunkOffset = 0;
			const transformer = {};
			if (onstart) {
				transformer.start = () => callHandler(onstart, size());
			}
			if (onprogress) {
				transformer.transform = async (chunk, controller) => {
					chunkOffset += chunk.length;
					await callHandler(onprogress, chunkOffset, size());
					controller.enqueue(chunk);
				};
			}
			if (onend) {
				transformer.flush = () => callHandler(onend);
			}
			workerData.readable = readable.pipeThrough(new TransformStream(transformer, { highWaterMark: 1, size: () => config.chunkSize }), { signal });
		}
		return webWorker ? createWebWorkerInterface(workerData, config) : createWorkerInterface(workerData, config);
	}

	async function callHandler(handler, ...parameters) {
		try {
			await handler(...parameters);
		} catch (_error) {
			// ignored
		}
	}

	function createWorkerInterface(workerData, config) {
		const interfaceCodec = createCodec(workerData.codecConstructor, workerData.readable, workerData.writable, workerData.options, config);
		const { onTaskFinished } = workerData;
		const codec = {
			abort() {
				interfaceCodec.abort();
				onTaskFinished();
			},
			async run() {
				const result = await interfaceCodec.run();
				onTaskFinished();
				return result;
			}
		};
		return codec;
	}

	function createWebWorkerInterface(workerData, { baseURL, chunkSize }) {
		const workerOptions = { type: "module" };
		const { readable, writable } = workerData;
		Object.assign(workerData, {
			reader: readable.getReader(),
			writer: writable.getWriter(),
			result: new Promise((resolve, reject) => {
				workerData.resolveResult = resolve;
				workerData.rejectResult = reject;
			})
		});
		if (!workerData.interface) {
			if (!classicWorkersSupported) {
				workerData.worker = getWorker(workerOptions);
			} else {
				try {
					workerData.worker = getWorker({});
				} catch (_error) {
					classicWorkersSupported = false;
					workerData.worker = getWorker(workerOptions);
				}
			}
			workerData.worker.addEventListener(MESSAGE_EVENT_TYPE, onMessage, false);
			workerData.interface = {
				abort() {
					workerData.writer.releaseLock();
					workerData.onTaskFinished();
				},
				run() {
					const { options } = workerData;
					const scripts = workerData.scripts.slice(1);
					sendMessage({ type: MESSAGE_START, scripts, options, config: { chunkSize } });
					return workerData.result;
				}
			};
		}
		return workerData.interface;

		function getWorker(options) {
			let url, scriptUrl;
			url = workerData.scripts[0];
			if (typeof url == "function") {
				url = url();
			}
			try {
				scriptUrl = new URL(url, baseURL);
			} catch (_error) {
				scriptUrl = url;
			}
			return new Worker(scriptUrl, options);
		}

		function sendMessage(message) {
			const { worker, writer, onTaskFinished } = workerData;
			try {
				let { data } = message;
				if (data) {
					try {
						const { buffer, length } = data;
						if (length != buffer.byteLength) {
							data = new Uint8Array(data);
						}
						message.data = data.buffer;
						worker.postMessage(message, [message.data]);
					} catch (_error) {
						worker.postMessage(message);
					}
				} else {
					worker.postMessage(message);
				}
			} catch (error) {
				writer.releaseLock();
				onTaskFinished();
				throw error;
			}
		}

		async function onMessage(event) {
			const message = event.data;
			const { reader, writer, resolveResult, rejectResult, onTaskFinished } = workerData;
			const { type, data, messageId, result } = message;
			const reponseError = message.error;
			try {
				if (reponseError) {
					const { message, stack } = reponseError;
					const error = new Error(message);
					error.stack = stack;
					close(error);
				} else {
					if (type == MESSAGE_PULL) {
						const { value, done } = await reader.read();
						sendMessage({ type: MESSAGE_DATA, data: value, done, messageId });
					}
					if (type == MESSAGE_DATA) {
						await writer.ready;
						await writer.write(new Uint8Array(data));
					}
					if (type == MESSAGE_CLOSE) {
						close(null, result);
					}
				}
			} catch (error) {
				close(error);
			}

			function close(error, result) {
				if (error) {
					rejectResult(error);
				} else {
					resolveResult(result);
				}
				writer.releaseLock();
				onTaskFinished();
			}
		}
	}

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

	let pool = [];
	const pendingRequests = [];

	let indexWorker = 0;

	async function runWorker(stream, workerOptions) {
		const { options, config, streamOptions } = workerOptions;
		const streamCopy = !options.compressed && !options.signed && !options.encrypted;
		const { useWebWorkers, useCompressionStream, codecType } = options;
		const { workerScripts } = config;
		workerOptions.webWorker = !streamCopy && (useWebWorkers || (useWebWorkers === undefined && config.useWebWorkers));
		workerOptions.scripts = workerOptions.webWorker && workerScripts ? workerScripts[codecType] : [];
		options.useCompressionStream = useCompressionStream === undefined ? config.useCompressionStream : useCompressionStream;
		let codec;
		if (pool.length < config.maxWorkers) {
			const workerData = { indexWorker };
			indexWorker++;
			pool.push(workerData);
			codec = getWorker(workerData, stream, workerOptions, onTaskFinished);
		} else {
			const workerData = pool.find(workerData => !workerData.busy);
			if (workerData) {
				clearTerminateTimeout(workerData);
				codec = getWorker(workerData, stream, workerOptions, onTaskFinished);
			} else {
				codec = await new Promise(resolve => pendingRequests.push({ resolve, stream, workerOptions }));
			}
		}
		const { signal } = streamOptions;
		try {
			return await codec.run(signal);
		} catch (error) {
			if (signal && signal.aborted && (signal.reason == error || error.name == ERR_ABORT)) {
				codec.abort();
				throw new Error(ERR_ABORT);
			} else {
				throw error;
			}
		}

		function onTaskFinished(workerData) {
			if (pendingRequests.length) {
				const [{ resolve, stream, workerOptions }] = pendingRequests.splice(0, 1);
				resolve(getWorker(workerData, stream, workerOptions, onTaskFinished));
			} else if (workerData.worker) {
				const { terminateWorkerTimeout } = config;
				clearTerminateTimeout(workerData);
				if (Number.isFinite(terminateWorkerTimeout) && terminateWorkerTimeout >= 0) {
					workerData.terminateTimeout = setTimeout(() => {
						pool = pool.filter(data => data != workerData);
						workerData.terminate();
					}, terminateWorkerTimeout);
				}
			} else {
				pool = pool.filter(data => data != workerData);
			}
		}
	}

	function clearTerminateTimeout(workerData) {
		const { terminateTimeout } = workerData;
		if (terminateTimeout) {
			clearTimeout(terminateTimeout);
			workerData.terminateTimeout = null;
		}
	}

	function terminateWorkers() {
		pool.forEach(workerData => {
			clearTerminateTimeout(workerData);
			workerData.terminate();
		});
	}

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

	/* global Blob, atob, btoa, XMLHttpRequest, document, fetch, ReadableStream, WritableStream, TransformStream */

	const ERR_HTTP_STATUS = "HTTP error ";
	const ERR_HTTP_RANGE = "HTTP Range not supported";
	const ERR_NOT_SEEKABLE_READER = "Reader is not seekable";

	const CONTENT_TYPE_TEXT_PLAIN = "text/plain";
	const HTTP_HEADER_CONTENT_LENGTH = "Content-Length";
	const HTTP_HEADER_CONTENT_RANGE = "Content-Range";
	const HTTP_HEADER_ACCEPT_RANGES = "Accept-Ranges";
	const HTTP_HEADER_RANGE = "Range";
	const HTTP_METHOD_HEAD = "HEAD";
	const HTTP_METHOD_GET = "GET";
	const HTTP_RANGE_UNIT = "bytes";
	const DEFAULT_CHUNK_SIZE = 64 * 1024;

	class Stream {

		constructor() {
			this.size = 0;
		}

		init() {
			this.initialized = true;
		}
	}

	class Reader extends Stream {

		getReadable({ offset, size, chunkSize } = { offset: 0, chunkSize: DEFAULT_CHUNK_SIZE }) {
			const reader = this;
			return new ReadableStream({
				start() {
					this.chunkOffset = 0;
				},
				async pull(controller) {
					const { chunkOffset } = this;
					controller.enqueue(await reader.readUint8Array(offset + chunkOffset, Math.min(chunkSize, size() - chunkOffset)));
					if (chunkOffset + chunkSize > size()) {
						controller.close();
					} else {
						this.chunkOffset += chunkSize;
					}
				}
			});
		}
	}

	class WriterStream extends Stream {

		get writable() {
			const writer = this;
			return new WritableStream({
				write(chunk) {
					return writer.writeUint8Array(chunk);
				}
			});
		}
	}

	class Writer extends WriterStream {

		writeUint8Array(array) {
			this.size += array.length;
		}
	}

	class TextReader extends Reader {

		constructor(text) {
			super();
			this.blobReader = new BlobReader(new Blob([text], { type: CONTENT_TYPE_TEXT_PLAIN }));
		}

		init() {
			const reader = this;
			super.init();
			reader.blobReader.init();
			reader.size = reader.blobReader.size;
		}

		readUint8Array(offset, length) {
			return this.blobReader.readUint8Array(offset, length);
		}
	}

	class TextWriter extends Writer {

		constructor(encoding) {
			super();
			this.encoding = encoding;
			this.blob = new Blob([], { type: CONTENT_TYPE_TEXT_PLAIN });
		}

		writeUint8Array(array) {
			super.writeUint8Array(array);
			this.blob = new Blob([this.blob, array.buffer], { type: CONTENT_TYPE_TEXT_PLAIN });
		}

		getData() {
			const writer = this;
			return writer.blob.text();
		}
	}

	class Data64URIReader extends Reader {

		constructor(dataURI) {
			super();
			const reader = this;
			reader.dataURI = dataURI;
			let dataEnd = dataURI.length;
			while (dataURI.charAt(dataEnd - 1) == "=") {
				dataEnd--;
			}
			reader.dataStart = dataURI.indexOf(",") + 1;
			reader.size = Math.floor((dataEnd - reader.dataStart) * 0.75);
		}

		readUint8Array(offset, length) {
			const dataArray = new Uint8Array(length);
			const start = Math.floor(offset / 3) * 4;
			const dataStart = this.dataStart;
			const bytes = atob(this.dataURI.substring(start + dataStart, Math.ceil((offset + length) / 3) * 4 + dataStart));
			const delta = offset - Math.floor(start / 4) * 3;
			for (let indexByte = delta; indexByte < delta + length; indexByte++) {
				dataArray[indexByte - delta] = bytes.charCodeAt(indexByte);
			}
			return dataArray;
		}
	}

	class Data64URIWriter extends Writer {

		constructor(contentType) {
			super();
			this.data = "data:" + (contentType || "") + ";base64,";
			this.pending = [];
		}

		writeUint8Array(array) {
			super.writeUint8Array(array);
			const writer = this;
			let indexArray = 0;
			let dataString = writer.pending;
			const delta = writer.pending.length;
			writer.pending = "";
			for (indexArray = 0; indexArray < (Math.floor((delta + array.length) / 3) * 3) - delta; indexArray++) {
				dataString += String.fromCharCode(array[indexArray]);
			}
			for (; indexArray < array.length; indexArray++) {
				writer.pending += String.fromCharCode(array[indexArray]);
			}
			if (dataString.length > 2) {
				writer.data += btoa(dataString);
			} else {
				writer.pending = dataString;
			}
		}

		getData() {
			return this.data + btoa(this.pending);
		}
	}

	class BlobReader extends Reader {

		constructor(blob) {
			super();
			this.blob = blob;
			this.size = blob.size;
		}

		async readUint8Array(offset, length) {
			const reader = this;
			return new Uint8Array(await reader.blob.slice(offset, offset + length).arrayBuffer());
		}
	}

	class BlobWriter extends Writer {

		constructor(contentType) {
			super();
			const writer = this;
			writer.contentType = contentType;
			writer.arrayBuffersMaxlength = 8;
			initArrayBuffers(writer);
		}

		writeUint8Array(array) {
			super.writeUint8Array(array);
			const writer = this;
			if (writer.arrayBuffers.length == writer.arrayBuffersMaxlength) {
				flushArrayBuffers(writer);
			}
			writer.arrayBuffers.push(array.buffer);
		}

		getData() {
			const writer = this;
			if (!writer.blob) {
				if (writer.arrayBuffers.length) {
					flushArrayBuffers(writer);
				}
				writer.blob = writer.pendingBlob;
				initArrayBuffers(writer);
			}
			return writer.blob;
		}
	}

	function initArrayBuffers(blobWriter) {
		blobWriter.pendingBlob = new Blob([], { type: blobWriter.contentType });
		blobWriter.arrayBuffers = [];
	}

	function flushArrayBuffers(blobWriter) {
		blobWriter.pendingBlob = new Blob([blobWriter.pendingBlob, ...blobWriter.arrayBuffers], { type: blobWriter.contentType });
		blobWriter.arrayBuffers = [];
	}

	class ReadableStreamReader {

		constructor(readable) {
			const reader = this;
			if (!readable) {
				readable = new ReadableStream({});
			}
			reader.readable = readable.pipeThrough(new TransformStream({
				transform(chunk, controller) {
					if (chunk) {
						reader.size += chunk.length;
						controller.enqueue(chunk);
					}
				}
			}));
			reader.size = 0;
		}

		init() {
			this.initialized = true;
		}

		getReadable() {
			return this.readable;
		}
	}

	class WritableStreamWriter extends Writer {

		constructor(writable, { preventClose } = {}) {
			super();
			this.preventClose = preventClose;
			if (!writable) {
				writable = new WritableStream({});
			}
			Object.defineProperty(this, "writable", {
				get() {
					return writable;
				}
			});
		}

		async getData() {
			const writer = this;
			const { writable } = writer;
			if (!writer.preventClose) {
				await writable.getWriter().close();
			}
			return writable;
		}
	}

	class FetchReader extends Reader {

		constructor(url, options) {
			super();
			const reader = this;
			reader.url = url;
			reader.preventHeadRequest = options.preventHeadRequest;
			reader.useRangeHeader = options.useRangeHeader;
			reader.forceRangeRequests = options.forceRangeRequests;
			reader.options = options = Object.assign({}, options);
			delete options.preventHeadRequest;
			delete options.useRangeHeader;
			delete options.forceRangeRequests;
			delete options.useXHR;
		}

		async init() {
			super.init();
			await initHttpReader(this, sendFetchRequest, getFetchRequestData);
		}

		readUint8Array(index, length) {
			return readUint8ArrayHttpReader(this, index, length, sendFetchRequest, getFetchRequestData);
		}
	}

	class XHRReader extends Reader {

		constructor(url, options) {
			super();
			const reader = this;
			reader.url = url;
			reader.preventHeadRequest = options.preventHeadRequest;
			reader.useRangeHeader = options.useRangeHeader;
			reader.forceRangeRequests = options.forceRangeRequests;
			reader.options = options;
		}

		async init() {
			super.init();
			await initHttpReader(this, sendXMLHttpRequest, getXMLHttpRequestData);
		}

		readUint8Array(index, length) {
			return readUint8ArrayHttpReader(this, index, length, sendXMLHttpRequest, getXMLHttpRequestData);
		}
	}

	async function initHttpReader(httpReader, sendRequest, getRequestData) {
		if (isHttpFamily(httpReader.url) && (httpReader.useRangeHeader || httpReader.forceRangeRequests)) {
			const response = await sendRequest(HTTP_METHOD_GET, httpReader, getRangeHeaders(httpReader));
			if (!httpReader.forceRangeRequests && response.headers.get(HTTP_HEADER_ACCEPT_RANGES) != HTTP_RANGE_UNIT) {
				throw new Error(ERR_HTTP_RANGE);
			} else {
				let contentSize;
				const contentRangeHeader = response.headers.get(HTTP_HEADER_CONTENT_RANGE);
				if (contentRangeHeader) {
					const splitHeader = contentRangeHeader.trim().split(/\s*\/\s*/);
					if (splitHeader.length) {
						const headerValue = splitHeader[1];
						if (headerValue && headerValue != "*") {
							contentSize = Number(headerValue);
						}
					}
				}
				if (contentSize === undefined) {
					await getContentLength(httpReader, sendRequest, getRequestData);
				} else {
					httpReader.size = contentSize;
				}
			}
		} else {
			await getContentLength(httpReader, sendRequest, getRequestData);
		}
	}

	async function readUint8ArrayHttpReader(httpReader, index, length, sendRequest, getRequestData) {
		if (httpReader.useRangeHeader || httpReader.forceRangeRequests) {
			const response = await sendRequest(HTTP_METHOD_GET, httpReader, getRangeHeaders(httpReader, index, length));
			if (response.status != 206) {
				throw new Error(ERR_HTTP_RANGE);
			}
			return new Uint8Array(await response.arrayBuffer());
		} else {
			if (!httpReader.data) {
				await getRequestData(httpReader, httpReader.options);
			}
			return new Uint8Array(httpReader.data.subarray(index, index + length));
		}
	}

	function getRangeHeaders(httpReader, index = 0, length = 1) {
		return Object.assign({}, getHeaders(httpReader), { [HTTP_HEADER_RANGE]: HTTP_RANGE_UNIT + "=" + index + "-" + (index + length - 1) });
	}

	function getHeaders(httpReader) {
		const headers = httpReader.options.headers;
		if (headers) {
			if (Symbol.iterator in headers) {
				return Object.fromEntries(headers);
			} else {
				return headers;
			}
		}
	}

	async function getFetchRequestData(httpReader) {
		await getRequestData(httpReader, sendFetchRequest);
	}

	async function getXMLHttpRequestData(httpReader) {
		await getRequestData(httpReader, sendXMLHttpRequest);
	}

	async function getRequestData(httpReader, sendRequest) {
		const response = await sendRequest(HTTP_METHOD_GET, httpReader, getHeaders(httpReader));
		httpReader.data = new Uint8Array(await response.arrayBuffer());
		if (!httpReader.size) {
			httpReader.size = httpReader.data.length;
		}
	}

	async function getContentLength(httpReader, sendRequest, getRequestData) {
		if (httpReader.preventHeadRequest) {
			await getRequestData(httpReader, httpReader.options);
		} else {
			const response = await sendRequest(HTTP_METHOD_HEAD, httpReader, getHeaders(httpReader));
			const contentLength = response.headers.get(HTTP_HEADER_CONTENT_LENGTH);
			if (contentLength) {
				httpReader.size = Number(contentLength);
			} else {
				await getRequestData(httpReader, httpReader.options);
			}
		}
	}

	async function sendFetchRequest(method, { options, url }, headers) {
		const response = await fetch(url, Object.assign({}, options, { method, headers }));
		if (response.status < 400) {
			return response;
		} else {
			throw new Error(ERR_HTTP_STATUS + (response.statusText || response.status));
		}
	}

	function sendXMLHttpRequest(method, { url }, headers) {
		return new Promise((resolve, reject) => {
			const request = new XMLHttpRequest();
			request.addEventListener("load", () => {
				if (request.status < 400) {
					const headers = [];
					request.getAllResponseHeaders().trim().split(/[\r\n]+/).forEach(header => {
						const splitHeader = header.trim().split(/\s*:\s*/);
						splitHeader[0] = splitHeader[0].trim().replace(/^[a-z]|-[a-z]/g, value => value.toUpperCase());
						headers.push(splitHeader);
					});
					resolve({
						status: request.status,
						arrayBuffer: () => request.response,
						headers: new Map(headers)
					});
				} else {
					reject(new Error(ERR_HTTP_STATUS + (request.statusText || request.status)));
				}
			}, false);
			request.addEventListener("error", event => reject(event.detail.error), false);
			request.open(method, url);
			if (headers) {
				for (const entry of Object.entries(headers)) {
					request.setRequestHeader(entry[0], entry[1]);
				}
			}
			request.responseType = "arraybuffer";
			request.send();
		});
	}

	class HttpReader extends Reader {

		constructor(url, options = {}) {
			super();
			const reader = this;
			reader.url = url;
			reader.reader = options.useXHR ? new XHRReader(url, options) : new FetchReader(url, options);
		}

		set size(value) {
			// ignored
		}

		get size() {
			return this.reader.size;
		}

		async init() {
			super.init();
			await this.reader.init();
		}

		readUint8Array(index, length) {
			return this.reader.readUint8Array(index, length);
		}
	}

	class HttpRangeReader extends HttpReader {

		constructor(url, options = {}) {
			options.useRangeHeader = true;
			super(url, options);
		}
	}


	class Uint8ArrayReader extends Reader {

		constructor(array) {
			super();
			this.array = array;
			this.size = array.length;
		}

		readUint8Array(index, length) {
			return this.array.slice(index, index + length);
		}
	}

	class Uint8ArrayWriter extends Writer {

		constructor() {
			super();
			this.array = new Uint8Array();
		}

		writeUint8Array(array) {
			super.writeUint8Array(array);
			const writer = this;
			const previousArray = writer.array;
			writer.array = new Uint8Array(previousArray.length + array.length);
			writer.array.set(previousArray);
			writer.array.set(array, previousArray.length);
		}

		getData() {
			return this.array;
		}
	}

	function isHttpFamily(url) {
		if (typeof document != "undefined") {
			const anchor = document.createElement("a");
			anchor.href = url;
			return anchor.protocol == "http:" || anchor.protocol == "https:";
		} else {
			return /^https?:\/\//i.test(url);
		}
	}

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

	const MAX_32_BITS = 0xffffffff;
	const MAX_16_BITS = 0xffff;
	const COMPRESSION_METHOD_DEFLATE = 0x08;
	const COMPRESSION_METHOD_STORE = 0x00;
	const COMPRESSION_METHOD_AES = 0x63;

	const LOCAL_FILE_HEADER_SIGNATURE = 0x04034b50;
	const DATA_DESCRIPTOR_RECORD_SIGNATURE = 0x08074b50;
	const CENTRAL_FILE_HEADER_SIGNATURE = 0x02014b50;
	const END_OF_CENTRAL_DIR_SIGNATURE = 0x06054b50;
	const ZIP64_END_OF_CENTRAL_DIR_SIGNATURE = 0x06064b50;
	const ZIP64_END_OF_CENTRAL_DIR_LOCATOR_SIGNATURE = 0x07064b50;
	const END_OF_CENTRAL_DIR_LENGTH = 22;
	const ZIP64_END_OF_CENTRAL_DIR_LOCATOR_LENGTH = 20;
	const ZIP64_END_OF_CENTRAL_DIR_LENGTH = 56;
	const ZIP64_END_OF_CENTRAL_DIR_TOTAL_LENGTH = END_OF_CENTRAL_DIR_LENGTH + ZIP64_END_OF_CENTRAL_DIR_LOCATOR_LENGTH + ZIP64_END_OF_CENTRAL_DIR_LENGTH;

	const ZIP64_TOTAL_NUMBER_OF_DISKS = 1;

	const EXTRAFIELD_TYPE_ZIP64 = 0x0001;
	const EXTRAFIELD_TYPE_AES = 0x9901;
	const EXTRAFIELD_TYPE_NTFS = 0x000a;
	const EXTRAFIELD_TYPE_NTFS_TAG1 = 0x0001;
	const EXTRAFIELD_TYPE_EXTENDED_TIMESTAMP = 0x5455;
	const EXTRAFIELD_TYPE_UNICODE_PATH = 0x7075;
	const EXTRAFIELD_TYPE_UNICODE_COMMENT = 0x6375;

	const BITFLAG_ENCRYPTED = 0x01;
	const BITFLAG_LEVEL = 0x06;
	const BITFLAG_DATA_DESCRIPTOR = 0x0008;
	const BITFLAG_LANG_ENCODING_FLAG = 0x0800;
	const FILE_ATTR_MSDOS_DIR_MASK = 0x10;

	const VERSION_DEFLATE = 0x14;
	const VERSION_ZIP64 = 0x2D;
	const VERSION_AES = 0x33;

	const DIRECTORY_SIGNATURE = "/";

	const MAX_DATE = new Date(2107, 11, 31);
	const MIN_DATE = new Date(1980, 0, 1);

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

	const CP437 = "\0☺☻♥♦♣♠•◘○◙♂♀♪♫☼►◄↕‼¶§▬↨↑↓→←∟↔▲▼ !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~⌂ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜ¢£¥₧ƒáíóúñÑªº¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ ".split("");

	var decodeCP437 = stringValue => {
		let result = "";
		for (let indexCharacter = 0; indexCharacter < stringValue.length; indexCharacter++) {
			result += CP437[stringValue[indexCharacter]];
		}
		return result;
	};

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

	function decodeText(value, encoding) {
		if (encoding && encoding.trim().toLowerCase() == "cp437") {
			return decodeCP437(value);
		} else {
			return new TextDecoder(encoding).decode(value);
		}
	}

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

	const PROPERTY_NAMES = [
		"filename", "rawFilename", "directory", "encrypted", "compressedSize", "uncompressedSize",
		"lastModDate", "rawLastModDate", "comment", "rawComment", "signature", "extraField",
		"rawExtraField", "bitFlag", "extraFieldZip64", "extraFieldUnicodePath", "extraFieldUnicodeComment",
		"extraFieldAES", "filenameUTF8", "commentUTF8", "offset", "zip64", "compressionMethod",
		"extraFieldNTFS", "lastAccessDate", "creationDate", "extraFieldExtendedTimestamp",
		"version", "versionMadeBy", "msDosCompatible", "internalFileAttribute", "externalFileAttribute"];

	class Entry {

		constructor(data) {
			PROPERTY_NAMES.forEach(name => this[name] = data[name]);
		}

	}

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

	const ERR_BAD_FORMAT = "File format is not recognized";
	const ERR_EOCDR_NOT_FOUND = "End of central directory not found";
	const ERR_EOCDR_ZIP64_NOT_FOUND = "End of Zip64 central directory not found";
	const ERR_EOCDR_LOCATOR_ZIP64_NOT_FOUND = "End of Zip64 central directory locator not found";
	const ERR_CENTRAL_DIRECTORY_NOT_FOUND = "Central directory header not found";
	const ERR_LOCAL_FILE_HEADER_NOT_FOUND = "Local file header not found";
	const ERR_EXTRAFIELD_ZIP64_NOT_FOUND = "Zip64 extra field not found";
	const ERR_ENCRYPTED = "File contains encrypted entry";
	const ERR_UNSUPPORTED_ENCRYPTION = "Encryption method not supported";
	const ERR_UNSUPPORTED_COMPRESSION = "Compression method not supported";
	const CHARSET_UTF8 = "utf-8";
	const CHARSET_CP437 = "cp437";
	const ZIP64_PROPERTIES = ["uncompressedSize", "compressedSize", "offset"];

	class ZipReader {

		constructor(reader, options = {}) {
			Object.assign(this, {
				reader,
				options,
				config: getConfiguration()
			});
		}

		async* getEntriesGenerator(options = {}) {
			const zipReader = this;
			const { reader, config } = zipReader;
			if (!reader.initialized) {
				await reader.init();
			}
			if (reader.size < END_OF_CENTRAL_DIR_LENGTH) {
				throw new Error(ERR_BAD_FORMAT);
			}
			const endOfDirectoryInfo = await seekSignature(reader, END_OF_CENTRAL_DIR_SIGNATURE, reader.size, END_OF_CENTRAL_DIR_LENGTH, MAX_16_BITS * 16);
			if (!endOfDirectoryInfo) {
				throw new Error(ERR_EOCDR_NOT_FOUND);
			}
			const endOfDirectoryView = getDataView$1(endOfDirectoryInfo);
			let directoryDataLength = getUint32(endOfDirectoryView, 12);
			let directoryDataOffset = getUint32(endOfDirectoryView, 16);
			let filesLength = getUint16(endOfDirectoryView, 8);
			let prependedDataLength = 0;
			if (directoryDataOffset == MAX_32_BITS || directoryDataLength == MAX_32_BITS || filesLength == MAX_16_BITS) {
				const endOfDirectoryLocatorArray = await readUint8Array(reader, endOfDirectoryInfo.offset - ZIP64_END_OF_CENTRAL_DIR_LOCATOR_LENGTH, ZIP64_END_OF_CENTRAL_DIR_LOCATOR_LENGTH);
				const endOfDirectoryLocatorView = getDataView$1(endOfDirectoryLocatorArray);
				if (getUint32(endOfDirectoryLocatorView, 0) != ZIP64_END_OF_CENTRAL_DIR_LOCATOR_SIGNATURE) {
					throw new Error(ERR_EOCDR_ZIP64_NOT_FOUND);
				}
				directoryDataOffset = getBigUint64(endOfDirectoryLocatorView, 8);
				let endOfDirectoryArray = await readUint8Array(reader, directoryDataOffset, ZIP64_END_OF_CENTRAL_DIR_LENGTH);
				let endOfDirectoryView = getDataView$1(endOfDirectoryArray);
				const expectedDirectoryDataOffset = endOfDirectoryInfo.offset - ZIP64_END_OF_CENTRAL_DIR_LOCATOR_LENGTH - ZIP64_END_OF_CENTRAL_DIR_LENGTH;
				if (getUint32(endOfDirectoryView, 0) != ZIP64_END_OF_CENTRAL_DIR_SIGNATURE && directoryDataOffset != expectedDirectoryDataOffset) {
					const originalDirectoryDataOffset = directoryDataOffset;
					directoryDataOffset = expectedDirectoryDataOffset;
					prependedDataLength = directoryDataOffset - originalDirectoryDataOffset;
					endOfDirectoryArray = await readUint8Array(reader, directoryDataOffset, ZIP64_END_OF_CENTRAL_DIR_LENGTH);
					endOfDirectoryView = getDataView$1(endOfDirectoryArray);
				}
				if (getUint32(endOfDirectoryView, 0) != ZIP64_END_OF_CENTRAL_DIR_SIGNATURE) {
					throw new Error(ERR_EOCDR_LOCATOR_ZIP64_NOT_FOUND);
				}
				filesLength = getBigUint64(endOfDirectoryView, 32);
				directoryDataLength = getBigUint64(endOfDirectoryView, 40);
				directoryDataOffset -= directoryDataLength;
			}
			if (directoryDataOffset < 0 || directoryDataOffset >= reader.size) {
				throw new Error(ERR_BAD_FORMAT);
			}
			let offset = 0;
			let directoryArray = await readUint8Array(reader, directoryDataOffset, directoryDataLength);
			let directoryView = getDataView$1(directoryArray);
			if (directoryDataLength) {
				const expectedDirectoryDataOffset = endOfDirectoryInfo.offset - directoryDataLength;
				if (getUint32(directoryView, offset) != CENTRAL_FILE_HEADER_SIGNATURE && directoryDataOffset != expectedDirectoryDataOffset) {
					const originalDirectoryDataOffset = directoryDataOffset;
					directoryDataOffset = expectedDirectoryDataOffset;
					prependedDataLength = directoryDataOffset - originalDirectoryDataOffset;
					directoryArray = await readUint8Array(reader, directoryDataOffset, directoryDataLength);
					directoryView = getDataView$1(directoryArray);
				}
			}
			if (directoryDataOffset < 0 || directoryDataOffset >= reader.size) {
				throw new Error(ERR_BAD_FORMAT);
			}
			for (let indexFile = 0; indexFile < filesLength; indexFile++) {
				const fileEntry = new ZipEntry$1(reader, config, zipReader.options);
				if (getUint32(directoryView, offset) != CENTRAL_FILE_HEADER_SIGNATURE) {
					throw new Error(ERR_CENTRAL_DIRECTORY_NOT_FOUND);
				}
				readCommonHeader(fileEntry, directoryView, offset + 6);
				const languageEncodingFlag = Boolean(fileEntry.bitFlag.languageEncodingFlag);
				const filenameOffset = offset + 46;
				const extraFieldOffset = filenameOffset + fileEntry.filenameLength;
				const commentOffset = extraFieldOffset + fileEntry.extraFieldLength;
				const versionMadeBy = getUint16(directoryView, offset + 4);
				const msDosCompatible = (versionMadeBy & 0) == 0;
				Object.assign(fileEntry, {
					versionMadeBy,
					msDosCompatible,
					compressedSize: 0,
					uncompressedSize: 0,
					commentLength: getUint16(directoryView, offset + 32),
					directory: msDosCompatible && ((getUint8(directoryView, offset + 38) & FILE_ATTR_MSDOS_DIR_MASK) == FILE_ATTR_MSDOS_DIR_MASK),
					offset: getUint32(directoryView, offset + 42) + prependedDataLength,
					internalFileAttribute: getUint32(directoryView, offset + 34),
					externalFileAttribute: getUint32(directoryView, offset + 38),
					rawFilename: directoryArray.subarray(filenameOffset, extraFieldOffset),
					filenameUTF8: languageEncodingFlag,
					commentUTF8: languageEncodingFlag,
					rawExtraField: directoryArray.subarray(extraFieldOffset, commentOffset)
				});
				const endOffset = commentOffset + fileEntry.commentLength;
				fileEntry.rawComment = directoryArray.subarray(commentOffset, endOffset);
				const filenameEncoding = getOptionValue$1(zipReader, options, "filenameEncoding");
				const commentEncoding = getOptionValue$1(zipReader, options, "commentEncoding");
				const [filename, comment] = await Promise.all([
					decodeText(fileEntry.rawFilename, fileEntry.filenameUTF8 ? CHARSET_UTF8 : filenameEncoding || CHARSET_CP437),
					decodeText(fileEntry.rawComment, fileEntry.commentUTF8 ? CHARSET_UTF8 : commentEncoding || CHARSET_CP437)
				]);
				fileEntry.filename = filename;
				fileEntry.comment = comment;
				if (!fileEntry.directory && fileEntry.filename.endsWith(DIRECTORY_SIGNATURE)) {
					fileEntry.directory = true;
				}
				await readCommonFooter(fileEntry, fileEntry, directoryView, offset + 6);
				const entry = new Entry(fileEntry);
				entry.getData = (writer, options) => fileEntry.getData(writer, entry, options);
				offset = endOffset;
				if (options.onprogress) {
					try {
						await options.onprogress(indexFile + 1, filesLength, new Entry(fileEntry));
					} catch (_error) {
						// ignored
					}
				}
				yield entry;
			}
			return true;
		}

		async getEntries(options = {}) {
			const entries = [];
			const iterator = this.getEntriesGenerator(options);
			let result = iterator.next();
			while (!(await result).done) {
				entries.push((await result).value);
				result = iterator.next();
			}
			return entries;
		}

		async close() {
		}
	}

	class ZipEntry$1 {

		constructor(reader, config, options) {
			Object.assign(this, {
				reader,
				config,
				options
			});
		}

		async getData(writer, fileEntry, options = {}) {
			const zipEntry = this;
			const {
				reader,
				offset,
				extraFieldAES,
				compressionMethod,
				config,
				bitFlag,
				signature,
				rawLastModDate,
				compressedSize
			} = zipEntry;
			const localDirectory = zipEntry.localDirectory = {};
			if (!reader.initialized) {
				await reader.init();
			}
			let dataArray = await readUint8Array(reader, offset, 30);
			const dataView = getDataView$1(dataArray);
			let password = getOptionValue$1(zipEntry, options, "password");
			password = password && password.length && password;
			if (extraFieldAES) {
				if (extraFieldAES.originalCompressionMethod != COMPRESSION_METHOD_AES) {
					throw new Error(ERR_UNSUPPORTED_COMPRESSION);
				}
			}
			if (compressionMethod != COMPRESSION_METHOD_STORE && compressionMethod != COMPRESSION_METHOD_DEFLATE) {
				throw new Error(ERR_UNSUPPORTED_COMPRESSION);
			}
			if (getUint32(dataView, 0) != LOCAL_FILE_HEADER_SIGNATURE) {
				throw new Error(ERR_LOCAL_FILE_HEADER_NOT_FOUND);
			}
			readCommonHeader(localDirectory, dataView, 4);
			dataArray = await readUint8Array(reader, offset, 30 + localDirectory.filenameLength + localDirectory.extraFieldLength);
			localDirectory.rawExtraField = dataArray.subarray(30 + localDirectory.filenameLength);
			await readCommonFooter(zipEntry, localDirectory, dataView, 4);
			fileEntry.lastAccessDate = localDirectory.lastAccessDate;
			fileEntry.creationDate = localDirectory.creationDate;
			const encrypted = zipEntry.encrypted && localDirectory.encrypted;
			const zipCrypto = encrypted && !extraFieldAES;
			if (encrypted) {
				if (!zipCrypto && extraFieldAES.strength === undefined) {
					throw new Error(ERR_UNSUPPORTED_ENCRYPTION);
				} else if (!password) {
					throw new Error(ERR_ENCRYPTED);
				}
			}
			const dataOffset = offset + 30 + localDirectory.filenameLength + localDirectory.extraFieldLength;
			const size = () => compressedSize;
			const readable = reader.getReadable({ offset: dataOffset, size, chunkSize: getChunkSize(config) });
			const { writable } = writer;
			const signal = getOptionValue$1(zipEntry, options, "signal");
			if (!writer.initialized) {
				await writer.init();
			}
			const { onstart, onprogress, onend } = options;
			const workerOptions = {
				options: {
					codecType: CODEC_INFLATE,
					password,
					zipCrypto,
					encryptionStrength: extraFieldAES && extraFieldAES.strength,
					signed: getOptionValue$1(zipEntry, options, "checkSignature"),
					passwordVerification: zipCrypto && (bitFlag.dataDescriptor ? ((rawLastModDate >>> 8) & 0xFF) : ((signature >>> 24) & 0xFF)),
					signature,
					compressed: compressionMethod != 0,
					encrypted,
					useWebWorkers: getOptionValue$1(zipEntry, options, "useWebWorkers"),
					useCompressionStream: getOptionValue$1(zipEntry, options, "useCompressionStream")
				},
				config,
				streamOptions: { signal, size, onstart, onprogress, onend },
				codecConstructor: config.Inflate
			};
			await runWorker({ readable, writable }, workerOptions);
			return writer.getData();
		}
	}

	function readCommonHeader(directory, dataView, offset) {
		const rawBitFlag = directory.rawBitFlag = getUint16(dataView, offset + 2);
		const encrypted = (rawBitFlag & BITFLAG_ENCRYPTED) == BITFLAG_ENCRYPTED;
		const rawLastModDate = getUint32(dataView, offset + 6);
		Object.assign(directory, {
			encrypted,
			version: getUint16(dataView, offset),
			bitFlag: {
				level: (rawBitFlag & BITFLAG_LEVEL) >> 1,
				dataDescriptor: (rawBitFlag & BITFLAG_DATA_DESCRIPTOR) == BITFLAG_DATA_DESCRIPTOR,
				languageEncodingFlag: (rawBitFlag & BITFLAG_LANG_ENCODING_FLAG) == BITFLAG_LANG_ENCODING_FLAG
			},
			rawLastModDate,
			lastModDate: getDate(rawLastModDate),
			filenameLength: getUint16(dataView, offset + 22),
			extraFieldLength: getUint16(dataView, offset + 24)
		});
	}

	async function readCommonFooter(fileEntry, directory, dataView, offset) {
		const { rawExtraField } = directory;
		const extraField = directory.extraField = new Map();
		const rawExtraFieldView = getDataView$1(new Uint8Array(rawExtraField));
		let offsetExtraField = 0;
		try {
			while (offsetExtraField < rawExtraField.length) {
				const type = getUint16(rawExtraFieldView, offsetExtraField);
				const size = getUint16(rawExtraFieldView, offsetExtraField + 2);
				extraField.set(type, {
					type,
					data: rawExtraField.slice(offsetExtraField + 4, offsetExtraField + 4 + size)
				});
				offsetExtraField += 4 + size;
			}
		} catch (_error) {
			// ignored
		}
		const compressionMethod = getUint16(dataView, offset + 4);
		directory.signature = getUint32(dataView, offset + 10);
		directory.uncompressedSize = getUint32(dataView, offset + 18);
		directory.compressedSize = getUint32(dataView, offset + 14);
		const extraFieldZip64 = extraField.get(EXTRAFIELD_TYPE_ZIP64);
		if (extraFieldZip64) {
			readExtraFieldZip64(extraFieldZip64, directory);
			directory.extraFieldZip64 = extraFieldZip64;
		}
		const extraFieldUnicodePath = extraField.get(EXTRAFIELD_TYPE_UNICODE_PATH);
		if (extraFieldUnicodePath) {
			await readExtraFieldUnicode(extraFieldUnicodePath, "filename", "rawFilename", directory, fileEntry);
			directory.extraFieldUnicodePath = extraFieldUnicodePath;
		}
		const extraFieldUnicodeComment = extraField.get(EXTRAFIELD_TYPE_UNICODE_COMMENT);
		if (extraFieldUnicodeComment) {
			await readExtraFieldUnicode(extraFieldUnicodeComment, "comment", "rawComment", directory, fileEntry);
			directory.extraFieldUnicodeComment = extraFieldUnicodeComment;
		}
		const extraFieldAES = extraField.get(EXTRAFIELD_TYPE_AES);
		if (extraFieldAES) {
			readExtraFieldAES(extraFieldAES, directory, compressionMethod);
			directory.extraFieldAES = extraFieldAES;
		} else {
			directory.compressionMethod = compressionMethod;
		}
		const extraFieldNTFS = extraField.get(EXTRAFIELD_TYPE_NTFS);
		if (extraFieldNTFS) {
			readExtraFieldNTFS(extraFieldNTFS, directory);
			directory.extraFieldNTFS = extraFieldNTFS;
		}
		const extraFieldExtendedTimestamp = extraField.get(EXTRAFIELD_TYPE_EXTENDED_TIMESTAMP);
		if (extraFieldExtendedTimestamp) {
			readExtraFieldExtendedTimestamp(extraFieldExtendedTimestamp, directory);
			directory.extraFieldExtendedTimestamp = extraFieldExtendedTimestamp;
		}
	}

	function readExtraFieldZip64(extraFieldZip64, directory) {
		directory.zip64 = true;
		const extraFieldView = getDataView$1(extraFieldZip64.data);
		extraFieldZip64.values = [];
		for (let indexValue = 0; indexValue < Math.floor(extraFieldZip64.data.length / 8); indexValue++) {
			extraFieldZip64.values.push(getBigUint64(extraFieldView, 0 + indexValue * 8));
		}
		const missingProperties = ZIP64_PROPERTIES.filter(propertyName => directory[propertyName] == MAX_32_BITS);
		for (let indexMissingProperty = 0; indexMissingProperty < missingProperties.length; indexMissingProperty++) {
			extraFieldZip64[missingProperties[indexMissingProperty]] = extraFieldZip64.values[indexMissingProperty];
		}
		ZIP64_PROPERTIES.forEach(propertyName => {
			if (directory[propertyName] == MAX_32_BITS) {
				if (extraFieldZip64[propertyName] !== undefined) {
					directory[propertyName] = extraFieldZip64[propertyName];
				} else {
					throw new Error(ERR_EXTRAFIELD_ZIP64_NOT_FOUND);
				}
			}
		});
	}

	async function readExtraFieldUnicode(extraFieldUnicode, propertyName, rawPropertyName, directory, fileEntry) {
		const extraFieldView = getDataView$1(extraFieldUnicode.data);
		extraFieldUnicode.version = getUint8(extraFieldView, 0);
		extraFieldUnicode.signature = getUint32(extraFieldView, 1);
		const crc32 = new Crc32();
		crc32.append(fileEntry[rawPropertyName]);
		const dataViewSignature = getDataView$1(new Uint8Array(4));
		dataViewSignature.setUint32(0, crc32.get(), true);
		extraFieldUnicode[propertyName] = await decodeText(extraFieldUnicode.data.subarray(5));
		extraFieldUnicode.valid = !fileEntry.bitFlag.languageEncodingFlag && extraFieldUnicode.signature == getUint32(dataViewSignature, 0);
		if (extraFieldUnicode.valid) {
			directory[propertyName] = extraFieldUnicode[propertyName];
			directory[propertyName + "UTF8"] = true;
		}
	}

	function readExtraFieldAES(extraFieldAES, directory, compressionMethod) {
		const extraFieldView = getDataView$1(extraFieldAES.data);
		extraFieldAES.vendorVersion = getUint8(extraFieldView, 0);
		extraFieldAES.vendorId = getUint8(extraFieldView, 2);
		const strength = getUint8(extraFieldView, 4);
		extraFieldAES.strength = strength;
		extraFieldAES.originalCompressionMethod = compressionMethod;
		directory.compressionMethod = extraFieldAES.compressionMethod = getUint16(extraFieldView, 5);
	}

	function readExtraFieldNTFS(extraFieldNTFS, directory) {
		const extraFieldView = getDataView$1(extraFieldNTFS.data);
		let offsetExtraField = 4;
		let tag1Data;
		try {
			while (offsetExtraField < extraFieldNTFS.data.length && !tag1Data) {
				const tagValue = getUint16(extraFieldView, offsetExtraField);
				const attributeSize = getUint16(extraFieldView, offsetExtraField + 2);
				if (tagValue == EXTRAFIELD_TYPE_NTFS_TAG1) {
					tag1Data = extraFieldNTFS.data.slice(offsetExtraField + 4, offsetExtraField + 4 + attributeSize);
				}
				offsetExtraField += 4 + attributeSize;
			}
		} catch (_error) {
			// ignored
		}
		try {
			if (tag1Data && tag1Data.length == 24) {
				const tag1View = getDataView$1(tag1Data);
				const rawLastModDate = tag1View.getBigUint64(0, true);
				const rawLastAccessDate = tag1View.getBigUint64(8, true);
				const rawCreationDate = tag1View.getBigUint64(16, true);
				Object.assign(extraFieldNTFS, {
					rawLastModDate,
					rawLastAccessDate,
					rawCreationDate
				});
				const lastModDate = getDateNTFS(rawLastModDate);
				const lastAccessDate = getDateNTFS(rawLastAccessDate);
				const creationDate = getDateNTFS(rawCreationDate);
				const extraFieldData = { lastModDate, lastAccessDate, creationDate };
				Object.assign(extraFieldNTFS, extraFieldData);
				Object.assign(directory, extraFieldData);
			}
		} catch (_error) {
			// ignored
		}
	}

	function readExtraFieldExtendedTimestamp(extraFieldExtendedTimestamp, directory) {
		const extraFieldView = getDataView$1(extraFieldExtendedTimestamp.data);
		const flags = getUint8(extraFieldView, 0);
		const timeProperties = [];
		const timeRawProperties = [];
		if ((flags & 0x1) == 0x1) {
			timeProperties.push("lastModDate");
			timeRawProperties.push("rawLastModDate");
		}
		if ((flags & 0x2) == 0x2) {
			timeProperties.push("lastAccessDate");
			timeRawProperties.push("rawLastAccessDate");
		}
		if ((flags & 0x4) == 0x4) {
			timeProperties.push("creationDate");
			timeRawProperties.push("rawCreationDate");
		}
		let offset = 1;
		timeProperties.forEach((propertyName, indexProperty) => {
			if (extraFieldExtendedTimestamp.data.length >= offset + 4) {
				const time = getUint32(extraFieldView, offset);
				directory[propertyName] = extraFieldExtendedTimestamp[propertyName] = new Date(time * 1000);
				const rawPropertyName = timeRawProperties[indexProperty];
				extraFieldExtendedTimestamp[rawPropertyName] = time;
			}
			offset += 4;
		});
	}

	async function seekSignature(reader, signature, startOffset, minimumBytes, maximumLength) {
		const signatureArray = new Uint8Array(4);
		const signatureView = getDataView$1(signatureArray);
		setUint32$1(signatureView, 0, signature);
		const maximumBytes = minimumBytes + maximumLength;
		return (await seek(minimumBytes)) || await seek(Math.min(maximumBytes, startOffset));

		async function seek(length) {
			const offset = startOffset - length;
			const bytes = await readUint8Array(reader, offset, length);
			for (let indexByte = bytes.length - minimumBytes; indexByte >= 0; indexByte--) {
				if (bytes[indexByte] == signatureArray[0] && bytes[indexByte + 1] == signatureArray[1] &&
					bytes[indexByte + 2] == signatureArray[2] && bytes[indexByte + 3] == signatureArray[3]) {
					return {
						offset: offset + indexByte,
						buffer: bytes.slice(indexByte, indexByte + minimumBytes).buffer
					};
				}
			}
		}
	}

	function getOptionValue$1(zipReader, options, name) {
		return options[name] === undefined ? zipReader.options[name] : options[name];
	}

	function getDate(timeRaw) {
		const date = (timeRaw & 0xffff0000) >> 16, time = timeRaw & 0x0000ffff;
		try {
			return new Date(1980 + ((date & 0xFE00) >> 9), ((date & 0x01E0) >> 5) - 1, date & 0x001F, (time & 0xF800) >> 11, (time & 0x07E0) >> 5, (time & 0x001F) * 2, 0);
		} catch (_error) {
			// ignored
		}
	}

	function getDateNTFS(timeRaw) {
		return new Date((Number((timeRaw / BigInt(10000)) - BigInt(11644473600000))));
	}

	function getUint8(view, offset) {
		return view.getUint8(offset);
	}

	function getUint16(view, offset) {
		return view.getUint16(offset, true);
	}

	function getUint32(view, offset) {
		return view.getUint32(offset, true);
	}

	function getBigUint64(view, offset) {
		return Number(view.getBigUint64(offset, true));
	}

	function setUint32$1(view, offset, value) {
		view.setUint32(offset, value, true);
	}

	function getDataView$1(array) {
		return new DataView(array.buffer);
	}

	function readUint8Array(reader, offset, size) {
		return reader.readUint8Array(offset, size);
	}

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

	const ERR_DUPLICATED_NAME = "File already exists";
	const ERR_INVALID_COMMENT = "Zip file comment exceeds 64KB";
	const ERR_INVALID_ENTRY_COMMENT = "File entry comment exceeds 64KB";
	const ERR_INVALID_ENTRY_NAME = "File entry name exceeds 64KB";
	const ERR_INVALID_VERSION = "Version exceeds 65535";
	const ERR_INVALID_ENCRYPTION_STRENGTH = "The strength must equal 1, 2, or 3";
	const ERR_INVALID_EXTRAFIELD_TYPE = "Extra field type exceeds 65535";
	const ERR_INVALID_EXTRAFIELD_DATA = "Extra field data exceeds 64KB";
	const ERR_UNSUPPORTED_FORMAT = "Zip64 is not supported (make sure 'keepOrder' is set to 'true')";

	const EXTRAFIELD_DATA_AES = new Uint8Array([0x07, 0x00, 0x02, 0x00, 0x41, 0x45, 0x03, 0x00, 0x00]);
	const EXTRAFIELD_LENGTH_ZIP64 = 24;

	let workers = 0;

	class ZipWriter {

		constructor(writer, options = {}) {
			Object.assign(this, {
				writer,
				options,
				config: getConfiguration(),
				files: new Map(),
				offset: writer.size,
				pendingCompressedSize: 0,
				pendingEntries: [],
				pendingAddFileCalls: new Set()
			});
		}

		async add(name = "", reader, options = {}) {
			const zipWriter = this;
			if (workers < zipWriter.config.maxWorkers) {
				workers++;
				let promiseAddFile;
				try {
					promiseAddFile = addFile(zipWriter, name, reader, options);
					this.pendingAddFileCalls.add(promiseAddFile);
					return await promiseAddFile;
				} finally {
					this.pendingAddFileCalls.delete(promiseAddFile);
					workers--;
					const pendingEntry = zipWriter.pendingEntries.shift();
					if (pendingEntry) {
						zipWriter.add(pendingEntry.name, pendingEntry.reader, pendingEntry.options)
							.then(pendingEntry.resolve)
							.catch(pendingEntry.reject);
					}
				}
			} else {
				return new Promise((resolve, reject) => zipWriter.pendingEntries.push({ name, reader, options, resolve, reject }));
			}
		}

		async close(comment = new Uint8Array(), options = {}) {
			while (this.pendingAddFileCalls.size) {
				await Promise.all(Array.from(this.pendingAddFileCalls));
			}
			await closeFile(this, comment, options);
			return this.writer.getData();
		}
	}

	async function addFile(zipWriter, name, reader, options) {
		name = name.trim();
		if (options.directory && (!name.endsWith(DIRECTORY_SIGNATURE))) {
			name += DIRECTORY_SIGNATURE;
		} else {
			options.directory = name.endsWith(DIRECTORY_SIGNATURE);
		}
		if (zipWriter.files.has(name)) {
			throw new Error(ERR_DUPLICATED_NAME);
		}
		const rawFilename = encodeText(name);
		if (rawFilename.length > MAX_16_BITS) {
			throw new Error(ERR_INVALID_ENTRY_NAME);
		}
		const comment = options.comment || "";
		const rawComment = encodeText(comment);
		if (rawComment.length > MAX_16_BITS) {
			throw new Error(ERR_INVALID_ENTRY_COMMENT);
		}
		const version = zipWriter.options.version || options.version || 0;
		if (version > MAX_16_BITS) {
			throw new Error(ERR_INVALID_VERSION);
		}
		const versionMadeBy = zipWriter.options.versionMadeBy || options.versionMadeBy || 20;
		if (versionMadeBy > MAX_16_BITS) {
			throw new Error(ERR_INVALID_VERSION);
		}
		const lastModDate = getOptionValue(zipWriter, options, "lastModDate") || new Date();
		const lastAccessDate = getOptionValue(zipWriter, options, "lastAccessDate");
		const creationDate = getOptionValue(zipWriter, options, "creationDate");
		const password = getOptionValue(zipWriter, options, "password");
		const encryptionStrength = getOptionValue(zipWriter, options, "encryptionStrength") || 3;
		const zipCrypto = getOptionValue(zipWriter, options, "zipCrypto");
		if (password !== undefined && encryptionStrength !== undefined && (encryptionStrength < 1 || encryptionStrength > 3)) {
			throw new Error(ERR_INVALID_ENCRYPTION_STRENGTH);
		}
		let rawExtraField = new Uint8Array();
		const { extraField } = options;
		if (extraField) {
			let extraFieldSize = 0;
			let offset = 0;
			extraField.forEach(data => extraFieldSize += 4 + data.length);
			rawExtraField = new Uint8Array(extraFieldSize);
			extraField.forEach((data, type) => {
				if (type > MAX_16_BITS) {
					throw new Error(ERR_INVALID_EXTRAFIELD_TYPE);
				}
				if (data.length > MAX_16_BITS) {
					throw new Error(ERR_INVALID_EXTRAFIELD_DATA);
				}
				arraySet(rawExtraField, new Uint16Array([type]), offset);
				arraySet(rawExtraField, new Uint16Array([data.length]), offset + 2);
				arraySet(rawExtraField, data, offset + 4);
				offset += 4 + data.length;
			});
		}
		let extendedTimestamp = getOptionValue(zipWriter, options, "extendedTimestamp");
		if (extendedTimestamp === undefined) {
			extendedTimestamp = true;
		}
		let maximumCompressedSize = 0;
		let keepOrder = getOptionValue(zipWriter, options, "keepOrder");
		if (keepOrder === undefined) {
			keepOrder = true;
		}
		let uncompressedSize = 0;
		let msDosCompatible = getOptionValue(zipWriter, options, "msDosCompatible");
		if (msDosCompatible === undefined) {
			msDosCompatible = true;
		}
		const internalFileAttribute = getOptionValue(zipWriter, options, "internalFileAttribute") || 0;
		const externalFileAttribute = getOptionValue(zipWriter, options, "externalFileAttribute") || 0;
		if (reader) {
			if (!reader.initialized) {
				await reader.init();
			}
			uncompressedSize = reader.size;
			maximumCompressedSize = getMaximumCompressedSize(uncompressedSize);
		}
		let zip64 = options.zip64 || zipWriter.options.zip64 || false;
		if (zipWriter.offset + zipWriter.pendingCompressedSize >= MAX_32_BITS ||
			uncompressedSize >= MAX_32_BITS ||
			maximumCompressedSize >= MAX_32_BITS) {
			if (options.zip64 === false || zipWriter.options.zip64 === false || !keepOrder) {
				throw new Error(ERR_UNSUPPORTED_FORMAT);
			} else {
				zip64 = true;
			}
		}
		zipWriter.pendingCompressedSize += maximumCompressedSize;
		await Promise.resolve();
		const level = getOptionValue(zipWriter, options, "level");
		const useWebWorkers = getOptionValue(zipWriter, options, "useWebWorkers");
		const bufferedWrite = getOptionValue(zipWriter, options, "bufferedWrite");
		let dataDescriptor = getOptionValue(zipWriter, options, "dataDescriptor");
		let dataDescriptorSignature = getOptionValue(zipWriter, options, "dataDescriptorSignature");
		const signal = getOptionValue(zipWriter, options, "signal");
		const useCompressionStream = getOptionValue(zipWriter, options, "useCompressionStream");
		if (dataDescriptor === undefined) {
			dataDescriptor = true;
		}
		if (dataDescriptor && dataDescriptorSignature === undefined) {
			dataDescriptorSignature = false;
		}
		const fileEntry = await getFileEntry(zipWriter, name, reader, Object.assign({}, options, {
			rawFilename,
			rawComment,
			version,
			versionMadeBy,
			lastModDate,
			lastAccessDate,
			creationDate,
			rawExtraField,
			zip64,
			password,
			level,
			useWebWorkers,
			encryptionStrength,
			extendedTimestamp,
			zipCrypto,
			bufferedWrite,
			keepOrder,
			dataDescriptor,
			dataDescriptorSignature,
			signal,
			msDosCompatible,
			internalFileAttribute,
			externalFileAttribute,
			useCompressionStream
		}));
		if (maximumCompressedSize) {
			zipWriter.pendingCompressedSize -= maximumCompressedSize;
		}
		Object.assign(fileEntry, { name, comment, extraField });
		return new Entry(fileEntry);
	}

	async function getFileEntry(zipWriter, name, reader, options) {
		const { files, writer } = zipWriter;
		const previousFileEntry = Array.from(files.values()).pop();
		let fileEntry = {};
		let bufferedWrite;
		let resolveLockUnbufferedWrite;
		let resolveLockCurrentFileEntry;
		files.set(name, fileEntry);
		try {
			let lockPreviousFileEntry;
			let fileWriter;
			if (options.keepOrder) {
				lockPreviousFileEntry = previousFileEntry && previousFileEntry.lock;
			}
			fileEntry.lock = new Promise(resolve => resolveLockCurrentFileEntry = resolve);
			if (options.bufferedWrite || zipWriter.lockWrite || !options.dataDescriptor) {
				fileWriter = new BlobWriter();
				fileWriter.init();
				bufferedWrite = true;
			} else {
				zipWriter.lockWrite = new Promise(resolve => resolveLockUnbufferedWrite = resolve);
				if (!writer.initialized) {
					await writer.init();
				}
				fileWriter = writer;
			}
			fileEntry = await createFileEntry(reader, fileWriter.writable, zipWriter.config, options);
			files.set(name, fileEntry);
			fileEntry.filename = name;
			if (bufferedWrite) {
				let indexWrittenData = 0;
				const blob = fileWriter.getData();
				await Promise.all([zipWriter.lockWrite, lockPreviousFileEntry]);
				let pendingFileEntry;
				do {
					pendingFileEntry = Array.from(files.values()).find(fileEntry => fileEntry.writingBufferedData);
					if (pendingFileEntry) {
						await pendingFileEntry.lock;
					}
				} while (pendingFileEntry && pendingFileEntry.lock);
				fileEntry.writingBufferedData = true;
				const { writable } = writer;
				if (!options.dataDescriptor) {
					const headerLength = 26;
					const arrayBuffer = await sliceAsArrayBuffer(blob, 0, headerLength);
					const arrayBufferView = new DataView(arrayBuffer);
					if (!fileEntry.encrypted || options.zipCrypto) {
						setUint32(arrayBufferView, 14, fileEntry.signature);
					}
					if (fileEntry.zip64) {
						setUint32(arrayBufferView, 18, MAX_32_BITS);
						setUint32(arrayBufferView, 22, MAX_32_BITS);
					} else {
						setUint32(arrayBufferView, 18, fileEntry.compressedSize);
						setUint32(arrayBufferView, 22, fileEntry.uncompressedSize);
					}
					await writeUint8Array(writable, new Uint8Array(arrayBuffer));
					indexWrittenData = headerLength;
				}
				await writeBlob(writable, blob, indexWrittenData);
				delete fileEntry.writingBufferedData;
			}
			fileEntry.offset = zipWriter.offset;
			if (fileEntry.zip64) {
				const rawExtraFieldZip64View = getDataView(fileEntry.rawExtraFieldZip64);
				setBigUint64(rawExtraFieldZip64View, 20, BigInt(fileEntry.offset));
			} else if (fileEntry.offset >= MAX_32_BITS) {
				throw new Error(ERR_UNSUPPORTED_FORMAT);
			}
			zipWriter.offset += fileEntry.length;
			return fileEntry;
		} catch (error) {
			if ((bufferedWrite && fileEntry.writingBufferedData) || (!bufferedWrite && fileEntry.dataWritten)) {
				error.corruptedEntry = zipWriter.hasCorruptedEntries = true;
				if (fileEntry.uncompressedSize) {
					zipWriter.offset += fileEntry.uncompressedSize;
				}
			}
			files.delete(name);
			throw error;
		} finally {
			resolveLockCurrentFileEntry();
			if (resolveLockUnbufferedWrite) {
				resolveLockUnbufferedWrite();
			}
		}
	}

	async function createFileEntry(reader, writable, config, options) {
		const {
			rawFilename,
			lastAccessDate,
			creationDate,
			password,
			level,
			zip64,
			zipCrypto,
			dataDescriptor,
			dataDescriptorSignature,
			directory,
			version,
			versionMadeBy,
			rawComment,
			rawExtraField,
			useWebWorkers,
			onstart,
			onprogress,
			onend,
			signal,
			encryptionStrength,
			extendedTimestamp,
			msDosCompatible,
			internalFileAttribute,
			externalFileAttribute,
			useCompressionStream
		} = options;
		const encrypted = Boolean(password && password.length);
		const compressed = level !== 0 && !directory;
		let rawExtraFieldAES;
		if (encrypted && !zipCrypto) {
			rawExtraFieldAES = new Uint8Array(EXTRAFIELD_DATA_AES.length + 2);
			const extraFieldAESView = getDataView(rawExtraFieldAES);
			setUint16(extraFieldAESView, 0, EXTRAFIELD_TYPE_AES);
			arraySet(rawExtraFieldAES, EXTRAFIELD_DATA_AES, 2);
			setUint8(extraFieldAESView, 8, encryptionStrength);
		} else {
			rawExtraFieldAES = new Uint8Array();
		}
		let rawExtraFieldNTFS;
		let rawExtraFieldExtendedTimestamp;
		if (extendedTimestamp) {
			rawExtraFieldExtendedTimestamp = new Uint8Array(9 + (lastAccessDate ? 4 : 0) + (creationDate ? 4 : 0));
			const extraFieldExtendedTimestampView = getDataView(rawExtraFieldExtendedTimestamp);
			setUint16(extraFieldExtendedTimestampView, 0, EXTRAFIELD_TYPE_EXTENDED_TIMESTAMP);
			setUint16(extraFieldExtendedTimestampView, 2, rawExtraFieldExtendedTimestamp.length - 4);
			const extraFieldExtendedTimestampFlag = 0x1 + (lastAccessDate ? 0x2 : 0) + (creationDate ? 0x4 : 0);
			setUint8(extraFieldExtendedTimestampView, 4, extraFieldExtendedTimestampFlag);
			setUint32(extraFieldExtendedTimestampView, 5, Math.floor(options.lastModDate.getTime() / 1000));
			if (lastAccessDate) {
				setUint32(extraFieldExtendedTimestampView, 9, Math.floor(lastAccessDate.getTime() / 1000));
			}
			if (creationDate) {
				setUint32(extraFieldExtendedTimestampView, 13, Math.floor(creationDate.getTime() / 1000));
			}
			try {
				rawExtraFieldNTFS = new Uint8Array(36);
				const extraFieldNTFSView = getDataView(rawExtraFieldNTFS);
				const lastModTimeNTFS = getTimeNTFS(options.lastModDate);
				setUint16(extraFieldNTFSView, 0, EXTRAFIELD_TYPE_NTFS);
				setUint16(extraFieldNTFSView, 2, 32);
				setUint16(extraFieldNTFSView, 8, EXTRAFIELD_TYPE_NTFS_TAG1);
				setUint16(extraFieldNTFSView, 10, 24);
				setBigUint64(extraFieldNTFSView, 12, lastModTimeNTFS);
				setBigUint64(extraFieldNTFSView, 20, getTimeNTFS(lastAccessDate) || lastModTimeNTFS);
				setBigUint64(extraFieldNTFSView, 28, getTimeNTFS(creationDate) || lastModTimeNTFS);
			} catch (_error) {
				rawExtraFieldNTFS = new Uint8Array();
			}
		} else {
			rawExtraFieldNTFS = rawExtraFieldExtendedTimestamp = new Uint8Array();
		}
		const fileEntry = {
			version: version || VERSION_DEFLATE,
			versionMadeBy,
			zip64,
			directory: Boolean(directory),
			filenameUTF8: true,
			rawFilename,
			commentUTF8: true,
			rawComment,
			rawExtraFieldZip64: zip64 ? new Uint8Array(EXTRAFIELD_LENGTH_ZIP64 + 4) : new Uint8Array(),
			rawExtraFieldExtendedTimestamp,
			rawExtraFieldNTFS,
			rawExtraFieldAES,
			rawExtraField,
			extendedTimestamp,
			msDosCompatible,
			internalFileAttribute,
			externalFileAttribute
		};
		let uncompressedSize = fileEntry.uncompressedSize = 0;
		let bitFlag = BITFLAG_LANG_ENCODING_FLAG;
		if (dataDescriptor) {
			bitFlag = bitFlag | BITFLAG_DATA_DESCRIPTOR;
		}
		let compressionMethod = COMPRESSION_METHOD_STORE;
		if (compressed) {
			compressionMethod = COMPRESSION_METHOD_DEFLATE;
		}
		if (zip64) {
			fileEntry.version = fileEntry.version > VERSION_ZIP64 ? fileEntry.version : VERSION_ZIP64;
		}
		if (encrypted) {
			bitFlag = bitFlag | BITFLAG_ENCRYPTED;
			if (!zipCrypto) {
				fileEntry.version = fileEntry.version > VERSION_AES ? fileEntry.version : VERSION_AES;
				compressionMethod = COMPRESSION_METHOD_AES;
				if (compressed) {
					fileEntry.rawExtraFieldAES[9] = COMPRESSION_METHOD_DEFLATE;
				}
			}
		}
		fileEntry.compressionMethod = compressionMethod;
		const headerArray = fileEntry.headerArray = new Uint8Array(26);
		const headerView = getDataView(headerArray);
		setUint16(headerView, 0, fileEntry.version);
		setUint16(headerView, 2, bitFlag);
		setUint16(headerView, 4, compressionMethod);
		const dateArray = new Uint32Array(1);
		const dateView = getDataView(dateArray);
		let lastModDate;
		if (options.lastModDate < MIN_DATE) {
			lastModDate = MIN_DATE;
		} else if (options.lastModDate > MAX_DATE) {
			lastModDate = MAX_DATE;
		} else {
			lastModDate = options.lastModDate;
		}
		setUint16(dateView, 0, (((lastModDate.getHours() << 6) | lastModDate.getMinutes()) << 5) | lastModDate.getSeconds() / 2);
		setUint16(dateView, 2, ((((lastModDate.getFullYear() - 1980) << 4) | (lastModDate.getMonth() + 1)) << 5) | lastModDate.getDate());
		const rawLastModDate = dateArray[0];
		setUint32(headerView, 6, rawLastModDate);
		setUint16(headerView, 22, rawFilename.length);
		const extraFieldLength = rawExtraFieldAES.length + rawExtraFieldExtendedTimestamp.length + rawExtraFieldNTFS.length + fileEntry.rawExtraField.length;
		setUint16(headerView, 24, extraFieldLength);
		const localHeaderArray = new Uint8Array(30 + rawFilename.length + extraFieldLength);
		const localHeaderView = getDataView(localHeaderArray);
		setUint32(localHeaderView, 0, LOCAL_FILE_HEADER_SIGNATURE);
		arraySet(localHeaderArray, headerArray, 4);
		arraySet(localHeaderArray, rawFilename, 30);
		arraySet(localHeaderArray, rawExtraFieldAES, 30 + rawFilename.length);
		arraySet(localHeaderArray, rawExtraFieldExtendedTimestamp, 30 + rawFilename.length + rawExtraFieldAES.length);
		arraySet(localHeaderArray, rawExtraFieldNTFS, 30 + rawFilename.length + rawExtraFieldAES.length + rawExtraFieldExtendedTimestamp.length);
		arraySet(localHeaderArray, fileEntry.rawExtraField, 30 + rawFilename.length + rawExtraFieldAES.length + rawExtraFieldExtendedTimestamp.length + rawExtraFieldNTFS.length);
		let result;
		let compressedSize = 0;
		if (reader) {
			await writeUint8Array(writable, localHeaderArray);
			fileEntry.dataWritten = true;
			const size = () => reader.size;
			const readable = reader.getReadable({ offset: 0, size, chunkSize: getChunkSize(config) });
			const workerOptions = {
				options: {
					codecType: CODEC_DEFLATE,
					level,
					password,
					encryptionStrength,
					zipCrypto: encrypted && zipCrypto,
					passwordVerification: encrypted && zipCrypto && (rawLastModDate >> 8) & 0xFF,
					signed: true,
					compressed,
					encrypted,
					useWebWorkers,
					useCompressionStream
				},
				config,
				streamOptions: { signal, size, onstart, onprogress, onend },
				codecConstructor: config.Deflate
			};
			result = await runWorker({ readable, writable }, workerOptions);
			uncompressedSize = fileEntry.uncompressedSize = reader.size;
			compressedSize = result.length;
		} else {
			await writeUint8Array(writable, localHeaderArray);
			fileEntry.dataWritten = true;
		}
		let dataDescriptorArray = new Uint8Array();
		let dataDescriptorView, dataDescriptorOffset = 0;
		if (dataDescriptor) {
			dataDescriptorArray = new Uint8Array(zip64 ? (dataDescriptorSignature ? 24 : 20) : (dataDescriptorSignature ? 16 : 12));
			dataDescriptorView = getDataView(dataDescriptorArray);
			if (dataDescriptorSignature) {
				dataDescriptorOffset = 4;
				setUint32(dataDescriptorView, 0, DATA_DESCRIPTOR_RECORD_SIGNATURE);
			}
		}
		if (reader) {
			const { signature } = result;
			if ((!encrypted || zipCrypto) && signature !== undefined) {
				setUint32(headerView, 10, signature);
				fileEntry.signature = signature;
				if (dataDescriptor) {
					setUint32(dataDescriptorView, dataDescriptorOffset, signature);
				}
			}
			if (zip64) {
				const rawExtraFieldZip64View = getDataView(fileEntry.rawExtraFieldZip64);
				setUint16(rawExtraFieldZip64View, 0, EXTRAFIELD_TYPE_ZIP64);
				setUint16(rawExtraFieldZip64View, 2, EXTRAFIELD_LENGTH_ZIP64);
				setUint32(headerView, 14, MAX_32_BITS);
				setBigUint64(rawExtraFieldZip64View, 12, BigInt(compressedSize));
				setUint32(headerView, 18, MAX_32_BITS);
				setBigUint64(rawExtraFieldZip64View, 4, BigInt(uncompressedSize));
				if (dataDescriptor) {
					setBigUint64(dataDescriptorView, dataDescriptorOffset + 4, BigInt(compressedSize));
					setBigUint64(dataDescriptorView, dataDescriptorOffset + 12, BigInt(uncompressedSize));
				}
			} else {
				setUint32(headerView, 14, compressedSize);
				setUint32(headerView, 18, uncompressedSize);
				if (dataDescriptor) {
					setUint32(dataDescriptorView, dataDescriptorOffset + 4, compressedSize);
					setUint32(dataDescriptorView, dataDescriptorOffset + 8, uncompressedSize);
				}
			}
		}
		if (dataDescriptor) {
			await writeUint8Array(writable, dataDescriptorArray);
		}
		const length = localHeaderArray.length + compressedSize + dataDescriptorArray.length;
		Object.assign(fileEntry, { compressedSize, lastModDate, rawLastModDate, creationDate, lastAccessDate, encrypted, length });
		return fileEntry;
	}

	async function closeFile(zipWriter, comment, options) {
		const { files } = zipWriter;
		let offset = 0;
		let directoryDataLength = 0;
		let directoryOffset = zipWriter.offset;
		let filesLength = files.size;
		for (const [, fileEntry] of files) {
			directoryDataLength += 46 +
				fileEntry.rawFilename.length +
				fileEntry.rawComment.length +
				fileEntry.rawExtraFieldZip64.length +
				fileEntry.rawExtraFieldAES.length +
				fileEntry.rawExtraFieldExtendedTimestamp.length +
				fileEntry.rawExtraFieldNTFS.length +
				fileEntry.rawExtraField.length;
		}
		let zip64 = options.zip64 || zipWriter.options.zip64 || false;
		if (directoryOffset >= MAX_32_BITS || directoryDataLength >= MAX_32_BITS || filesLength >= MAX_16_BITS) {
			if (options.zip64 === false || zipWriter.options.zip64 === false) {
				throw new Error(ERR_UNSUPPORTED_FORMAT);
			} else {
				zip64 = true;
			}
		}
		const directoryArray = new Uint8Array(directoryDataLength + (zip64 ? ZIP64_END_OF_CENTRAL_DIR_TOTAL_LENGTH : END_OF_CENTRAL_DIR_LENGTH));
		const directoryView = getDataView(directoryArray);
		if (comment && comment.length) {
			if (comment.length <= MAX_16_BITS) {
				setUint16(directoryView, offset + 20, comment.length);
			} else {
				throw new Error(ERR_INVALID_COMMENT);
			}
		}
		for (const [indexFileEntry, fileEntry] of Array.from(files.values()).entries()) {
			const {
				rawFilename,
				rawExtraFieldZip64,
				rawExtraFieldAES,
				rawExtraField,
				rawComment,
				versionMadeBy,
				headerArray,
				directory,
				zip64,
				msDosCompatible,
				internalFileAttribute,
				externalFileAttribute
			} = fileEntry;
			let rawExtraFieldExtendedTimestamp;
			let rawExtraFieldNTFS;
			if (fileEntry.extendedTimestamp) {
				rawExtraFieldNTFS = fileEntry.rawExtraFieldNTFS;
				rawExtraFieldExtendedTimestamp = new Uint8Array(9);
				const extraFieldExtendedTimestampView = getDataView(rawExtraFieldExtendedTimestamp);
				setUint16(extraFieldExtendedTimestampView, 0, EXTRAFIELD_TYPE_EXTENDED_TIMESTAMP);
				setUint16(extraFieldExtendedTimestampView, 2, rawExtraFieldExtendedTimestamp.length - 4);
				setUint8(extraFieldExtendedTimestampView, 4, 0x1);
				setUint32(extraFieldExtendedTimestampView, 5, Math.floor(fileEntry.lastModDate.getTime() / 1000));
			} else {
				rawExtraFieldNTFS = rawExtraFieldExtendedTimestamp = new Uint8Array();
			}
			const extraFieldLength = rawExtraFieldZip64.length + rawExtraFieldAES.length + rawExtraFieldExtendedTimestamp.length + rawExtraFieldNTFS.length + rawExtraField.length;
			setUint32(directoryView, offset, CENTRAL_FILE_HEADER_SIGNATURE);
			setUint16(directoryView, offset + 4, versionMadeBy);
			arraySet(directoryArray, headerArray, offset + 6);
			setUint16(directoryView, offset + 30, extraFieldLength);
			setUint16(directoryView, offset + 32, rawComment.length);
			setUint32(directoryView, offset + 34, internalFileAttribute);
			if (externalFileAttribute) {
				setUint32(directoryView, offset + 38, externalFileAttribute);
			} else if (directory && msDosCompatible) {
				setUint8(directoryView, offset + 38, FILE_ATTR_MSDOS_DIR_MASK);
			}
			if (zip64) {
				setUint32(directoryView, offset + 42, MAX_32_BITS);
			} else {
				setUint32(directoryView, offset + 42, fileEntry.offset);
			}
			arraySet(directoryArray, rawFilename, offset + 46);
			arraySet(directoryArray, rawExtraFieldZip64, offset + 46 + rawFilename.length);
			arraySet(directoryArray, rawExtraFieldAES, offset + 46 + rawFilename.length + rawExtraFieldZip64.length);
			arraySet(directoryArray, rawExtraFieldExtendedTimestamp, offset + 46 + rawFilename.length + rawExtraFieldZip64.length + rawExtraFieldAES.length);
			arraySet(directoryArray, rawExtraFieldNTFS, offset + 46 + rawFilename.length + rawExtraFieldZip64.length + rawExtraFieldAES.length + rawExtraFieldExtendedTimestamp.length);
			arraySet(directoryArray, rawExtraField, offset + 46 + rawFilename.length + rawExtraFieldZip64.length + rawExtraFieldAES.length + rawExtraFieldExtendedTimestamp.length + rawExtraFieldNTFS.length);
			arraySet(directoryArray, rawComment, offset + 46 + rawFilename.length + extraFieldLength);
			offset += 46 + rawFilename.length + extraFieldLength + rawComment.length;
			if (options.onprogress) {
				try {
					await options.onprogress(indexFileEntry + 1, files.size, new Entry(fileEntry));
				} catch (_error) {
					// ignored
				}
			}
		}
		if (zip64) {
			setUint32(directoryView, offset, ZIP64_END_OF_CENTRAL_DIR_SIGNATURE);
			setBigUint64(directoryView, offset + 4, BigInt(44));
			setUint16(directoryView, offset + 12, 45);
			setUint16(directoryView, offset + 14, 45);
			setBigUint64(directoryView, offset + 24, BigInt(filesLength));
			setBigUint64(directoryView, offset + 32, BigInt(filesLength));
			setBigUint64(directoryView, offset + 40, BigInt(directoryDataLength));
			setBigUint64(directoryView, offset + 48, BigInt(directoryOffset));
			setUint32(directoryView, offset + 56, ZIP64_END_OF_CENTRAL_DIR_LOCATOR_SIGNATURE);
			setBigUint64(directoryView, offset + 64, BigInt(directoryOffset) + BigInt(directoryDataLength));
			setUint32(directoryView, offset + 72, ZIP64_TOTAL_NUMBER_OF_DISKS);
			filesLength = MAX_16_BITS;
			directoryOffset = MAX_32_BITS;
			directoryDataLength = MAX_32_BITS;
			offset += 76;
		}
		setUint32(directoryView, offset, END_OF_CENTRAL_DIR_SIGNATURE);
		setUint16(directoryView, offset + 8, filesLength);
		setUint16(directoryView, offset + 10, filesLength);
		setUint32(directoryView, offset + 12, directoryDataLength);
		setUint32(directoryView, offset + 16, directoryOffset);
		const { writable } = zipWriter.writer;
		await writeUint8Array(writable, directoryArray);
		if (comment && comment.length) {
			await writeUint8Array(writable, comment);
		}
	}

	function sliceAsArrayBuffer(blob, start, end) {
		if (start || end) {
			return blob.slice(start, end).arrayBuffer();
		} else {
			return blob.arrayBuffer();
		}
	}

	async function writeBlob(writable, blob, start = 0) {
		const blockSize = 512 * 1024 * 1024;
		await writeSlice();

		async function writeSlice() {
			if (start < blob.size) {
				const arrayBuffer = await sliceAsArrayBuffer(blob, start, start + blockSize);
				await writeUint8Array(writable, new Uint8Array(arrayBuffer));
				start += blockSize;
				await writeSlice();
			}
		}
	}

	async function writeUint8Array(writable, array) {
		const streamWriter = writable.getWriter();
		await streamWriter.ready;
		await streamWriter.write(array);
		streamWriter.releaseLock();
	}

	function getTimeNTFS(date) {
		if (date) {
			return ((BigInt(date.getTime()) + BigInt(11644473600000)) * BigInt(10000));
		}
	}

	function getOptionValue(zipWriter, options, name) {
		return options[name] === undefined ? zipWriter.options[name] : options[name];
	}

	function getMaximumCompressedSize(uncompressedSize) {
		return uncompressedSize + (5 * (Math.floor(uncompressedSize / 16383) + 1));
	}

	function setUint8(view, offset, value) {
		view.setUint8(offset, value);
	}

	function setUint16(view, offset, value) {
		view.setUint16(offset, value, true);
	}

	function setUint32(view, offset, value) {
		view.setUint32(offset, value, true);
	}

	function setBigUint64(view, offset, value) {
		view.setBigUint64(offset, value, true);
	}

	function arraySet(array, typedArray, offset) {
		array.set(typedArray, offset);
	}

	function getDataView(array) {
		return new DataView(array.buffer);
	}

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

	const CHUNK_SIZE = 512 * 1024;

	class ZipEntry {

		constructor(fs, name, params, parent) {
			const zipEntry = this;
			if (fs.root && parent && parent.getChildByName(name)) {
				throw new Error("Entry filename already exists");
			}
			if (!params) {
				params = {};
			}
			Object.assign(zipEntry, {
				fs,
				name,
				data: params.data,
				id: fs.entries.length,
				parent,
				children: [],
				uncompressedSize: 0
			});
			fs.entries.push(zipEntry);
			if (parent) {
				zipEntry.parent.children.push(zipEntry);
			}
		}

		moveTo(target) {
			// deprecated
			const zipEntry = this;
			zipEntry.fs.move(zipEntry, target);
		}

		getFullname() {
			return this.getRelativeName();
		}

		getRelativeName(ancestor = this.fs.root) {
			const zipEntry = this;
			let relativeName = zipEntry.name;
			let entry = zipEntry.parent;
			while (entry && entry != ancestor) {
				relativeName = (entry.name ? entry.name + "/" : "") + relativeName;
				entry = entry.parent;
			}
			return relativeName;
		}

		isDescendantOf(ancestor) {
			let entry = this.parent;
			while (entry && entry.id != ancestor.id) {
				entry = entry.parent;
			}
			return Boolean(entry);
		}
	}

	class ZipFileEntry extends ZipEntry {

		constructor(fs, name, params, parent) {
			super(fs, name, params, parent);
			const zipEntry = this;
			zipEntry.Reader = params.Reader;
			zipEntry.Writer = params.Writer;
			if (params.getData) {
				zipEntry.getData = params.getData;
			}
		}

		async getData(writer, options = {}) {
			const zipEntry = this;
			if (!writer || (writer.constructor == zipEntry.Writer && zipEntry.data)) {
				return zipEntry.data;
			} else {
				zipEntry.reader = new zipEntry.Reader(zipEntry.data, options);
				await zipEntry.reader.init();
				if (!writer.initialized) {
					await writer.init();
				}
				zipEntry.uncompressedSize = zipEntry.reader.size;
				return pipe(zipEntry.reader, writer);
			}
		}

		getText(encoding, options) {
			return this.getData(new TextWriter(encoding), options);
		}

		getBlob(mimeType, options) {
			return this.getData(new BlobWriter(mimeType), options);
		}

		getData64URI(mimeType, options) {
			return this.getData(new Data64URIWriter(mimeType), options);
		}

		getUint8Array(options) {
			return this.getData(new Uint8ArrayWriter(), options);
		}

		replaceBlob(blob) {
			Object.assign(this, {
				data: blob,
				Reader: BlobReader,
				Writer: BlobWriter,
				reader: null
			});
		}

		replaceText(text) {
			Object.assign(this, {
				data: text,
				Reader: TextReader,
				Writer: TextWriter,
				reader: null
			});
		}

		replaceData64URI(dataURI) {
			Object.assign(this, {
				data: dataURI,
				Reader: Data64URIReader,
				Writer: Data64URIWriter,
				reader: null
			});
		}

		replaceUint8Array(array) {
			Object.assign(this, {
				data: array,
				Reader: Uint8ArrayReader,
				Writer: Uint8ArrayWriter,
				reader: null
			});
		}
	}

	class ZipDirectoryEntry extends ZipEntry {

		constructor(fs, name, params, parent) {
			super(fs, name, params, parent);
			this.directory = true;
		}

		addDirectory(name) {
			return addChild(this, name, null, true);
		}

		addText(name, text) {
			return addChild(this, name, {
				data: text,
				Reader: TextReader,
				Writer: TextWriter
			});
		}

		addBlob(name, blob) {
			return addChild(this, name, {
				data: blob,
				Reader: BlobReader,
				Writer: BlobWriter
			});
		}

		addData64URI(name, dataURI) {
			return addChild(this, name, {
				data: dataURI,
				Reader: Data64URIReader,
				Writer: Data64URIWriter
			});
		}

		addUint8Array(name, array) {
			return addChild(this, name, {
				data: array,
				Reader: Uint8ArrayReader,
				Writer: Uint8ArrayWriter
			});
		}

		addHttpContent(name, url, options = {}) {
			return addChild(this, name, {
				data: url,
				Reader: class extends HttpReader {
					constructor(url) {
						super(url, options);
					}
				}
			});
		}

		addFileSystemEntry(fileSystemEntry) {
			return addFileSystemEntry(this, fileSystemEntry);
		}

		addData(name, params) {
			return addChild(this, name, params);
		}

		async importBlob(blob, options = {}) {
			await this.importZip(new BlobReader(blob), options);
		}

		async importData64URI(dataURI, options = {}) {
			await this.importZip(new Data64URIReader(dataURI), options);
		}

		async importUint8Array(array, options = {}) {
			await this.importZip(new Uint8ArrayReader(array), options);
		}

		async importHttpContent(url, options = {}) {
			await this.importZip(new HttpReader(url, options), options);
		}

		exportBlob(options = {}) {
			return this.exportZip(new BlobWriter("application/zip"), options);
		}

		exportData64URI(options = {}) {
			return this.exportZip(new Data64URIWriter("application/zip"), options);
		}

		exportUint8Array(options = {}) {
			return this.exportZip(new Uint8ArrayWriter(), options);
		}

		async importZip(reader, options) {
			if (!reader.initialized) {
				await reader.init();
			}
			const zipReader = new ZipReader(reader, options);
			const entries = await zipReader.getEntries();
			entries.forEach((entry) => {
				let parent = this;
				const path = entry.filename.split("/");
				const name = path.pop();
				path.forEach(pathPart => parent = parent.getChildByName(pathPart) || new ZipDirectoryEntry(this.fs, pathPart, null, parent));
				if (!entry.directory) {
					addChild(parent, name, {
						data: entry,
						Reader: getZipBlobReader(Object.assign({}, options))
					});
				}
			});
		}

		async exportZip(writer, options) {
			const zipEntry = this;
			await initReaders(zipEntry);
			await writer.init();
			const zipWriter = new ZipWriter(writer, options);
			await exportZip(zipWriter, zipEntry, getTotalSize([zipEntry], "uncompressedSize"), options);
			await zipWriter.close();
			return writer.getData();
		}

		getChildByName(name) {
			const children = this.children;
			for (let childIndex = 0; childIndex < children.length; childIndex++) {
				const child = children[childIndex];
				if (child.name == name) {
					return child;
				}
			}
		}
	}


	class FS {

		constructor() {
			resetFS(this);
		}

		get children() {
			return this.root.children;
		}

		remove(entry) {
			detach(entry);
			this.entries[entry.id] = null;
		}

		move(entry, destination) {
			if (entry == this.root) {
				throw new Error("Root directory cannot be moved");
			} else {
				if (destination.directory) {
					if (!destination.isDescendantOf(entry)) {
						if (entry != destination) {
							if (destination.getChildByName(entry.name)) {
								throw new Error("Entry filename already exists");
							}
							detach(entry);
							entry.parent = destination;
							destination.children.push(entry);
						}
					} else {
						throw new Error("Entry is a ancestor of target entry");
					}
				} else {
					throw new Error("Target entry is not a directory");
				}
			}
		}

		find(fullname) {
			const path = fullname.split("/");
			let node = this.root;
			for (let index = 0; node && index < path.length; index++) {
				node = node.getChildByName(path[index]);
			}
			return node;
		}

		getById(id) {
			return this.entries[id];
		}

		getChildByName(name) {
			return this.root.getChildByName(name);
		}

		addDirectory(name) {
			return this.root.addDirectory(name);
		}

		addText(name, text) {
			return this.root.addText(name, text);
		}

		addBlob(name, blob) {
			return this.root.addBlob(name, blob);
		}

		addData64URI(name, dataURI) {
			return this.root.addData64URI(name, dataURI);
		}

		addHttpContent(name, url, options) {
			return this.root.addHttpContent(name, url, options);
		}

		addFileSystemEntry(fileSystemEntry) {
			return this.root.addFileSystemEntry(fileSystemEntry);
		}

		addData(name, params) {
			return this.root.addData(name, params);
		}

		async importBlob(blob, options) {
			resetFS(this);
			await this.root.importBlob(blob, options);
		}

		async importData64URI(dataURI, options) {
			resetFS(this);
			await this.root.importData64URI(dataURI, options);
		}

		async importHttpContent(url, options) {
			resetFS(this);
			await this.root.importHttpContent(url, options);
		}

		exportBlob(options) {
			return this.root.exportBlob(options);
		}

		exportData64URI(options) {
			return this.root.exportData64URI(options);
		}
	}

	const fs = { FS, ZipDirectoryEntry, ZipFileEntry };

	function getTotalSize(entries, propertyName) {
		let size = 0;
		entries.forEach(process);
		return size;

		function process(entry) {
			size += entry[propertyName];
			if (entry.children) {
				entry.children.forEach(process);
			}
		}
	}

	function getZipBlobReader(options) {
		return class extends Reader {

			constructor(entry, options = {}) {
				super();
				this.entry = entry;
				this.options = options;
			}

			async init() {
				const zipBlobReader = this;
				zipBlobReader.size = zipBlobReader.entry.uncompressedSize;
				const data = await zipBlobReader.entry.getData(new BlobWriter(), Object.assign({}, zipBlobReader.options, options));
				zipBlobReader.data = data;
				zipBlobReader.blobReader = new BlobReader(data);
			}

			readUint8Array(index, length) {
				return this.blobReader.readUint8Array(index, length);
			}
		};
	}

	async function initReaders(entry) {
		if (entry.children.length) {
			for (const child of entry.children) {
				if (child.directory) {
					await initReaders(child);
				} else {
					child.reader = new child.Reader(child.data);
					await child.reader.init();
					child.uncompressedSize = child.reader.size;
				}
			}
		}
	}

	function detach(entry) {
		const children = entry.parent.children;
		children.forEach((child, index) => {
			if (child.id == entry.id) {
				children.splice(index, 1);
			}
		});
	}

	async function exportZip(zipWriter, entry, totalSize, options) {
		const selectedEntry = entry;
		const entryOffsets = new Map();
		await process(zipWriter, entry);

		async function process(zipWriter, entry) {
			await exportChild();

			async function exportChild() {
				if (options.bufferedWrite) {
					await Promise.all(entry.children.map(processChild));
				} else {
					for (const child of entry.children) {
						await processChild(child);
					}
				}
			}

			async function processChild(child) {
				const name = options.relativePath ? child.getRelativeName(selectedEntry) : child.getFullname();
				await zipWriter.add(name, child.reader, Object.assign({
					directory: child.directory
				}, Object.assign({}, options, {
					onprogress: async indexProgress => {
						if (options.onprogress) {
							entryOffsets.set(name, indexProgress);
							try {
								await options.onprogress(Array.from(entryOffsets.values()).reduce((previousValue, currentValue) => previousValue + currentValue), totalSize);
							} catch (_error) {
								// ignored
							}
						}
					}
				})));
				await process(zipWriter, child);
			}
		}
	}

	async function addFileSystemEntry(zipEntry, fileSystemEntry) {
		if (fileSystemEntry.isDirectory) {
			const entry = zipEntry.addDirectory(fileSystemEntry.name);
			await addDirectory(entry, fileSystemEntry);
			return entry;
		} else {
			return new Promise((resolve, reject) => fileSystemEntry.file(file => resolve(zipEntry.addBlob(fileSystemEntry.name, file)), reject));
		}

		async function addDirectory(zipEntry, fileEntry) {
			const children = await getChildren(fileEntry);
			for (const child of children) {
				if (child.isDirectory) {
					await addDirectory(zipEntry.addDirectory(child.name), child);
				} else {
					await new Promise((resolve, reject) => {
						child.file(file => {
							const childZipEntry = zipEntry.addBlob(child.name, file);
							childZipEntry.uncompressedSize = file.size;
							resolve(childZipEntry);
						}, reject);
					});
				}
			}
		}

		function getChildren(fileEntry) {
			return new Promise((resolve, reject) => {
				let entries = [];
				if (fileEntry.isDirectory) {
					readEntries(fileEntry.createReader());
				}
				if (fileEntry.isFile) {
					resolve(entries);
				}

				function readEntries(directoryReader) {
					directoryReader.readEntries(temporaryEntries => {
						if (!temporaryEntries.length) {
							resolve(entries);
						} else {
							entries = entries.concat(temporaryEntries);
							readEntries(directoryReader);
						}
					}, reject);
				}
			});
		}
	}

	function resetFS(fs) {
		fs.entries = [];
		fs.root = new ZipDirectoryEntry(fs);
	}

	function pipe(reader, writer) {
		return copyChunk();

		async function copyChunk(chunkIndex = 0) {
			const index = chunkIndex * CHUNK_SIZE;
			if (index < reader.size) {
				const array = await reader.readUint8Array(index, Math.min(CHUNK_SIZE, reader.size - index));
				await writer.writeUint8Array(array);
				return copyChunk(chunkIndex + 1);
			} else {
				return writer.getData();
			}
		}
	}

	function addChild(parent, name, params, directory) {
		if (parent.directory) {
			return directory ? new ZipDirectoryEntry(parent.fs, name, params, parent) : new ZipFileEntry(parent.fs, name, params, parent);
		} else {
			throw new Error("Parent entry is not a directory");
		}
	}

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

	let baseURL;
	try {
		baseURL = (typeof document === 'undefined' && typeof location === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : typeof document === 'undefined' ? location.href : (document.currentScript && document.currentScript.src || new URL('zip-fs.js', document.baseURI).href));
	} catch (_error) {
		// ignored
	}
	configure({ baseURL });
	e(configure);

	exports.BlobReader = BlobReader;
	exports.BlobWriter = BlobWriter;
	exports.Data64URIReader = Data64URIReader;
	exports.Data64URIWriter = Data64URIWriter;
	exports.ERR_ABORT = ERR_ABORT;
	exports.ERR_BAD_FORMAT = ERR_BAD_FORMAT;
	exports.ERR_CENTRAL_DIRECTORY_NOT_FOUND = ERR_CENTRAL_DIRECTORY_NOT_FOUND;
	exports.ERR_DUPLICATED_NAME = ERR_DUPLICATED_NAME;
	exports.ERR_ENCRYPTED = ERR_ENCRYPTED;
	exports.ERR_EOCDR_LOCATOR_ZIP64_NOT_FOUND = ERR_EOCDR_LOCATOR_ZIP64_NOT_FOUND;
	exports.ERR_EOCDR_NOT_FOUND = ERR_EOCDR_NOT_FOUND;
	exports.ERR_EOCDR_ZIP64_NOT_FOUND = ERR_EOCDR_ZIP64_NOT_FOUND;
	exports.ERR_EXTRAFIELD_ZIP64_NOT_FOUND = ERR_EXTRAFIELD_ZIP64_NOT_FOUND;
	exports.ERR_HTTP_RANGE = ERR_HTTP_RANGE;
	exports.ERR_INVALID_COMMENT = ERR_INVALID_COMMENT;
	exports.ERR_INVALID_ENCRYPTION_STRENGTH = ERR_INVALID_ENCRYPTION_STRENGTH;
	exports.ERR_INVALID_ENTRY_COMMENT = ERR_INVALID_ENTRY_COMMENT;
	exports.ERR_INVALID_ENTRY_NAME = ERR_INVALID_ENTRY_NAME;
	exports.ERR_INVALID_EXTRAFIELD_DATA = ERR_INVALID_EXTRAFIELD_DATA;
	exports.ERR_INVALID_EXTRAFIELD_TYPE = ERR_INVALID_EXTRAFIELD_TYPE;
	exports.ERR_INVALID_PASSWORD = ERR_INVALID_PASSWORD;
	exports.ERR_INVALID_SIGNATURE = ERR_INVALID_SIGNATURE;
	exports.ERR_INVALID_VERSION = ERR_INVALID_VERSION;
	exports.ERR_LOCAL_FILE_HEADER_NOT_FOUND = ERR_LOCAL_FILE_HEADER_NOT_FOUND;
	exports.ERR_NOT_SEEKABLE_READER = ERR_NOT_SEEKABLE_READER;
	exports.ERR_UNSUPPORTED_COMPRESSION = ERR_UNSUPPORTED_COMPRESSION;
	exports.ERR_UNSUPPORTED_ENCRYPTION = ERR_UNSUPPORTED_ENCRYPTION;
	exports.ERR_UNSUPPORTED_FORMAT = ERR_UNSUPPORTED_FORMAT;
	exports.HttpRangeReader = HttpRangeReader;
	exports.HttpReader = HttpReader;
	exports.ReadableStreamReader = ReadableStreamReader;
	exports.Reader = Reader;
	exports.TextReader = TextReader;
	exports.TextWriter = TextWriter;
	exports.Uint8ArrayReader = Uint8ArrayReader;
	exports.Uint8ArrayWriter = Uint8ArrayWriter;
	exports.WritableStreamWriter = WritableStreamWriter;
	exports.Writer = Writer;
	exports.ZipReader = ZipReader;
	exports.ZipWriter = ZipWriter;
	exports.configure = configure;
	exports.fs = fs;
	exports.getMimeType = getMimeType;
	exports.initShimAsyncCodec = streamCodecShim;
	exports.terminateWorkers = terminateWorkers;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
