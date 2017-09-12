fuber.controller('BookCabCtrl',['$scope','$firebaseArray','$firebaseObject',function($scope,$firebaseArray,$firebaseObject){
	$scope.BookCabWithDetails=function()
	{
		
		if($scope.user.FromAddress ==null ||$scope.user.ToAddress ==null || $scope.user.SelectedColor == null || $scope.user.SelectedColor =="" )
			{
			 
			 $scope.message="Please select the fileds to book cab";
				
				$scope.booked=true;	
				return;
			}
		if(($scope.user.FromAddress.lng==$scope.user.ToAddress.lng) && ($scope.user.FromAddress.lat ==$scope.user.ToAddress.lat))
		{
			$scope.message="From and To address are same";
			$scope.booked=true;
			return;
		}
		var Amount = firebase.database().ref().child('AmountDetails');
		var AmountList=$firebaseArray(Amount);
		var ref = firebase.database().ref().child('Cars');
		var CarsList=$firebaseArray(ref);
		var arrayOfAvailbleCarswithDistance=[];
		var count=0;
		CarsList.$loaded()
	    .then(function(){
		for(i=0;i<CarsList.length;i++)
		{
			if(!CarsList[i].booked && CarsList[i].color==$scope.user.SelectedColor)
				{
				 arrayOfAvailbleCarswithDistance[count]=findDistanceFromCar(CarsList[i],$scope.user.FromAddress)
				 count++;
			
				}
		}
		if(count==0)
		{
            $scope.message="Cabs not available";
			
			$scope.booked=true;	
		}
		var finalbookedcar=findNearestCar(arrayOfAvailbleCarswithDistance)[0];
		var cost=CostForTravel(finalbookedcar,$scope.user.ToAddress,$scope.user.FromAddress);
	    var amountObject={
			    "userid" : 2,
			    "amount" : cost,
			    "car" : finalbookedcar.car,
			    "fromlocation" : $scope.user.FromAddress,
				"tolocation" : $scope.user.ToAddress
			};
	    finalbookedcar.car.location = $scope.user.ToAddress;
	    console.log(finalbookedcar.car.location);
	    console.log(amountObject);
	    console.log(AmountList.length);
		
	    AmountList.$add(amountObject).then(function(ref) {
	    	  console.log("added record");
	    	  
	    	  CarsList.$save(finalbookedcar.car).then(function(ref) {
	    		  console.log("added record");
	    	  })
	    	  console.log("added record");
	    	 // returns location in the array
	    	});
		/*Amount.$save().then(function(ref) {
			  ref.key() === Amount.$id; // true
		}, function(error) {
		  console.log("Error:", error);
		});*/
		
		
		
		
			$scope.message="Cab no: "+finalbookedcar.car.regNo+ "is booked and the cost is "+cost;
			
			$scope.booked=true;
			$scope.user="";
			$scope.user.SelectedColor="";
			
			
			
			


	    });
		
	}
	
	var CostForTravel=function(cardistance,ToAddress,FromAddress){
	
		// ideal time 1 hour = 12Kms ,1min = 1/5km, cardistance.distance*5
	    var distanceFromAndToAddress=distanceCalculation(ToAddress,FromAddress);
	    
	    var TotalCost= ((distanceFromAndToAddress*5*1)+(distanceFromAndToAddress*2));
	    if(cardistance.car.color=='pink')
	    	{
	    	TotalCost=TotalCost+5;
	    	}
	    
	    return TotalCost;
	    
		
		
	}
	var findNearestCar =function(list)
	{
		var length = list.length;
		for(var i = 0; i < length; i++) {
		    for(var j = 1; j < length; j++) {
		      if(list[j - 1] < list[j]) {
		    	  var temp = list[i];
		    	  list[i] = list[j];
		    	  list[j] = temp;
		      }
		    }
		  }
	    return list;
		}
	
	var findDistanceFromCar=function(car,userFromAddress)
	{
		var distance=distanceCalculation(car.location,userFromAddress);
		return {"car":car,"distance":distance};
		 
	}
	
	var distanceCalculation=function(ToAddress,FromAddress)
	{
		var dx=71.5*(ToAddress.lng-FromAddress.lng);
		var dy=111.3*(ToAddress.lat-FromAddress.lat);
		var distance =((dx*dx)+(dy*dy));
		var sqrt_distance=Math.sqrt(distance);
		return sqrt_distance
		
	}
	
	$scope.Reset=function()
	{
		$scope.user="";	
		$scope.user.SelectedColor="";
		$scope.booked=false;
		$scope.Notbooked=false;
	}	
}]);