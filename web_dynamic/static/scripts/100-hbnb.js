const $ = window.$;

$(document).ready(function () {
  // checkbox amenities
  const mydict = {};
  $('.amenities input[type="checkbox"]').click(function () {
    if ($(this).prop('checked') === true) {
      mydict[$(this).attr('data-id')] = $(this).attr('data-name');
    } else if ($(this).prop('checked') === false) {
      delete mydict[$(this).attr('data-id')];
    }
    const mylist = [];
    for (const a in mydict) {
      mylist.push(mydict[a]);
    }
    $('.amenities h4').text(mylist.join(', '));
  });

  // checkbox states
  const mydictSta = {};
  $('.locations .state_filter input[type="checkbox"]').click(function () {
    if ($(this).prop('checked') === true) {
      mydictSta[$(this).attr('data-id')] = $(this).attr('data-name');
    } else if ($(this).prop('checked') === false) {
      delete mydictSta[$(this).attr('data-id')];
    }
    const mylist = [];
    for (const a in mydictSta) {
      mylist.push(mydictSta[a]);
    }
    $('.locations h4').text(mylist.join(', '));
  });

  // checkbox city
  const mydictCity = {};
  $('.locations .city_filter input[type="checkbox"]').click(function () {
    if ($(this).prop('checked') === true) {
      mydictCity[$(this).attr('data-id')] = $(this).attr('data-name');
    } else if ($(this).prop('checked') === false) {
      delete mydictCity[$(this).attr('data-id')];
    }
    const mylist = [];
    for (const a in mydictCity) {
      mylist.push(mydictCity[a]);
    }
    $('.locations h4').text(mylist.join(', '));
  });

  const apiUrl = 'http://0.0.0.0:5001/api/v1/status/';
  $.get(apiUrl, function (resp) {
    if (resp.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });

  const api2Url = 'http://0.0.0.0:5001/api/v1/places_search/';
  $.ajax({
    url: api2Url,
    type: 'POST',
    data: JSON.stringify({}),
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    success: function (places, status) {
      $.each(places, function (i, place) {
        $('.places').append(
          $('<article>')
            .append(
              $('<div>').addClass('title')
                .append(
                  $('<h2>').text(places[i].name),
                  $('<div>').text(places[i].price_by_night).addClass('price_by_night')
                ),
              $('<div>').addClass('information')
                .append(
                  $('<div>').addClass('max_guest')
                    .append(
                      $('<i>').addClass('fa fa-users fa-3x'),
                      ('<br />'),
                      (places[i].max_guest + 'Guests')
                    )
                )
                .append(
                  $('<div>').addClass('number_rooms')
                    .append(
                      $('<i>').addClass('fa fa-bed fa-3x'),
                      ('<br />'),
                      (places[i].number_rooms + 'Bedrooms')
                    )
                )
                .append(
                  $('<div>').addClass('number_bathrooms')
                    .append(
                      $('<i>').addClass('fa fa-bath fa-3x'),
                      ('<br />'),
                      (places[i].number_bathrooms + 'Bathroom')
                    )
                ),
              $('<div>').addClass('description')
                .append(
                  (places[i].description)
                )
            )
        );
      });
    }
  });

  $('button').click(function () {
    $('.places article').remove();
    $.ajax({
      url: api2Url,
      type: 'POST',
      data: JSON.stringify({ amenities: Object.keys(mydict), cities: Object.keys(mydictCity), states: Object.keys(mydictSta) }),
      dataType: 'json',
      contentType: 'application/json; charset=utf-8',
      success: function (places, status) {
        console.log(places);
        $.each(places, function (i, place) {
          $('.places').append(
            $('<article>')
              .append(
                $('<div>').addClass('title')
                  .append(
                    $('<h2>').text(places[i].name),
                    $('<div>').text(places[i].price_by_night).addClass('price_by_night')
                  ),
                $('<div>').addClass('information')
                  .append(
                    $('<div>').addClass('max_guest')
                      .append(
                        $('<i>').addClass('fa fa-users fa-3x'),
                        ('<br />'),
                        (places[i].max_guest + 'Guests')
                      )
                  )
                  .append(
                    $('<div>').addClass('number_rooms')
                      .append(
                        $('<i>').addClass('fa fa-bed fa-3x'),
                        ('<br />'),
                        (places[i].number_rooms + 'Bedrooms')
                      )
                  )
                  .append(
                    $('<div>').addClass('number_bathrooms')
                      .append(
                        $('<i>').addClass('fa fa-bath fa-3x'),
                        ('<br />'),
                        (places[i].number_bathrooms + 'Bathroom')
                      )
                  ),
                $('<div>').addClass('description')
                  .append(
                    (places[i].description)
                  )
              )
          );
        });
      }
    });
  });
});
