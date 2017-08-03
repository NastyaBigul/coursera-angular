(function (){
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', ListItemDescription)
;

//FoundItemsDirective.$inject = [];
function ListItemDescription() {
  var ddo = {
    scope: {
      //ctrl: '=found',
      //search: '@search'
      //myMethod: '&method'
      foundItems:
    },/*
    templateUrl: 'itemsloaderindicator.html',
    controller: NarrowItDownController,
    bindToController: true,
    controllerAs: 'myCtrl'*/
    template: '({{ category.id }}) {{ category.name }}'
  };
  return ddo;
}


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
    var menu = this;
    var foundItems = [];
    var searchTerm = "";
    //menu.search = "";
    //menu.check = function(searchTerm) {
      console.log("searchTerm: "+searchTerm);

      var promise = MenuSearchService.getMenuCategories();

      promise.then(function (response) {
        // process result and only keep items that match
      for (var i = 0; i < response.data.menu_items.length; i++) {
        var description = response.data.menu_items[i].description;
        if (description.toLowerCase().indexOf(searchTerm) !== -1) {
          foundItems[i] = response.data.menu_items[i];
        }
      }
      menu.categories = foundItems;
      // return processed items
      console.log("foundItems: ");
      console.log(foundItems);
      });
  //};
    
}


MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
    var service = this;

    service.getMenuCategories = function () {
      var response = $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json")
      });

      console.log(response);
      return response;
    };

}
})()