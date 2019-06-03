var urlBase = 'http://contactmanager.site/LAMPAPI';
var extension = "php";

var current_user_ID = 0;

//sends the username and password to the server
sendUsernameAndPassword(){
	
	//gets the elements given by the user and store them in variables
	var name = getElementById("username").value;
	var user_password = getElementById("password").value;
	
	//creates an object out of those variables
	var payload = {
		username: name, 
		psw: user_password
		};
	
	//turns that object into a JSON object
	var json_payload = JSON.stringify(payload);
	
	//create the XML HTTP Request object
	var request_object = new XMLHttpRequest();
	
	//Set the XML HTTP Request Object to send stuff to the Login.php file
	var url = urlBase + '/Login.' + extension;
	request_object.open("POST", url);
	
	//send the username and password to the Login.php file
	request_object.send(json_payload);
	
	//creates an object to get information back
	var response_object = JSON.parse(request_object.response);
	
	//updates the current user variable to the person who just logged in
	current_user_ID = response_object.ID;
}


sendLogoutRequest(){
	
	//creates a new XML HTTP Request Object
	var request_object = new XMLHttpRequest();
	
	//sets that object to go to logout.php
	var url = urlBase + 'logout.' + extension;
	request_object.open("GET", url);
	
	//sets current user to 0
	current_user_ID = 0;
}

// sends the contact information a user inputs to the server
addContact(){
	
	// gets the contact information given by user and stores them in variables.
	var first_name = getElementById("FirstName").value;
	var last_name = getElementById("LastName").value;
	var address = getElementById("Address").value;
	var phone_number = getElementById("PhoneNumber").value;
	var email = getElementById("Email").value;
	
	// creates an object, and stores the values given into it
	var payload = {
		operation: "add"
		first_name: first_name, 
		last_name: last_name, 
		address: address,
		phone_number: phone_number,
		email: email
		};
	
	//converts that object into  JSON object
	var json_payload = JSON.stringify(payload);
	
	//creates the XML HTTP Request object
	var request_object = new XMLHttpRequest();

	
	//Set the XML HTTP Request Object to send stuff to the addContact.php file
	var url = urlBase + '/addContact.' + extension;
	request_object.open("POST", url);
	
	//send the contact information to the addContact.php file
	request_object.send(json_payload);
}

sendSearchRequest(){
	
	//sets a variable to the search field
	var search_input = getElementById("search").value;
	var userID = current_user_ID;
	
	//creates an object with that value
	var payload = {
		ID: userID
		search: search_input
	};
	
	//creates a json object out of that object
	var json_payload = JSON.stringify(payload);
	
	//creates an XML HTTP Request object
	var request_object = new XMLHttpRequest();
	
	//Sets that object to send stuff to the searchNames.php file
	var url = urlBase + '/searchNames.' + extension;
	request_object.open("POST", url);
	
	//sends a request with
	request_object.send(json_payload);
	
	
	
}

