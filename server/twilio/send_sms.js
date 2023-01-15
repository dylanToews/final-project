require('dotenv').config();

// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

// recipientList = ['+19022926082', '+16475302024']


const sendTwilio = (twilioData) =>{


    client.messages
    .create({
      body: `Hello ${twilioData.contact_name}! This is a message from Startle to inform you that ${twilioData.user_name} has snoozed through their "${twilioData.alarm_name}" alarm. Please use this information to convince ${twilioData.user_name} they need to examine their sleeping habits. `,
      from: process.env.SEND_FROM_NUMBER,
      to: `+1${twilioData.contact_number}`
    })
    .then(message => console.log(message.sid));
  // }
}

module.exports = sendTwilio;

// send(recipientList);