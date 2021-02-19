'use strict';

$('form').on('submit', handleRequestingCityData);

function handleRequestingCityData(event){
  event.preventDefault();
  const cityWeWantToSearch = $('input:first-of-type').val();
  console.log(cityWeWantToSearch);

  const settings ={
    data: {city : cityWeWantToSearch}
  };

  $.ajax('fake-data/location.json', settings)
    .then(whateverComesBack => {
      console.log(whateverComesBack);
      const object ={
        city: whateverComesBack.search_query,
        address: whateverComesBack.formatted_query,
        image_src: `map.png?lat=${whateverComesBack.latitude}&lon=${whateverComesBack.longitude}`
      };

      const html = $('#templates').html();
      const outputHtml = Mustache.render(html, object);
      $('article').append(outputHtml);

      const restaurantSettings = {
        data: whateverComesBack
      };
      $.ajax('./fake-data/restaurants.json', restaurantSettings)
        .then(restaurantsThatComeBack => {
          console.log(restaurantsThatComeBack);
          $('article').append(JSON.stringify(restaurantsThatComeBack));
        });
    });



/*
    {
  "id": 1,
  "search_query": "seattle",
  "formatted_query": "Seattle, WA, USA",
  "latitude": "47.606210",
  "longitude": "-122.332071",
  "created_at": null
}
script id="templates" type="text/x-tmpl-mustache">
    <h2>{{city}}</h2>
    <img src="{{image_src}}" alt="">
    <p>{{address}}</p>
  </script>
*/
}
