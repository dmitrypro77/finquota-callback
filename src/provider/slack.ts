import { PayloadRequest, Provider } from '../types';
import { generateMessage } from '../template';

interface SlackProviderProps {
	webhook_url: string
	text: string
}

/**
 * SlackProvider sends notifications to the Slack App.
 */
export class SlackProvider implements Provider {
	private readonly settings: SlackProviderProps;

	/**
	 * Slack Chat Provider Constructor.
	 *
	 * @param settings
	 */
	constructor(settings: SlackProviderProps) {
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
