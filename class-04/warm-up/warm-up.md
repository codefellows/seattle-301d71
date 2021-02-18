# Warm-Up Exercise
Read through this code as if you are the interpreter. Find all of the mistakes in this code and write down the correct syntax for each mistake.

## index.html

```
<!DOCTYPE html>
<html>
  <head>
    <title>Click tracker</title>
  </head>
  <body>
    <div id="click">
      <p>Click me</p>
    </div>
    <script src="app.js" />
  </body>
</html>
```

## app.js

```
let counter = 0;
$('#click').on('click', 'p', () => {
  // $(p).on('click', counter++);
  counter++;
})
```
