// test/index.spec.ts
import { env, createExecutionContext, waitOnExecutionContext, SELF } from 'cloudflare:test';
import { describe, it, expect } from 'vitest';
import worker from '../src/index';
import { InvalidTokenMessage } from '../src/types';

const IncomingRequest = Request<unknown, IncomingRequestCfProperties>;

describe('FinQuota Callback Mailgun Test', () => {

	it('test invalid request', async () => {
		const request = new IncomingRequest('http://example.com');
		// Create an empty context to pass to `worker.fetch()`.
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);
		// Wait for all `Promise`s passed to `ctx.waitUntil()` to settle before running test assertions
		await waitOnExecutionContext(ctx);

		expect(response.status).eq(400);
	});

	it('test a valid request without an API token', async () => {
		const request = new IncomingRequest('http://example.com', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				ticker: "WDAY",
				close: 300
			})
		});
		// Create an empty context to pass to `worker.fetch()`.
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);
		// Wait for all `Promise`s passed to `ctx.waitUntil()` to settle before running test assertions
		await waitOnExecutionContext(ctx);
		const textResponse = await response.text()

		expect(response.status).eq(401);
		expect(textResponse).eq(InvalidTokenMessage);
	});

	it('test valid request', async () => {
		const request = new IncomingRequest('http://example.com', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-Auth-Token': 'test'
			},
			body: JSON.stringify({
				ticker: "WDAY",
				close: 300
			})
		});


		// Create an empty context to pass to `worker.fetch()`.
		const ctx = createExecutionContext();

		// Set fake env variables.
		env.API_TOKEN = "test"
		env.PROVIDER = "mailgun"
		env.MAILGUN_API_KEY = "test"
		const response = await worker.fetch(request, env, ctx);
		// Wait for all `Promise`s passed to `ctx.waitUntil()` to settle before running test assertions
		await waitOnExecutionContext(ctx);

		// Expects 200 response
		expect(response.status).eq(200);
	});
});
