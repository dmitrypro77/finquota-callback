/**
 * Return true if the given request is valid.
 *
 * @param request
 *
 * @return Boolean
 */
export const isValidRequest = (request: Request): boolean => {
	const contentType = request.headers.get("content-type");
	const requestMethod = request.method;

	return contentType !== null && contentType === "application/json" && requestMethod === "POST"
}


/**
 * Validate API token.
 *
 * @return Boolean
 */
export const isTokenValid = (request: Request, env): boolean => {
	const token = request.headers.get("x-auth-token");

	return token !== null && token === env.API_TOKEN
}
