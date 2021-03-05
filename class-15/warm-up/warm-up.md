# Warm-Up Exercise
This code sample is written in JavaScript ES6. Read through the code and determine the output for the function.

```
async function fetchThings(url) {

		const result = await fetch(url);
    
		const things = await result.json();
		
		const names = things.map(thing => thing.name);
		
		return names;
}

fetchThings('https://things-api.org/things')
  .then(console.log);
```
