# Custom minimal website framework

## Some websites need to be tailored for the end user.
Sometimes, you need to make a website for a specific purpose, a specific client, or a specific workflow. 
There are two possible solutions that come to mind:

Install and use the work-flow of a content management system.

or...

Use a MVC web framework like django, flask, or rails.

A CMS is nice, because it provides two key functionalities:

1. It can get content (text, images) from the end user.
2. It can show the content on a webpage.

A CMS handles all the routing, model binding, permissions, and etc.

However, by choosing a CMS, we sacrifice a lot of control to the implementation of our system. 

What if the end user wants a custom, propitiatory method of submitting content? What if the content is some custom entity (a URL to another service, a text file with a specific format, output from an application) that the CMS does not recognize? You then must write a custom plugin for the CMS that fulfills this functionality. What if the user requires another method of communicating with the server, other than browser forms? You must hope that a plugin has been developed or develop one yourself.

A CMS also has the downside of providing too many features for the user. If you want to tailor the user's experience, then you want to avoid having the user jump through hoops to use their product.

## Enter DesCMSAPI

The goal for this framework is to be as simple as possible, while allowing the most configurability possible.

The framework will provide key features (basic authentication, basic JSON model with date, title, and body fields, and a basic, RESTful API for GETting and PUTting content to the server.

The framework will use [AngularJS], [mongoDB], and [node.js]. These libraries all deal with javascript / json in one way or another, and will allow the definition and binding of models to be as clean and transparent as possible.

Custom controllers can be rapidly implemented on the AngularJS client, faster than configuring settings on a content management system's front end interface.

Overall, the default implementation should allow for the most straightforward and intutitive configuration by developers as possible. Configuration settings include:

1. All the default routes (for the authentication system, the API, and the secure API) .
2. Path to the mongodb server
3. Implementation of the function that does the actual authentication.
4. Default methods to call before / after every API request.
5. The model definition, as well as functions that the server calls to format the JSON model for api method. (e.g., processing a received model before persisting it to the database, processing a database model before giving it to the client).

The AngularJS front-end will also have a similar design, where configuration and extension will be straightforward and intutitive for most developers.

Currently, this core of this framework is intended to be very simple, and very easy to use. Eventually, we would like an easy way to extend this framework, to add new features. All for the purpose of tailoring the web server / client for maximum end user and developer satisfaction.

[angularjs]: http://angularjs.org/
[mongodb]: http://mongodb.org/
[node.js]: http://nodejs.org/
