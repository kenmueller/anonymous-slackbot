const axios = require('axios').default

const { getBody, bodyToObject } = require('./utils')

exports.default = async event => {
	try {
		const {
			text: message,
			channel_id: channelId
		} = bodyToObject(getBody(event))
		
		if (!message)
			throw new Error('You must specify a message: /say [message]')
		
		await axios.post(
			'https://slack.com/api/chat.postMessage',
			{ channel: channelId, text: message },
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${process.env.SLACK_AUTH_TOKEN}`
				}
			}
		)
		
		return { statusCode: 200 }
	} catch (error) {
		return {
			statusCode: 200,
			body: error.message
		}
	}
}
