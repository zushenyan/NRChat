# NRChat
NRChat represents Node React Chat, which is yet another web development practice.

Check [version 1.0 here](https://github.com/zushenyan/NRChat/tree/v1.0);

First version was running Redis as database. However Redis driver in Node will result in callback hell, which makes writing codes painful, so in this version I have changed database to MongoDB since MongoDB & Mongoose make code more readable.

Another improvement in this version is that I made this application act really like an Single Page Application, and to achieve that, I've also rewritten backend in order to take [JWT](https://en.wikipedia.org/wiki/JSON_Web_Token) as its authentication mechanism.

If you want to know more about token vs session based authentication please go [here](http://stackoverflow.com/questions/17000835/token-authentication-vs-cookies) for detail.

# How to Run
Check [NRChat on Heroku](http://nrchat.herokuapp.com/);

Or run it locally:

```bash
$ redis-server
$ clone https://github.com/zushenyan/NRChat.git
$ cd NRChat
$ mongod
$ node server/server
```

And go to `http://localhost:8080`.

# Tools Involved

* HTML
* CSS
  * Bootstrap
* JavaScript
  * Node & Express
  * Babel/ES6
	* Webpack
	* React/Redux/React-Router
* MongoDB
* JSON Web Token
