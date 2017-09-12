package com.quintype.fuber1.service;

import java.util.Set;

import com.quintype.fuber1.dto.Car;
import com.quintype.fuber1.dto.User;

public interface CabService {
	
public Car getNearestCar(User user);
public Set<Car> getAllCars();
}
