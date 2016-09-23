var koa = require('koa');
var router = require('koa-router');
var bodyParser = require('koa-body');
var jwt = require('koa-jwt');
var cors = require('kcors');

var app = koa();

app.use(cors());

// secret for my JWT Token
var secret = 'HailHydra';


//Set up Pug
var Pug = require('koa-pug');
var pug = new Pug({
  viewPath: './views',
  basedir: './views',
  app: app //Equivalent to app.use(pug)
});

//Set up body parsing middleware
app.use(bodyParser({
    formidable:{uploadDir: './uploads'},
    multipart: true,
    urlencoded: true
}));

var _ = router(); //Instantiate the router

_.get('/login', renderForm);
_.post('/login', handleLogin);
_.get('/message', getRestrictedMessage);

function * renderForm(){
    this.render('form');
}
function * handleForm(){

    if (this.request.body.user === 'Reniery') {
        var claims = {
            userId: 1
        };

        var token = jwt.sign(claims, secret);
        this.status = 200;
        this.body = {token: token};
    }
    
}

function * handleLogin(){

  if (this.request.body.username === 'user') {

    claim = {
      userid: 1
    };
    this.body = {
      token: jwt.sign(claim, secret)
    };

  }
  else {
    this.throw(401, 'Wrong username or password!');
  }
    
}


app.use(jwt({
  secret: secret,
}).unless({ path: [/^\/login/] }));

_.get('/hello', getMessage); // Define routes

function *getMessage(){

    this.render('first_view');
};

function *getRestrictedMessage(){
    var authHeader = (this.request.header.authorization);
    elements = authHeader.split(' ');
    token = elements[1];
    var user = jwt.verify(token, secret);

    if (user.userid == 1) {
        this.body = {
            message: 'Hello World',
            token: user
        };
    } else {
        this.throw(401, 'Wrong username or password!');
    }

};

app.use(_.routes()); 

app.listen(3000);