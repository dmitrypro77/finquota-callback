export type PayloadRequest = {
	ticker: string
	close: number
	is_buy_signal: boolean
	is_sell_signal: boolean
	is_stop_signal: boolean
	strategy: {
		name: string
		active: boolean
	},
	timestamp: string
}

export interface Provider {
	send: (payload: PayloadRequest) => Promise<boolean>,
	isValidSettings: () => boolean,
}

export interface Env {
	MAILGUN_API_KEY: string;
	MAILGUN_FROM: string;
	MAILGUN_DOMAIN: string;
	MAILGUN_TO: string;
	MAILGUN_SUBJECT: string;
	MESSAGE: string;
	WEBHOOK_URL: string;
	PROVIDER: string;
	API_TOKEN: string;
}

export const BadRequestMessage: String = 'Bad request'
export const MissingEnvVarMessage: String = 'Missing ENV variables'
export const InvalidTokenMessage: String = 'API Token is invalid or has expired'
