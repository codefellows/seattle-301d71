'use strict';


function Pet(name, owner, favFood, favToy){
  this.name = name;
  this.owner = owner;
  this.favFood = favFood;
  this.favToy = favToy;
  // Pet.allPets.push(this);
}

Pet.prototype.renderWithJustJQuery = function(){
  // 1. get a copy
  const $tr = $('#templates tr').clone();
  $tr.find('td:first-child').text(this.name);
  $tr.find('td:nth-child(2)').text(this.owner);
  $tr.find('td:nth-child(3)').text(this.favFood);
  $tr.find('td:nth-child(4)').text(this.favToy);
  $('body > table').append($tr);
};

Pet.prototype.renderWithJQueryAndMustache = function() {
  //1. get the html from the script tag
  // 2. pass the html and an object to Mustache.render(html, object)
  // 3. append it to the page

  const petTemplateHtmlPotato = $('#mustache-template-tr').html();

  const outputFromMustache = Mustache.render(petTemplateHtmlPotato, this);
  // this === new Pet('Ginger', 'Nich', 'steak', 'ball');

  $('body > table').append(outputFromMustache);
  // css for a table that is a direct child of the body
};

Pet.allPets = [];
Pet.allPets2 = [];


Pet.allPets.push(new Pet('Ginger', 'Nich', 'steak', 'ball'));
Pet.allPets.push(new Pet('Snowdrop', 'Nich', 'tuna', 'catnip'));
Pet.allPets.push(new Pet('Ratcat', 'AJ', 'crunchies', 'banana'));
Pet.allPets2.push(new Pet('Barley', 'Barret', 'Bread', 'Plants'));
Pet.allPets2.push(new Pet('Kobe', 'James S', 'Bison', 'Ropes'));
Pet.allPets2.push(new Pet('Moe', 'Lydia', 'ice cream', 'lazer'));
Pet.allPets2.push(new Pet('Patch', 'Nicholas', 'Ham', 'Sox'));

// Pet.allPets.forEach(pet => pet.renderWithJustJQuery());
Pet.allPets.forEach(pet => pet.renderWithJQueryAndMustache());


// vanilla: create everything from scratch then append it: 12 lines of code
// jQuery: copy everything and change each element line by line: 6 lines of code
// Mustache: copy everything and let Mustache change each element for you: 3 lines of code



// Pagination

// Remove the other elements and add the page 2 elements
// Your data takes 1 million years to be retrieved

$('button:first-of-type').on('click', () => {
  $('body > table tr:nth-child(n+2)').empty();
  Pet.allPets.forEach(pet => pet.renderWithJQueryAndMustache());
});

$('button:nth-of-type(2)').on('click', () => {
  $('body > table tr:nth-child(n+2)').empty();
  Pet.allPets2.forEach(pet => pet.renderWithJQueryAndMustache());

});
