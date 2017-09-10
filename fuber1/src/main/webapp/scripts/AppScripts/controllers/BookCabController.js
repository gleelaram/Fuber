fuber.controller('BookCabCtrl',['$scope',function($scope){
	$scope.BookCabWithDetails=function()
	{
		var arrayOfAvailbleCarswithDistance=[];
		var count=0;
		for(i=0;i<CarsList.length;i++)
		{
			if(CarsList[i].booked)
				{
				 arrayOfAvailbleCarswithDistance[count]=findDistanceFromCar(CarsList[i],$scope.user.FromAddress)
				 count++;
			
				}
		}
		var finalbookedcar=findNearestCar(arrayOfAvailbleCarswithDistance);
		var cost=CostForTravel(finalbookedcar);
	
			$scope.message="Cab no:"+finalbookedcar.id+"is booked and the cost is"+ ;
			$scope.booked=true;
			


		
		
	}
	
	var CostForTravel=function(car){
	
		var date=new Date();
	    var time = car.distance*2;
	    
	    
		
		
	}
	
	var timeTakenByCarToPerson=function()
	{
		
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
		
	}
	
	var findDistanceFromCar=function(car,userFromAddress)
	{
		var dx=71.5(car.location.lng-user.FromAddress.long);
		var dy=111.3(car.location.lat-user.FromAddress.lat);
		var distance =((dx*dx)+(dy*dy));
		 var sqrt_distance=Math.sqrt(distance);
		return {"car":car,"distance":sqrt_distance}
	}
	
	var distanceCalculation()
	{
		
	}
	
	$scope.Reset=function()
	{
		$scope.user="";	
		$scope.booked=false;
		$scope.Notbooked=false;
	}
	
}]);