import { PayloadRequest } from './types';

/**
 * Generate Message from defined template and payload.
 *
 * @param template
 * @param payload
 * @return string
 */
export function generateMessage( template: string, payload: PayloadRequest): string {
	const replaceMap: { [key: string]: string } = {
		'{%ticker%}': payload.ticker,
		'{%close%}': String(payload.close),
		'{%signal%}': payload.is_buy_signal ? 'BUY' : payload.is_sell_signal ? 'SELL' : '',
		'{%stopSignal%}': payload.is_stop_signal ? 'Yes' : 'No',
		'{%strategyName%}': payload.strategy.name,
		'{%timestamp%}': payload.timestamp
	};

	let formattedTemplate = template;
	for (const [key, value] of Object.entries(replaceMap)) {
		formattedTemplate = formattedTemplate.replaceAll(key, value);
	}

	return formattedTemplate;
}
