(function (){
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
//.directive('foundItems', FoundItemsDirective)
;
/*
FoundItemsDirective.$inject = [];
function FoundItemsDirective() {
  var ddo = {
    templateURL: 'loader/itemsloaderindicator.template.html',
    scope: {
      found: '=',
      searchTerm: '='
    },
    controller: NarrowItDownController,
    bindToController: true,
    controllerAs: 'myCtrl'
  };
  return ddo;
}
*/
/*
NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
    var menu = this;
    var foundItems = [];
    var searchTerm = "";

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

}*/

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
    var menu = this;
    var searchTerm = "";
    var found = MenuSearchService.getMenuCategories(searchTerm);
    console.log(found);
    //console.log("MenuSearchService.getMenuCategories(searchTerm).$$state.value");
    //console.log(MenuSearchService.getMenuCategories(searchTerm));
}


MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
    var service = this;

    service.getMenuCategories = function (searchTerm) {
      return $http({
              method: "GET",
              url: (ApiBasePath + "/menu_items.json")
            })
      .then(function (response) {
        // process result and only keep items that match
        var foundItems = [];
        for (var i = 0; i < response.data.menu_items.length; i++) {
        var description = response.data.menu_items[i].description;
        if (description.toLowerCase().indexOf(searchTerm) !== -1) {
          foundItems[i] = response.data.menu_items[i];
        }
      }
      // return processed items
      //console.log("foundItems: ");
      console.log(foundItems);
        return foundItems;
    });
    };
 }

})()