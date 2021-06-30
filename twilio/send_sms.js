require('dotenv').config()

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'BY awesome!',
     from: '+18328624039',
     to: '+12508858981'
   })
  .then(message => console.log(message.sid));
