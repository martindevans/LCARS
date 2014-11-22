LCARS
=====

Library Computer Access/Retrieval System
----------------------------------------

Layout and styling framework for making Star Trek style interfaces


### Installing dependancies ###

You will need Nodejs and NPM, these can be found at http://nodejs.org/
Once installed you can have npm install all the other depancies by running the command:

``` bash
npm install
```

This will pull all the other programs needed from a package repository.

Once that is done all you have to do is run

``` bash
npm run gulp
```

This will build all the less and javascript, watch the files for changes, rebuild on change then serve it to the browser

### Dependencies

#### Zepto.js

We are bundling a build of [Zepto.js](https://github.com/madrobby/zepto) which is a compatible subset of jQuery functionality. If you want to use jQuery instead, it should just work<sup>tm</sup>.
 
 ### License
 
 MIT Licensed... but if you build a functioning starship using this system, please consider giving us a ride!