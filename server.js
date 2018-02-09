//$npm install express@4.14.0 --save   This installs the express framework for web appendFileSync
const express = require('express');

var app = express();    //initiates express

//retrieves for the path below.
//req stores details about the request
//res is what we decide to send back
app.get('/',(req,res) => {
  //res.send('Hello Ex[press');
      //basically you can send back any object which in turn can be just text or html
  //res.send('<h1>Hello Express </h1>');
  //below we send back an object later in Content-Type this shows as application/json
  res.send({
    name: 'Angelos',
    likes: [
      'Biking',
      'Cities'
    ]
  });


});
//run the app in terminal $nodemon server.js  This tells the program to start in the server
//now if you go to the browser (client) and type localhost:3000 then this client requests, tries to
//retrieve information from the server at the path '/' which is the standard parth of the project
//In chrome developer tools  cmd+option+i in Network you can see a lot of information
//look at the Content-Type within the Response Headers, when you click localhost
//This reads text/html
//Also General => Request Method = GET  and Staus Code : 200 which is OK,success

/*You can set up any handler. Here is another example*/
app.get('/about',(req,res) => {
  res.send('About Page');
});
//Now if the user types localhost:3000/about our app will call the app.get('about')  part

//these are all handlers to treat what the client requests at the address bar
//send back json with error message
app.get('/bad',(req,res) => {
  res.send({
    errorMessage : 'Unable to handle request'
  });
  //if ypu click View Source at the browser you can see the actual JSON
});


//Create a new folder Public where you pplan to place files accessible to anyone
//This is where we will place the static page. Create new file help.html
//Write html for the file

//This tells express to look for a files in that folder. It require full directory
//of the folder. __dirname provides the directory of the current file server.js so we then add  /public
app.use(express.static(__dirname + '/public'));
//This proves how easy it is to serve static pages from a server usign node

//It is important to create a listener otherwise the app will never header
   //app.listen(3000);   //we are using localhost with port 3000 (5000) is another option
//the above will be replaced later on with the server adddress we deploy our app at

//app.listen has an optional second argument, an arrow function that can do something once the server sends
//a response which in some cases can take a while
app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
