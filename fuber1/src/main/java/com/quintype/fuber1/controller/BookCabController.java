package com.quintype.fuber1.controller;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.quintype.fuber1.dto.Car;
import com.quintype.fuber1.dto.RideDtls;
import com.quintype.fuber1.dto.User;
import com.quintype.fuber1.service.CabService;

@Controller
public class BookCabController {
	@Autowired
	private CabService carService;
	@RequestMapping(value="/bookCab",method=RequestMethod.POST,produces="application/json")
	public RideDtls bookCab(User user){
		return this.carService.getNearestCar(user);
	}
	@RequestMapping(value="/getAllCabs",method=RequestMethod.GET,produces="application/json")
	public Set<Car> getCabs(){
		return this.carService.getAllCars();
	}
}
