(function (){
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];

function LunchCheckController ($scope) {
	$scope.userLunch = ""; // user enters this

	$scope.calcLunch = function(){
		$scope.outString = ""; // the result we show
		$scope.mesColor = "";  // message and frame color

		if ( $scope.userLunch )
		{
			var itemsAmount = countArrayItems( splitString($scope.userLunch, ',') );
			$scope.mesColor = "green";

			if (itemsAmount <= 3) 
			{	
				$scope.outString = "Enjoy!"; // when three or less items 
			}
			else
				$scope.outString = "Too much!"; // when more than three items
		}
		else
		{
			$scope.outString = "Please enter data first"; // when nothing is entered OR only spaces OR only commas and spaces
			$scope.mesColor = "red";
		}	
	};
};

	// creates an array out of items of the string stringToSplit separated by separator
function splitString(stringToSplit, separator) {
	var arrayOfStrings = stringToSplit.split(separator); 
	return arrayOfStrings;
}

	// counts items that are not spaces
function countArrayItems(arrayOfItems) {
	var stringLen = 0;
	
	for (var i = 0; i < arrayOfItems.length; i++) {
        if (arrayOfItems[i].trim())
        	stringLen++;
    }
    return stringLen;
}

})()