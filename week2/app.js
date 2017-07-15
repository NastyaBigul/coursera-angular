(function (){
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController (ShoppingListCheckOffService) {
	var itemsToBuy = this;

	itemsToBuy.items = ShoppingListCheckOffService.getItemsToBuy();

	itemsToBuy.markBought = function(itemIndex){
		ShoppingListCheckOffService.markBought(itemIndex);
	};

	console.log("itemsToBuy.items[1].name "+itemsToBuy.items[1].name);
};

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController (ShoppingListCheckOffService) {
	var itemsToShow = this;

	itemsToShow.items = ShoppingListCheckOffService.getItemsToShow();
};

function ShoppingListCheckOffService() {
	var service = this;

	var itemsToBuy = [{ name: 'Cookies', quantity: '10' },
				 	  { name: 'Ice Cream', quantity: '2' },
				 	  { name: 'Candy', quantity: '20' },
				 	  { name: 'Juice', quantity: '4' },
				 	  { name: 'Chips', quantity: '3' }];
	var itemsToShow = [];

	service.markBought = function (itemIndex){
		var item = {
			name: itemsToBuy[itemIndex].name,
			quantity: itemsToBuy[itemIndex].quantity
		};
		itemsToShow.push(item);
		itemsToBuy.splice(itemIndex,1)
	};

	service.getItemsToBuy = function (){
		console.log(itemsToBuy);
		return itemsToBuy;
	};

	service.getItemsToShow = function (){
		console.log(itemsToShow);
		return itemsToShow;
	};
};

})()