# Warm-Up Exercise
This code sample is written in JavaScript and JSX. Read through the code and determine the output for this function.

```javascript
import React, { Component } from 'react';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "Susan Sample",
      age: 27,
      pets: ["Fido", "Mr Whiskers"]
    };
  }

  hadBirthday = () => {
    this.setState({age: this.state.age+1});
  };

  render() {
    return (
      <div>
        <h2>{this.state.name}</h2>
        <h3 onClick={this.hadBirthday}>Current Age: {this.state.age}</h3>
        <h4>Pets</h4>
        <ul>
          {
            this.state.pets.map( (pet) => <li>{pet}</li> )
          }
        </ul>
      </div>
    );
  }
}

export default App;
```
