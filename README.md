# Send SMS messages with Twilio

This app demonstrates how to send SMS messages with Twilio. It sets up an automated server notification system that can send you SMS alerts if anything goes wrong with your own app.

It's based on [Twilio's Node example](https://github.com/TwilioDevEd/server-notifications-node/tree/master).

![](https://cdn.glitch.com/c9bd27a5-9cbc-4592-8189-45847dfabcdb%2FtwilioSMS.png)

To see this in action, in a new tab go to:
https://twilio-sms.glitch.me/error and with this project open, view the console output posted to 'Logs'. It forces an error, which triggers a text message alert to the admin's email address.

## Getting Started
Having remixed the app, for it to work for you, you need to update the details in the `.env` and `config/administrators.json` files:
- `TWILIO_ACCOUNT_SID` and `TWILIO_AUTH_TOKEN` - available from https://www.twilio.com/user/account/settings
- `TWILIO_NUMBER` - this is the 'From' number, available from https://www.twilio.com/user/account/phone-numbers/incoming
- `phoneNumber` - this is the 'To' number(s). The '+15005550006' value in there is Twilio's Magic number - an example valid number. 

For further instructions, see Twilio's [full tutorial](https://www.twilio.com/docs/tutorials/walkthrough/server-notifications/node/express).