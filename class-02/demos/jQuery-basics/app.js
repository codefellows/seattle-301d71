'use strict';

// Vanilla Javascript
const firstDiv = document.getElementById('click-me');

firstDiv.addEventListener('click', event => {
  const count = parseInt(event.target.textContent) || 0;
  event.target.textContent = count + 1;
});

const section = document.getElementById('colors');
section.addEventListener('mouseover', handleMouseOver);

function handleMouseOver(event){
  if(event.target.tagName === 'DIV'){
    console.log('thats a div');
    event.target.className = 'red';
  }
}
// With Jquery

const $div2 = $('#click-me2'); // I declare variables holding onto jQuery dom elements with a $ to differentiate them
console.log(firstDiv, $div2); // jquery dom elements are array like, vanilla are just the direct elements so they're different

$div2.on('click', event => {
  const $secondDiv = $(event.target); // event.target is a vanilla js DIV
  // this turns it into jquery;
  const count2 = parseInt($secondDiv.text()) || 0; // calling.text() without arguments retrieves the current text
  $secondDiv.text(count2 + 1);
});

// $('#click-me2').on('click', event => {
//   $(event.target).text(parseInt($(event.target).text()) + 1);
// });

//second
$('#colors2').on('mouseover', 'div', handleJqueryMouseover);

function handleJqueryMouseover(event){
  console.log('worked');
  $(event.target).attr('class', 'red');
}


// Jquery Basics

// Getters : jquery methods that retrieve info from the DOM

// Setters : jqueryMethods that set new data into the DOM

// The methods have the same names

const $title = $('h1');

// getting text;

console.log($title.text());

//setting text

$title.text('I changed this with .text(\'this stuff\')');

// getting an attribute

console.log($title.attr('id'));

//setting an attribute

$title.attr('id', 'snowdrop');

// getting the height

console.log($title.height());

//setting the height

$title.height('500px');


console.log($title.parent());
