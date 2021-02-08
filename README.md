# Kalendar

> Develop only the frontend part of the solution, but you are free to use any frontend
framework (SSR is okay as well)

> There should be a month calendar that shows the launch events

> Please do not use existing calendar components but develop your own

> The point above does not apply to other components


> There should be a selector of Agencies (if you have enough time add support for viewing
multiple agencies)


> When the user clicks on a launch event, a countdown (T-time before the launch or T+time
after the launch) should be displayed somewhere on the page


![Kalendar App](https://github.com/RandolphG/Kalendar/blob/master/public/_calendar02.gif?raw=true)


## Install


And then install dependencies with npm.

```bash
$ cd project
$ npm i
$ npm run electron 
```
**Note**: I opted to choose the RapidApi over the suggested 0xample as it was responding with incorrect data. Unfortunately I ran out of time to write the test code.


## Features
- users can choose day to find out if launch is available (wanted to implement redux as time ran out)
- displays agency & date along with title 
- refreshes data every hour
- initial downloaded data gets cached to local storage
- custom CSS
- electron wrapper
- redux
- reselect
