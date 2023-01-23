!["Startle Description/About Page"](https://github.com/dylanToews/final-project/blob/main/docs/Startle-About.png?raw=true)

Startle was built by full stack developers Cheever Esler, Ryan Zhen and Dylan Toews while enrolled in the Web Development Bootcamp at Lighthouse Labs. 


This application was built using an Express.js backend, with React for the front-end, Postgress for the database and makes use of the Twilio API.

The motivation for building this project was to create an alarm application that gives a user the ability to easily record their own audio for an alarm, and have notifications go off through text messages if the user has snoozed through their alarm

!["Main Page"](https://github.com/dylanToews/final-project/blob/main/docs/Startle-Home.png?raw=true)

With Startle, the user is able to set an alarm and choose both the custom sound that they would like for their alarm, as well as the contact that they would like to have messaged in the event of snoozing. 

INSERT SET ALARM IMAGE
!["Set Alarm Image"](https://github.com/dylanToews/final-project/blob/main/docs/Startle-SetAlarm.png?raw=true)

Once the alarm has gone off, the users audio will be played on a loop until they either "Accept" or "Snooze" the alarm. If "Snooze" has been selected, an SMS message will be sent to their contact and the alarm will go off again in 5 minutes. 

!["Alarm Notification"](https://github.com/dylanToews/final-project/blob/main/docs/Startle-Notification.png?raw=true)
---------
!["Text Message Example"](https://github.com/dylanToews/final-project/blob/main/docs/Startle-Text.png?raw=true)
By going to the Sounds page, the user is able to record and name their own audio to be used as an alarm tone.

INSERT SOUND PAGE IMAGE 
!["Sound Recording Page"](https://github.com/dylanToews/final-project/blob/main/docs/Startle-Sound.png?raw=true)

The next step in development at Startle is to transition to React Native for mobile development. We would also like to add in the ability for users to create customizable messages for their alarm text notifications. One of the challenges we faced was recording the sound on the front end of the application, and turning the audio files into data that could be stored and brought up from the backend. Other planned features include setting recurring alarms for days of the week, and assigning multiple contacts to a single alarm for events that involve more than two people.

This project taught us a lot - from MediaElements to Sets, from React Context to complex SQL queries - but most of all it taught us that the sound of your own voice yelling at you is a great motivator to get out of bed in the morning.

*** Startle is currently running on a trial Twilio account, which only allows for approved number to be added for contacts. Please contact the development team for more information ***


------------------

Steps to Run

------------------

Clone the project 

```git clone "INSERT CLONE LINK"```

Install dependencies

```npm install``` 

Set Up .env

```Use env.example information for .env```

Set Up Database: 

```psql```

```SET ROLE labber;```

```CREATE DATABASE finals;``` 

```npm run db:reset```


Start Server

```cd server```

```nodemon```

(server should start on port 8080)


-------------------

Start Client

```cd client```

```npm start```

(client should start on port 3000)


------------------

Our Team: 

Cheever Esler - https://www.linkedin.com/in/cheever-esler/

Ryan Zhen - https://www.linkedin.com/in/ryanzhen/

Dylan Toews - https://www.linkedin.com/in/dylan-toews-b4752925a/



------------------

Resources and References Used:

Alarm clock example:

https://reactjsexample.com/alarm-clock-in-react/

CSS for audio recorder button:

https://www.youtube.com/watch?v=B3wWIsNHPk4&ab_channel=Stephino

code base for audio recording:

https://github.com/jleonardo007/voice-recorder-example

Twilio requests:

https://www.twilio.com/docs/usage/requests-to-twilio


