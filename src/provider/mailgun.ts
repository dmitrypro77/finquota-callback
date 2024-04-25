import { PayloadRequest, Provider } from '../types';
import { Buffer } from 'node:buffer';
import { generateMessage } from '../template';

interface MailgunProviderProps {
	api_key: string
	domain_name: string
	from: string
	to: string
	subject: string
	text: string
}

/**
 * MailgunProvider sends notifications via email.
 */
export class MailgunProvider implements Provider {
	private readonly settings: MailgunProviderProps;

	/**
	 * Mailgun Constructor.
	 *
	 * @param settings
	 */
	constructor(settings: MailgunProviderProps) {
		this.settings = settings;
	}

	/**
	 * Regex to validate email address.
	 *
	 * @param email
	 * @private
	 */
	private isValidEmail(email: string): boolean {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	}

	/**
	 * Validate required props.
	 *
	 * @return boolean
	 */
	public isValidSettings():boolean {
		return this.settings.api_key.length !== 0 && this.isValidEmail(this.settings.from) && this.isValidEmail(this.settings.to);
	}

	/**
	 * Send email using Mailgun
	 *
	 * @param payload
	 *
	 * @return Boolean
	 */
	public async send(payload: PayloadRequest): Promise<boolean> {
		const url = `https://api.mailgun.net/v3/${this.settings.domain_name}/messages`;

		const formData = new FormData();
		formData.append('from', this.settings.from);
		formData.append('to', this.settings.to);
		formData.append('subject', this.settings.subject);
		formData.append('text', generateMessage(this.settings.text, payload));

		const res = await fetch(url, {
			method: 'POST',
			headers: {
				Authorization: `Basic ${Buffer.from(`api:${this.settings.api_key}`).toString('base64')}`,
			},
			body: formData,
		})

		return res.ok
	}
}
