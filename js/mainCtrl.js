var app = angular.module('itunes');

app.controller('mainCtrl', function($scope, itunesService){
  $scope.filterOptions = {
        filterText: ''
      };
  $scope.gridOptions = {
      data: 'songData',
      height: '110px',
      filterOptions: $scope.filterOptions,
      columnDefs: [
        {field: 'Genre', displayName: 'Genre'},
        {field: 'Title', displayName: 'Title'},
        {field: 'Artist', displayName: 'Artist'},
        {field: 'TrackTimeMillis', displayName: 'Track Time Millis'},
        {field: 'Lyrics', displayName: 'Lyrics'}
      ]
  };
  $scope.mediaType = "all";
  $scope.showSelectValue = function(selected) {
      $scope.mediaType = selected;
  };
  $scope.getSongData = function() {
    itunesService.getData($scope.artist, $scope.mediaType).then(function(data) {
      $scope.songData = data;
    });
  };

});
