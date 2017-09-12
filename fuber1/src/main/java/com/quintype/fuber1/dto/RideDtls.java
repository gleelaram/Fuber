package com.quintype.fuber1.dto;

public class RideDtls {

	private Car car;
	private float fare;
	
	
	public RideDtls(Car car, float fare) {
		this.car = car;
		this.fare = fare;
	}
	public Car getCar() {
		return car;
	}
	public void setCar(Car car) {
		this.car = car;
	}
	public float getFare() {
		return fare;
	}
	public void setFare(float fare) {
		this.fare = fare;
	}

}