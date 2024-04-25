import { Env, Provider } from '../types';
import { MailgunProvider } from './mailgun';
import { SlackProvider } from './slack';
import { GoogleChatProvider } from './google_chat';

export const createProvider = (env: Env): Provider | null => {
	switch (env.PROVIDER) {
		case "mailgun":
			return new MailgunProvider({
				api_key: env.MAILGUN_API_KEY,
				domain_name: env.MAILGUN_DOMAIN,
				from: env.MAILGUN_FROM,
				to: env.MAILGUN_TO,
				subject: env.MAILGUN_SUBJECT,
				text: env.MESSAGE
			})
		case "slack":
			return new SlackProvider({
				webhook_url: env.WEBHOOK_URL,
				text: env.MESSAGE
			})
		case "google_chat":
			return new GoogleChatProvider({
				webhook_url: env.WEBHOOK_URL,
				text: env.MESSAGE
			})
	}

	return null
}
