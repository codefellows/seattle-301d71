const pageOneArray = []; // creating an empty array called pageOneArray
const pageTwoArray = []; // declare a  const page2Array and set it as an empty array.
// declare a  const page2Array and  it gets as an empty array.

function HornsPicture(desc, horns, url, keyword, title) {
  // declaring constructor called HornsPicture that takes in 5 parameters ...
  this.description = desc;
  this.horns = horns;
  this.url = url;
  this.keyword = keyword;
  this.title = title;
  // ... and setting those parameters as key value pairs on the constructed obj
  HornsPicture.allHornsPics.push(this);
  // pushing this into HornsPicture.allHornsPics
  // Access HornsPicture.allHornsPics and push into it this
}
HornsPicture.allHornsPics = [];

console.log(HornsPicture.allHornsPics);


function renderWithMustache () { // declaring a function renderWithMustache
  HornsPicture.allHornsPics.forEach( value => {
    //accessing every object in the list allHornsPics and doing a forEach and passing it an arrow function that takes in parameter of value
    const divHtmlElement = $('#template').html();
    //declaring const divHtmlElement and initializing it with using Jquery to retrieve the element with the id of #template and specifically retrieving the html()

    const outputFromMustache = Mustache.render(divHtmlElement, value);

    $('main').append(outputFromMustache);
  });
}


