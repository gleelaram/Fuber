fuber.controller('BookCabCtrl',['$scope','$firebaseArray','$firebaseObject',function($scope,$firebaseArray,$firebaseObject){
	$scope.BookCabWithDetails=function()
	{
		var Amount = firebase.database().ref().child('AmountDetails');
		var ref = firebase.database().ref().child('Cars');
		var CarsList=$firebaseArray(ref);
		var arrayOfAvailbleCarswithDistance=[];
		var count=0;
		for(i=0;i<CarsList.length;i++)
		{
			if(!CarsList[i].booked)
				{
				 arrayOfAvailbleCarswithDistance[count]=findDistanceFromCar(CarsList[i],$scope.user.FromAddress)
				 count++;
			
				}
		}
		var finalbookedcar=findNearestCar(arrayOfAvailbleCarswithDistance)[0];
		var cost=CostForTravel(finalbookedcar,$scope.user.ToAddress,$scope.user.FromAddress);
	
		Amount.$add({
		    "userid" : 2,
		    "amount" : cost,
		    "carid" : finalbookedcar.id,
		    "fromlocation" : $scope.user.FromAddress,
			"tolocation" : $scope.user.ToAddress
		});
		
		
		
		
			$scope.message="Cab no:"+finalbookedcar.id+"is booked and the cost is"+cost;
			
			$scope.booked=true;
			
			


		
		
	}
	
	var CostForTravel=function(cardistance,ToAddress,FromAddress){
	
		var t1=new Date();//t1
		var t2=new Date(t1.getMinutes()+(cardistance.distance*5));// ideal time 1 hour = 12Kms ,1min = 1/5km, cardistance.distance*5
	    var distanceFromAndToAddress=distanceCalculation(ToAddress,FromAddress);
	    var t3=new Date(t2.getMinutes+(distanceFromAndToAddress*5));
	    var travelTimeInMins = TimeDifferenceInMin(t2,t3);
	    var TotalCost= travelTimeInMins*1+distanceFromAndToAddress*2
	    if(cardistance.car.color=='pink')
	    	{
	    	TotalCost=TotalCost+5;
	    	}
	    
	    return TotalCost;
	    
		
		
	}
	
	var TimeDifferenceInMin=function(date1,date2)
	{
		 // Convert both dates to milliseconds
		  var date1_ms = date1.getTime();
		  var date2_ms = date2.getTime();

		  // Calculate the difference in milliseconds
		  var difference_ms = date2_ms - date1_ms;
		  //take out milliseconds
		  difference_ms = difference_ms/1000;
		  difference_ms = difference_ms/60; 
		  var minutes = Math.floor(difference_ms % 60);
		  return minutes;
	}
	
	var findNearestCar =function(list)
	{
		var length = list.length;
	    for (var i = (length - 1); i >= 0; i--) {
	        //Number of passes
	        for (var j = (length - i); j > 0; j--) {
	            //Compare the adjacent positions
	            if (list[j].distance < list[j - 1].distance) {
	                //Swap the numbers
	                var tmp = list[j];
	                list[j] = list[j - 1];
	                list[j - 1] = tmp;
	            }
	        }
	    }	
	    return list;
		}
	
	var findDistanceFromCar=function(car,userFromAddress)
	{
		var distance=distanceCalculation(car.location,userFromAddress);
		return {"car":car,"distance":sqrt_distance};
		 
	}
	
	var distanceCalculation=function(ToAddress,FromAddress)
	{
		var dx=71.5(ToAddress.lng-FromAddress.lng);
		var dy=111.3(ToAddress.lat-FromAddress.lat);
		var distance =((dx*dx)+(dy*dy));
		var sqrt_distance=Math.sqrt(distance);
		return sqrt_distance
		
	}
	
	$scope.Reset=function()
	{
		$scope.user="";	
		$scope.booked=false;
		$scope.Notbooked=false;
	}
		
}]);