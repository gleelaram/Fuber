fuber.controller('CabsCtrl',['$scope','$rootScope','$location','$firebaseArray','$firebaseObject',function($scope,$rootScope,$location,$firebaseArray,$firebaseObject){
	var ref = firebase.database().ref().child('Cars');
	console.log(ref);
	
	$scope.CarsList = $firebaseArray(ref);
	console.log("Hai");
	
	
	//$scope.CarsList=[{name:'maruthi',color:'white'},{name:'tayota',color:'white'},{name:'tata',color:'pink'}];
	$scope.bookcab=function()
	{
		$location.path('/bookcab');
	}
	
}]);