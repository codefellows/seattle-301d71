// Steps for jQuery: find the element
// make a copy
// find the inner elements (h2) and replace their text in the copy
// put the copy on the page

const $liOriginal = $('li:first-child');
const $liClone = $liOriginal.clone();
$liClone.find('h2').text('Rufus');
$liClone.find('p:nth-child(2)').text('Likes Ginger');
$liClone.find('p:nth-child(3)').text('Loves Yang');
$('ul').append($liClone);

