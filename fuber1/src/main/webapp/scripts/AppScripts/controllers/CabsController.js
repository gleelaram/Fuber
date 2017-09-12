fuber.controller('CabsCtrl',['$scope','$rootScope','$location','$firebaseArray','$firebaseObject',function($scope,$rootScope,$location,$firebaseArray,$firebaseObject){
	var ref = firebase.database().ref().child('Cars');
	console.log(ref);
	$scope.checkCarsLoaded=false;
	
	$scope.CarsList = $firebaseArray(ref);
	console.log("Hai");
	
	
	//$scope.CarsList=[{name:'maruthi',color:'white'},{name:'tayota',color:'white'},{name:'tata',color:'pink'}];
	$scope.bookcab=function()
	{
		if($scope.checkCarsLoaded)
		{
			$rootScope.colorList=uniqueColors();
			$location.path('/bookcab');
		}
		else
			{
			console.log("Cars not Loaded");
			}
		
	}
	$scope.CarsList.$loaded()
    .then(function(){
       $scope.checkCarsLoaded=true;
    });
    
    var uniqueColors=function()
	{
		var ColorsList=[];
		for(var i=0;i<$scope.CarsList.length;i++)
		{
			if(!$scope.CarsList[i].booked)
			{
			 ColorsList[i]=$scope.CarsList[i].color;
			}
		}
	  var uniqueColorsList=removeDuplicate(ColorsList);
		
		return uniqueColorsList;
	}
    
    var removeDuplicate=function(ColorsList)
    {
    	var list=[];
    	var index=0;
    	for(var i=0;i<ColorsList.length;i++)
    	{
         var color=ColorsList[i];
         if(color == 0)
        	 {
        	  continue;
        	 }
         var count=0;
    	 for(var j=0;j<ColorsList.length;j++)
    	 {
    		if(color!=0 && color == ColorsList[j])
    		{
    			list[index]=color;
    			ColorsList[j]=0;
    			index++;
    			
    		}
    		else if(color == ColorsList[j])
    		{
    			ColorsList[j]=0;
    		} 
    	 }	
    	}
    	return list;
    }
	
}]);