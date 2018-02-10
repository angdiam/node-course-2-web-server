//$npm install express@4.14.0 --save   This installs the express framework for web appendFileSync
const express = require('express');
const fs = require('fs');

//DONE for setting up port for HEROKU
const port = process.env.PORT || 3000;
//now replace 3000 in the listener with port


var app = express();    //initiates express

//*** Added when we talk about Templating and Handlebars view engine further down
const hbs = require('hbs');
//set the partials folder for hbs
hbs.registerPartials(__dirname + '/views/partials');
//set the view engine to handle bars
app.set('view engine','hbs');
//Helper functions  to replace functions inside html
hbs.registerHelper('getCurrentYear',() => {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text) => {
  return text.toUpperCase();
})
//***



/*EXPRESS MIDDLEWARE from further down
It is important that your middleware is placed before any get methods*/
app.use((req,res,next) => {
    //this (req,res) is not any different to the one you have below with get
    //req holds a ton of information about the request from client's browser
    //e.g. http method, path requested, parameters
    //more infomration can be found at express.js > API > request
    //we will create a logger of all the requests that come to the server
    var now = new Date().toString();
    var log = `${now}  Method: ${req.method}  URL: ${req.url}`;
    fs.appendFile('server.log',log + '\n',(err) => {
      if (err) {
        console.log('Can not append to the file');
      }
    })
    console.log(log);
    next();  //This tells express that the middleware is doen here and can move on.
    //if next() is not called the application will not proceed
});


// app.use((req,res,next) => {
//   res.render('maintenance.hbs');
//   //since we are callign maintenance.hbs but there is not next() after that the app will stop here
//   //at this middleware. However pay attention where this middleware is placed.
//   //anything below indeed will not run,
//   //but the /help would run if you had
//   //app.use(express.static(__dirname + '/public')); further up. So move it below
// });

//EXPRESS MIDDLEWARE from further down




//retrieves for the path below.
//req stores details about the request
//res is what we decide to send back
/*
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
*/
//run the app in terminal $nodemon server.js  This tells the program to start in the server
//now if you go to the browser (client) and type localhost:3000 then this client requests, tries to
//retrieve information from the server at the path '/' which is the standard parth of the project
//In chrome developer tools  cmd+option+i in Network you can see a lot of information
//look at the Content-Type within the Response Headers, when you click localhost
//This reads text/html
//Also General => Request Method = GET  and Staus Code : 200 which is OK,success

/*You can set up any handler. Here is another example*/
app.get('/aboutt',(req,res) => {
  res.send('Aboutt Page');
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


//TEMPLATE ENGINE HANDLE BARS
/*We want to have the html file being dynamic, meaning that we can pass values to be shown
For this reason we will install a library called handle bars view engine which has a moustache
npmjs.com/packages/handle bars to read the documentation
handlebarsjs.com is the website but we use the module in npm
$npm install hbs@4.0.0 --save
The following line need to be added at the top of the file above app.get()
const hbs = require('hbs');
Create a views folder which ic the default folder express uses to find yoyr templates
Create a new file about.hbs which is called a template
Copy Paste the html from the help.html
Now This
app.get('/about',(req,res) => {
  res.send('About Page');
});
can be re-written with res.render which passes the template file and one object the values of
which we can read from within the hbs-html file
*/
app.get('/about',(req,res) => {
  res.render('about.hbs',{
    pageTitle: 'About Ang Page',
    currentYear: new Date().getFullYear()
  });
});

app.get('/',(req,res) => {
  res.render('home.hbs',{
    pageTitle: 'Home Page',
    // currentYear: new Date().getFullYear(),
    welcomeMessage: 'Welcome to my website'
  })
});
//PARTIALS We want to use partials. Partials are a block of code that is repeated in hbs files and in order to not
//repeat it we create what we call a partial which we write once and use anywhere
//for example we will replace the footer part of the html code inside about.hbs
//create a folder partials within the view folder
//Now before app.set('view engine','hbs'); type
//hbs.registerPartials(__dirname + '/views/partials');
//copy the footer part of about.hbs and paste it inside the footer.hbs inside the partials folder.
//Now in the about.hbs replace th footer block with {{> footer}}
//similarly you can create the header and add some links using anchors <a></a>
//IMPORTANT:   $nodemon will not see the hbs file extensions so type
//$nodemon server.js -e js,hbs
//HELPER functions of handlebars
//You set helper functions in handlebars after you regisrerPartials and set the view ENGINE
//hbs.registerHelper('functionname',() => {});


//EXPRESS MIDDLEWARE
//If express does not do something you would like to do you can extend it by writing an express middleware
//Here is an example to be placed  after    app.set('view engine','hbs');
//CODED IS ADDED AT TEH TOP BECAUSE IT NEEDS TO BE PLACED BEFORE ANY GET METHODS




//It is important to create a listener otherwise the app will never header
   //app.listen(3000);   //we are using localhost with port 3000 (5000) is another option
//the above will be replaced later on with the server adddress we deploy our app at

//app.listen has an optional second argument, an arrow function that can do something once the server sends
//a response which in some cases can take a while
  // app.listen(3000, () => {
  //   console.log('Server is up on port 3000');
  // });

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
