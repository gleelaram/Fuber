package com.quintype.fuber1.service;

import java.util.ArrayList;
//import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeSet;
//import java.util.function.Predicate;

//import org.apache.commons.collections.CollectionUtils;
//import org.apache.commons.logging.Log;
//import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import com.quintype.fuber1.dto.Car;
import com.quintype.fuber1.dto.User;

@Service
public class CabServiceImpl implements CabService{

	public Car getNearestCar(User user){
		//final String userColorChoice=user.getCarColor();
		List<Car> allCars=new ArrayList<Car>(this.getAllCars());
//			CollectionUtils.filter(allCars, new Predicate<Car>() {
//			    @Override
//			    public boolean evaluate(Car car) {
//			        return car.getColor().equals(userColorChoice);
//			    }
//
//			});
		Map<Double,Car> carPool=new HashMap<Double,Car>();
		for(Car car:allCars){
			if(user.getCarColor().equals(car.getColor())){
				double dx=71.5*(user.getFromLocation().getLongitude()-car.getPosition().getLongitude());
				double dy=111.3*(user.getFromLocation().getLatitude()-car.getPosition().getLatitude());
				double distBWcarAndUser=Math.sqrt(dx*dx+dy*dy);
				// storing distBWcarAndUser with carId
				carPool.put(distBWcarAndUser, car);
			}
		}
		Double shrtstDist=new ArrayList<Double>(new TreeSet<Double>(carPool.keySet())).get(0);
		if(null!=shrtstDist){
			return carPool.get(shrtstDist);
		}
		return null;
	}
	public Set<Car> getAllCars(){
		return new HashSet<Car>();
	}
}
