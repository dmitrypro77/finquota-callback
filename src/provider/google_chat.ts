import { PayloadRequest, Provider, TemplateOptions } from '../types';
import { generateMessage } from '../template';

interface GoogleChatProviderProps {
	webhook_url: string
	text: string
}

/**
 * GoogleChatProvider sends notifications to the Google Chat App.
 */
export class GoogleChatProvider implements Provider {
	private readonly settings: GoogleChatProviderProps;

	/**
	 * Google Chat Provider Constructor.
	 *
	 * @param settings
	 */
	constructor(settings: GoogleChatProviderProps) {
		this.settings = settings;
	}

	/**
	 * Validate required props.
	 *
	 * @return boolean
	 */
	public isValidSettings() {
		return this.settings.webhook_url.length !== 0;
	}

	/**
	 * Send email using Mailgun
	 *
	 * @param payload
	 *
	 * @return Boolean
	 */
	public async send(payload: PayloadRequest): Promise<boolean> {
		const res = await fetch(this.settings.webhook_url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				text: generateMessage(this.settings.text, payload)
			})
		});

		return res.ok
	}
}
