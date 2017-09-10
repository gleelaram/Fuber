var fuber =angular.module('FuberApp',['ngRoute','firebase']);

fuber.config(function($routeProvider) {
    $routeProvider
    .when("/", {
    	// template : "<h1>Main</h1><p>Click on the links to change this content</p>"
    		 templateUrl : "pages/AvailableCabs.html",
 			controller : "CabsCtrl"
    })
     .when("/bookcab", {
    	// template : "<h1>Main</h1><p>Click on the links to change this content</p>"
    		 templateUrl : "pages/BookCab.html",
 			controller : "BookCabCtrl"
    })
});