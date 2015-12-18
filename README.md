# NRChat
NRChat represents Node React Chat, which is yet another web development practice.

# How to Run
Visit [NRChat on Heroku](http://nrchat.herokuapp.com).

Or run it locally:

```bash
$ redis-server
$ clone https://github.com/zushenyan/NRChat.git
$ cd NRChat
$ node server/server
```

And go to `http://localhost:8080` with any browser you like.

# Tools Involved

* HTML
* CSS
  * Bootstrap
* JavaScript
  * Node & Express
  * Babel/ES6
  * Webpack
  * Gulp
  * React
  * Redux
  * and tons of libs...
* Redis
* Heroku

# Behind The Scene
Originally I wanted to create an practice application with user authentication, but latter on, I cancelled this feature after thinking on some points.

First, I realized **user authentication** is actually not an easy topic. Dealing with authentication involves lots of problems

* How do I tell client failure message if the user failed on login after a page is loaded?
* How do I transit user information from server to client? Through template, flash message or RESTful API?
* What if I want it to support OAuth?
* How do I integrate additional user informations from 3rd party? What if it's only an local authentication?
* Is there a way to login/logout/signup without redirect?
* What's the best practice on session maintance? Should I keep session data in memory or database? How about session sharing?
* When it comes to store of user informations, which database is better?
* ...and blah blah blah you name it.

Second, what I really expected to learn are

* Get familiar with Node & Express.
* ~~Claim I can do NoSQL because I barely know SQL~~ Get familiar with NoSQL like Redis.
* Let site available on the Web through Heroku.
* A more close to real world application of React.
* How good is Redux? How does it differ from Flux?
* Have an overview of [Web Component](https://en.wikipedia.org/wiki/Web_Components) and SPA site development.
* Webpack seems kind of cool. Should give it a try.

Although I already did a simple but ugly local user authentication with [Passport](http://passportjs.org/) and Redis (gist [here](https://gist.github.com/zushenyan/43e8aaa23ca2983949a3), in case of future need), I decided to dispose it, simply because it made the whole practice **gone wild**. It would be really a mass if I don't stop here. If I want to practice doing user authentication I should really start a new one.

Story ends. That's it.
