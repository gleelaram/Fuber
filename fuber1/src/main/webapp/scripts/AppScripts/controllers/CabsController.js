fuber.controller('CabsCtrl',['$scope','$location','$firebaseArray','$firebaseObject',function($scope,$location,$firebaseArray,$firebaseObject){
	var ref = firebase.database().ref().child('Cars');
	console.log(ref);
	
	$rootScope.CarsList = $firebaseArray(ref);
	
	
	//$scope.CarsList=[{name:'maruthi',color:'white'},{name:'tayota',color:'white'},{name:'tata',color:'pink'}];
	$scope.bookcab=function()
	{
		$location.path('/bookcab');
	}
	
}]);