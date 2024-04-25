# FinQuotaCallback
The [Cloudflare Worker](https://developers.cloudflare.com/workers/), which you can use as a callback URL within [Finquota](https://finquota.com/), to send notifications about your stock strategy updates via your preferred service provider.

Whenever you create a new strategy on [Finquota.com](https://finquota.com), you can specify a new worker as a callback and receive notifications about your buy/sell events using your preferred service. You can technically extend this worker to bind [Cloudflare D1](https://developers.cloudflare.com/d1/) serverless SQL databases and store these events or bind [KV](https://developers.cloudflare.com/kv/) or [R2 storage](https://developers.cloudflare.com/r2/) storage.

<img src="https://pub-b46b59b5efc545d4861d7e67a6958e98.r2.dev/strategy.png" height="200" alt="New Strategy Finquota">

This tool might help with forward testing ("real-time") your stock trading strategy and analyzing profits and losses before actually buying or selling anything.

### List of Supported Providers
| Provider                                | Notification Type | Description                                            | Env Variables                                                                                                                                                                               |
|-----------------------------------------|-------------------|--------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [Mailgun](https://mailgun.com/)         | Email             | Mailgun Service Provider to send emails notifications. | 	<code>MAILGUN_API_KEY = "your_mailgun_api_key"<br>MAILGUN_DOMAIN = "test.com"<br>MAILGUN_FROM = "from@test.com"<br>MAILGUN_TO = "me@test.com"<br>MAILGUN_SUBJECT = "Trading Update"</code> |
| [Slack](https://slack.com/)             | App Notification  | Slack Webhook message notifications.                   | 	<code>WEBHOOK_URL = "your_webhook_url"</code>	                                                                                                                                             |
| [Google Chat](https://chat.google.com/) | App Notification  | Google Chat Webhook message notifications.             | 	<code>WEBHOOK_URL = "your_webhook_url"</code>                                                                                                                                              |

### Deployment
- Update `wrangler.toml` with env variables depending on your preferred provider (or use "secret" variables).
- Run `yarn deploy`
- Done!

* ### How to Find a Callback URL?
You can find callback url in your Cloudflare dashboard account: `Worker & Pages > Your Worker > Settings > Triggers > Routes`.

### Run Locally
- Update `wrangler.toml` file with config settings.
- Run `yarn install`
- Run `yarn dev`

### Test
- Run `yarn test` to run tests locally

### Disclaimer
Developed for **educational purposes only**, and please do not buy or sell anything unless you have tested it well and understand the risks.
