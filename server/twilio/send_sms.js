require('dotenv').config();

// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

recipientList = ['+19022926082', '+16475302024']


const sendTwilio = (numberArray) =>{
  console.log("send message to", numberArray)
  // for(recipient of numberArray){
    client.messages
    .create({
      body: 'I like eggs',
      from: process.env.SEND_FROM_NUMBER,
      to: numberArray
    })
    .then(message => console.log(message.sid));
  // }
}

module.exports = sendTwilio;

// send(recipientList);