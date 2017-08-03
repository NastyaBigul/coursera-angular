(function (){
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.factory('MenuSearchFactory', MenuSearchFactory)
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
      items: '<'
    },/*
    templateUrl: 'itemsloaderindicator.html',*/
    controller: NarrowItDownController,
    bindToController: true,
    controllerAs: 'myCtrl',
    template: '({{ category.id }}) {{ category.name }}'
  };
  return ddo;
}


NarrowItDownController.$inject = ['MenuSearchFactory'];
function NarrowItDownController(MenuSearchFactory) {
  var menu = this;

  var menuList = MenuSearchFactory();

  menu.items = menuList.getItems();
  menu.searchTerm = "";

  menu.getMenuCategories = function () {
    menuList.getMenuCategories(menu.searchTerm);
  };
    
}


MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;
  
  var foundItems = [];

  service.getMenuCategories = function (searchTerm) {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    })
    .then(function (response) {
        // process result and only keep items that match
      for (var i = 0; i < response.data.menu_items.length; i++) {
        var description = response.data.menu_items[i].description;
        if (description.toLowerCase().indexOf(searchTerm) !== -1) {
          foundItems.push(response.data.menu_items[i]);
            //foundItems[i] = response.data.menu_items[i];
        }
      };
    });
    console.log(foundItems);
    //return foundItems;
  };

  service.getItems = function () {
    return foundItems;
  };

}

function MenuSearchFactory() {
  var factory = function (searchTerm) {
    return new MenuSearchService(searchTerm);
  };

  return factory;
}

})()