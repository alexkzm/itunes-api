var app = angular.module('itunes');

app.service('itunesService', function($http, $q){
  //This service is what will do the 'heavy lifting' and get our data from the iTunes API.
  //Also note that we're using a 'service' and not a 'factory' so all your methods you want to call in your controller need to be on 'this'.

  //Write a method that accepts an artist's name as the parameter, then makes a 'JSONP' http request to a url that looks like this
  //https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK'
  //Note that in the above line, artist is the parameter being passed in.
  //You can return the http request or you can make your own promise in order to manipulate the data before you resolve it.

  this.getData = function(artist, media) {
    var deferred = $q.defer();
    $http({
      method: 'JSONP',
      url: 'https://itunes.apple.com/search?term=' + artist + '&media='+ media + '&callback=JSON_CALLBACK'
    }).then(function(response) {
      //console.log(response);
      var results = response.data.results;
      var resultsObj =[];
      for(var i = 0; i < 15; i++){
        resultsObj.push({
        Title: results[i].trackName,
        Genre: results[i].primaryGenreName,
        Artist: results[i].artistName,
        Collection: results[i].collectionName,
        CollectionPrice: results[i].collectionPrice,
        TrackTimeMillis: results[i].trackTimeMillis,
        Lyrics: results[i].trackExplicitness,
        SinglePrice: results[i].trackPrice,
        Play: results[i].previewUrl,
        Type: results[i].kind});
      }
      //console.log(resultsObj);
      deferred.resolve(resultsObj);
    });
    return deferred.promise;
  };

});
