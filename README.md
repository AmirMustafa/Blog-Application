[![MEAN.JS Logo](http://meanjs.org/img/logo-small.png)](http://mean.io/#!/)

# Blog Application

Blog Application  Project is developed in End to End JavaScript. The technologies used are MongoDB, Express JS, Angular JS and Node JS (i.e. MEAN Stack). So basically in this project firstly there is admin and multiple users.  Sign Up the form to create the user. For the first user change roles in MongoDB from user to admin and you can create user similarly.
User has facility to Create, Read, Update and Delete the Blog. Once the blog is created it will display in the general user (i.e. signed out case) once approved by the Admin.
Admin has facility to approve , reject the blog. The general user can comment on individual blog. Once again Admin can approve or reject the comment. Websockets are used to give instant messages to the user or admin  as per changes made. Messages are used to show by using growl concept.
Front End Development is done on Angular JS, Back End in Node JS and Express JS and Database used is MongoDB.

## Requirements

- [Node and npm](http://nodejs.org)
- [Express] (http://expressjs.com/)
- MongoDB: Make sure you have your own local or remote MongoDB database URI configured in `config/database.js`

## Installation

1. Clone the repository
2. Install the application: `npm install`
3. Install the bower components: `bower install`
3. Place your own MongoDB URI in `config/database.js` 
4. Run `mongod` in the Terminal at Root Level of your Installed Directory of MongoDB
3. Start the server: `node server.js`	
4. Run `grunt / grunt --force` in Terminal in this Cloned Project Path 
4. View in browser at `http://localhost:3000`

##Looks

![Screenshot of Blog Application](https://cloud.githubusercontent.com/assets/15896579/18242134/6e4d51fc-7372-11e6-90fe-7d08fa573755.PNG?raw=true "Screenshot of Tredfashion Websites")
<br/><br/><br/>

![Screenshot of Blog Application](https://cloud.githubusercontent.com/assets/15896579/18242132/6e48c09c-7372-11e6-8f66-f792b6dd75ac.PNG?raw=true "Screenshot of Tredfashion Websites")
<br/><br/><br/>

![Screenshot of Blog Application](https://cloud.githubusercontent.com/assets/15896579/18242135/6e4ee152-7372-11e6-8814-d87adb1c23c4.PNG?raw=true "Screenshot of Tredfashion Websites")
<br/><br/><br/>

![Screenshot of Blog Application](https://cloud.githubusercontent.com/assets/15896579/18242131/6e42ebd6-7372-11e6-8429-68331108ed34.PNG?raw=true "Screenshot of Tredfashion Websites")
<br/><br/><br/>

![Screenshot of Blog Application](https://cloud.githubusercontent.com/assets/15896579/18242133/6e4bafb4-7372-11e6-93c1-a6966e04b61d.PNG?raw=true "Screenshot of Tredfashion Websites")
<br/><br/><br/>


## License

(The MIT License)

Copyright (c) 2016 Amir Mustafa

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
