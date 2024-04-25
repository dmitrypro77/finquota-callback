import { BadRequestMessage, PayloadRequest, Env, MissingEnvVarMessage, InvalidTokenMessage } from './types';
import { isValidRequest, isTokenValid } from './validator';
import { createProvider } from './provider';

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		let payload: PayloadRequest;

		// Validate request headers
		if (!isValidRequest(request)) {
			return new Response(BadRequestMessage, { status: 400 });
		}

		// Validate user API key
		if (!isTokenValid(request, env)){
			return new Response(InvalidTokenMessage, { status: 401 });
		}

		const provider = createProvider(env)

		if (provider === null || !provider.isValidSettings()) {
			return new Response(MissingEnvVarMessage, { status: 422 });
		}

		try {
			payload = await request.json();
		} catch (e) {
			return new Response(BadRequestMessage, { status: 400 });
		}

		const isSuccess = await provider.send(payload)

		return new Response(JSON.stringify({
			status: isSuccess ? 'success' : "failed"
		}), {
			headers: { 'Content-Type': 'application/json' },
		})
	}
};
