'use strict';

//TODO: filtering




function DogPic(name, url, description) {
  this.name = name;
  this.url = url;
  this.description = description;
  DogPic.allDogPics.push(this);
}
DogPic.allDogPics = [];

// new DogPic('scooby', 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/Scooby-gang-1969.jpg/250px-Scooby-gang-1969.jpg', 'scooby dooing');
// new DogPic('scrappy', 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/Scooby-gang-1969.jpg/250px-Scooby-gang-1969.jpg', 'scrappy dooing');
// new DogPic('clifford', 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/Scooby-gang-1969.jpg/250px-Scooby-gang-1969.jpg', 'cliffording');
// new DogPic('ginger', 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/Scooby-gang-1969.jpg/250px-Scooby-gang-1969.jpg', 'ginger is cool and likes scooby dooing');
// new DogPic('molly', 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/Scooby-gang-1969.jpg/250px-Scooby-gang-1969.jpg', 'molly is cool');


DogPic.prototype.renderDog = function(){
  // When we render with Jquery, we can use templates
  // we can use pre-existing pieces of the page to build similar pieces.

  //1. copy an existing element
  const $liCopy = $('li:first-child').clone();
  // $liCopy.children()[0].textContent ='Hotdog';
  $liCopy.find('h2').text(this.name);
  $liCopy.find('p').text(this.description);
  $liCopy.find('img').attr('src', this.url);
  console.log(this);
  $('ul').append($liCopy);
};




$.ajax('data.json').then(callbackThatHandlesTheStuffThatComesBack);

function callbackThatHandlesTheStuffThatComesBack(stuffThatComesBackPotato) {
  console.log(stuffThatComesBackPotato);

  stuffThatComesBackPotato.forEach(dogJsonObject => {
    new DogPic(dogJsonObject.name, dogJsonObject.image_url, dogJsonObject.hobbies);
  });

  DogPic.allDogPics.forEach(dogPic => dogPic.renderDog());

}

$('button:nth-of-type(1)').on('click', handleClickingOnOdieButton);
$('button:nth-of-type(2)').on('click', handleClickingOnCliffordButton);

function handleClickingOnOdieButton(){
  // Hide and show way: hide all and then show some : HTML focused
  $('li').hide();
  // $('li:first-child').show();
  //find the one that contains 'Odie'
  $('li:contains(Odie)').show();
}

function handleClickingOnCliffordButton(){
  //  TODO: find the object with name clifford: JS/DATA focused
  //delete and then rerender
  $('ul').empty();
  DogPic.allDogPics.forEach(dogPic => {
    if(dogPic.name === 'Clifford'){
      dogPic.renderDog();
    }
  });
}


