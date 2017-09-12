# Fuber
This app is used for booking cabs from the group of cabs that owner has.when a user provide where they want to go then this app find the nearest cab available from that group and book that cab for user.It also show the cost of the travel based on car type.



In this project I have used angularjs,firebase and spring mvc


When you want to see the full flow of angularjs+spring mvc please keep the rest call and comment the other code(which is code for firebase).

When you want to see the full flow of angualarjs+firebase please comment the rest call.


Folder structer as follows 

      fuber1
        |
        |
        |-------------------------src
        |                          |
        |                          |
        |                          |-----main
                                   |        |
                                   |        |---java
                                            |     |-------com
                                   |        |              |
                                   |        |               |-----quintype
                                   |        |                       |
                                   |        |                       |----fuber1
                                   |        |                                |-----controller
                                   |        |                                |         |-----BookCabController 
                                   |        |                                |
                                   |        |                                |-----service
                                   |        |                                |        |-------CabService.java
                                   |        |                                |        |-------CabServiceImpl.java
                                   |        |                                |
                                   |        |                                |-----dao
                                   |        |                                |      |-------CabDao.java
                                   |        |                                |      |-------CabDaoImpl.java
                                   |        |                                |
                                   |        |                                |-----dto
                                   |        |                                      |-------Car.java
                                   |        |                                       |-------Location.java
                                   |        |                                      |-------User.java
                                   |        |
                                   |        |
                                   |        |--------webapp
                                   |            |
                                   |            |
                                   |         |  |---------WEB-INF
                                   |         |  |           |
                                   |         |  |           |----Fuber-servlet.xml
                                   |         |  |           |----web.xml
                                   |         |  |
                                   |         |  |---------css
                                   |         |  |
                                   |         |  |---------pages
                                   |         |  |
                                   |         |  |---------scripts
                                   |            |--------index.html
                                   |
                                   |             
                                   |-----test
                                   |
                                   |        
        
        
        
        
        |
        |------pom.xml             


