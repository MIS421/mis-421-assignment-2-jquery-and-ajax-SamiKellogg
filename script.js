$(document).ready(function () {
  // Function to call the 'apiSearch' function on the click of the search button
$('#searchButton').click(function () {
    apiSearch();
});

// Function to change the background image on the click of the search engine name
$('header h1').click(function () {
    changeBackgroundImage();
});

// Function to get the current time, load it into the 'time' div, and display it as a dialog window
$('#timeButton').click(function () {
    displayCurrentTime();
});
});

var len;
var results = '';

function apiSearch() {
  var params = {
    "q": $("#query").val(),
    "count": "50",
    "offset": "0",
    "mkt": "en-us"
  };

  $.ajax({
      url: 'sckellogg-421-search-api' + $.param(params),
      beforeSend: function (xhrObj) {
          xhrObj.setRequestHeader("8c6529001b364153aea03b77defe4480", "my-api-key");
      },
      type: "GET",
    })
    .done(function (data) {
      len = data.webPages.value.length;
      for (i = 0; i < len; i++) {
        results += "<p><a href='" + data.webPages.value[i].url + "'>" + data.webPages.value[i].name + "</a>: " + data.webPages.value[i].snippet + "</p>";
      }

      $('#searchResults').html(results);
      $('#searchResults').dialog();
    })
    .fail(function () {
      alert("error");
    });
}

// Function to change the background image
function changeBackgroundImage() {
    $('body').css('background-image', 'url("mcqueen2.jpg")');
}

// Function to get the current time and display it as a dialog window
function displayCurrentTime() {
    const currentTime = new Date();
    const formattedTime = currentTime.getHours() + ':' + (currentTime.getMinutes() < 10 ? '0' : '') + currentTime.getMinutes();
    $('#time').html('Current Time: ' + formattedTime);

    // Display the 'time' div as a jQuery UI dialog window
    $('#time').dialog();
}