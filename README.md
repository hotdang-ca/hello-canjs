# Hello CanJS!

## What is this?
I'm learning [CanJS](https://canjs.com/). It's like a lighter-weight Angular. They have a [CRUD tutorial](https://canjs.com/doc/guides/crud-beginner.html), but requires access to a very large fixture that doesn't load quickly enough, and changes only happen in a CodePen. I wanted to try things locally, so here we are.

## Getting Started
`npm install`, and then:

`npm run start:dev` which will:
 1. run `npm run styles` which will compile the less into css
 1. run `npm run serve` which will start a simple webserver to serve up index.html
 1. run `npm run api:dev` which will start the express API and listen for code changes

Other scripts available are `npm run api`, which would be used to just run the API independent of the

## Author
The folk at [CanJS](https://canjs.com/) essentially provided the code (which I wrote by following along), I just wrote a small API to provide the backend rather than using theirs.