const decodeURIComponent = require('decode-uri-component')

exports.getBody = event =>
	event.isBase64Encoded
		? Buffer.from(event.body, 'base64').toString('ascii')
		: event.body

exports.bodyToObject = body =>
	body.split('&').reduce((acc, part) => {
		const match = part.match(/^(.+?)=(.+?)$/)
		
		if (!match)
			return acc
		
		const [, key, value] = match
		
		return {
			...acc,
			[key]: decodeURIComponent(value)
		}
	}, {})
