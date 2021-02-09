# Kalendar 


![Kalendar App](https://github.com/RandolphG/Kalendar/blob/master/public/_calendar06.gif?raw=true)


##react calendar app (electron)

### Installation process :

- clone repo
- navigate to project folder
- install all dependencies with npm
- run electron with npm 


```bash
$ git clone https://github.com/RandolphG/Kalendar.git
$ cd project
$ npm i
$ npm run electron 
```
## Features
- choose day to find available launches 
- displays agency & date along with title 
- refreshes data every hour
- initial downloaded data gets cached to local storage
- custom CSS
- electron wrapper
- redux
- reselect
- framer-motion

### requirements ( **Note**: Api was incomplete )

- Develop only the frontend part of the solution.
- The month calendar shows the launch events
- No use of existing calendar component
- The point above does not apply to other components
- Include  a selector of Agencies (add support for viewing multiple agencies)
- Add support for viewing multiple agencies
- Clicks on a launch event, shows  countdown
- (T-Minus before & after launch) should be displayed 
