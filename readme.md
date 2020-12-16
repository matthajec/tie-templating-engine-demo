# Templating Engine Demo
## Description
This is a demo of my templating engine, tie (terrible insecure engine). It has some securit vulnerabilities, namely allowing users to run server-side code. Never use this. 

## Starting
To start the application, use ```npm i``` to download the modules, then run ```npm start```

# Usage
## Using functions:
Enclose any function within $()$ to run it. Whatever is returned from the function is displayed on the screen. Never allow any user inputted information in here, as they could escape your function and run server side code.
### Example:
This example will return the text '2' (the result of ```1+1```) into the generated HTML
```
$(1 + 1)$
```
```
Expected Output: 2
```

## Displaying values:
To pass a value into a .tie file first add it to the options parameter in ```express().render```, then use #(```key of your value here```)#

### Example:
This example will return the text 'greeting' into the generated HTML
```javascript
  app.get('/', function (req, res) {
    res.render('index', { greeting: 'Hello!' })
  })
```
```html
#(greeting)#
```

## Using options values inside of functions:
It is possible to nest #(```key of your value here```)# inside of a function ($(```your function here```)$) to use values from express in your functions

## Example
This example will generated 2 random numbers from the express side and use them in a function within the .tie file.
It simulates 2 6-sided dice rolls, if they are equal then it outputs ```'double'```, if not it outputs ```'not double'```
```javascript
  app.get('/', function (req, res) {
    res.render('index', { num1: Math.floor(Math.random() * 6) + 1, num2: Math.floor(Math.random() * 6) + 1 })
  })
```
```html
  $(#(num1)# === #(num2)# ? 'double' : 'not double')$
```
