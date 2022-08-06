/* global process */
/* eslint-disable no-console */

import tests from "./tests-data.js";
runTests();

async function runTests() {
	let passed = true;
	for (const test of tests) {
		if (!test.env || test.env.includes("node")) {
			const fn = async () => (await import("./all/" + test.script)).test();
			try {
				console.log(test.title + "...", await fn() && "ok");
			} catch (error) {
				passed = false;
				console.error(test.title + "...", "FAILED");
				console.error(error);
			}
		}
	}
	console.log("");
	if (passed) {
		console.log("ok");
		console.log("");
	} else {
		console.error("error: Test failed");
		console.log("");
		process.exit(-1);
	}
}