// test/index.spec.ts
import { describe, it, expect } from 'vitest';
import { isTokenValid, isValidRequest } from '../src/validator';

const IncomingRequest = Request<unknown, IncomingRequestCfProperties>;

describe('FinQuota Validator Test', () => {

	it('test valid request', async () => {
		const isValid = isValidRequest(new IncomingRequest('http://example.com', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-Auth-Token': 'test'
			},
		}));

		expect(isValid).eq(true);
	});

	it('test invalid content-type request', async () => {
		const isValid = isValidRequest(new IncomingRequest('http://example.com', {
			method: 'POST',
		}));
		expect(isValid).eq(false);
	});

	it('test valid token', async () => {
		// Mock env variables
		const env = {
			API_TOKEN: 'test'
		}

		const isValid = isTokenValid(new IncomingRequest('http://example.com', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-Auth-Token': 'test'
			},
		}), env);
		expect(isValid).eq(true);
	});

	it('test invalid token', async () => {
		// Mock env variables
		const env = {
			API_TOKEN: 'test1'
		}

		const isValid = isTokenValid(new IncomingRequest('http://example.com', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-Auth-Token': 'test'
			},
		}), env);
		expect(isValid).eq(false);
	});
});
