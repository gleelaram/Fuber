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

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.collections.Predicate;
//import org.apache.commons.collections.CollectionUtils;
//import org.apache.commons.logging.Log;
//import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import com.quintype.fuber1.dto.Car;
import com.quintype.fuber1.dto.RideDtls;
import com.quintype.fuber1.dto.User;

@Service
public class CabServiceImpl implements CabService{

	public RideDtls getNearestCar(User user){
		final String userColorChoice=user.getCarColor();
		List<Car> allCars=new ArrayList<Car>(this.getAllCars());
			CollectionUtils.filter(allCars, new Predicate() {
			    public boolean evaluate(Object car) {
			        return ((Car)car).getColor().equals(userColorChoice);
			    }

			});
		Map<Double,Car> carPool=new HashMap<Double,Car>();
		double dx=0;
		double dy=0;
		for(Car car:allCars){
				dx=71.5*(user.getFromLocation().getLongitude()-car.getPosition().getLongitude());
				dy=111.3*(user.getFromLocation().getLatitude()-car.getPosition().getLatitude());
				double distBWcarAndUser=Math.sqrt(dx*dx+dy*dy);// storing distBWcarAndUser with carId
				carPool.put(distBWcarAndUser, car);
		}
		Double shrtstDist=new ArrayList<Double>(new TreeSet<Double>(carPool.keySet())).get(0);
		if(null!=shrtstDist){
			Car car=carPool.get(shrtstDist);
			dx=71.5*(user.getToLocation().getLongitude()-user.getFromLocation().getLongitude());
			dy=111.3*(user.getToLocation().getLatitude()-user.getFromLocation().getLongitude());
			double travelDist=Math.sqrt(dx*dx+dy*dy);
			float fare=(float) (travelDist*5*1+travelDist*2);	//assuming the car speed at 12kmph
			if("pink".equals(car.getColor())){
				fare=fare+5;
			}
			return new RideDtls(car, fare);
		}
		return null;
	}
	public Set<Car> getAllCars(){
		return new HashSet<Car>();
	}
}
