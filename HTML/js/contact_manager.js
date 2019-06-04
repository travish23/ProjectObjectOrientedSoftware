var urlBase = 'http://contactmanager.site/LAMPAPI';
var extension = "php";

var current_user_ID = 0;

//TODO: Coordinate the variable names in this file to the variable names in other files
//so the program actually works

//TODO: Create a display function to display the 2D arrays given as a table of contacts
// and use that function where needed

//sends the username and password to the server for login
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
	
	if(response_object.state == 1){
		//updates the current user variable to the person who just logged in
		current_user_ID = response_object.user_ID;
		
		window.location.replace("http://www.contactmanager.site/userContactsPage.html");
			
		
	}
	else{
		document.getElementById("failMessage").style.visibility = "visible";
		document.getElementById("failMessage").style.dislplay = "inline";
		
	}
}

//sends request to create new account with username and password. Displays failure or success
sendCreateNewAccountRequest(){
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
	
	//Set the XML HTTP Request Object to send stuff to the newAccount.php file
	var url = urlBase + '/newAccount.' + extension;
	request_object.open("POST", url);
	
	//send the username and password to the newAccount.php file
	request_object.send(json_payload);
	
	//creates an object to get information back
	var response_object = JSON.parse(request_object.response);
	
	
	//TODO: figure out what to do with the information we get back
	
	
	if(response_object.complete == 1){
		current_user_ID = response_object.user_ID;
		
		window.location.replace("http://www.contactmanager.site/userContactsPage.html");
	}
	else{
		document.getElementById("failMessage2").style.visibility = "visible";
		document.getElementById("failMessage2").style.dislplay = "inline";
		
	} 
	
}

//sends request for server to logout
sendLogoutRequest(){
	
	//creates a new XML HTTP Request Object
	var request_object = new XMLHttpRequest();
	
	//sets that object to go to logout.php
	var url = urlBase + 'logout.' + extension;
	request_object.open("GET", url);
	
	//sets current user to 0
	current_user_ID = 0;
	
	//TODO: send user back to login page
	
	window.location.replace("http://contactmanager.site/index.html");
}

// sends the contact information a user inputs to the server, and displays updated table
sendAddContactRequest(){
	
	// gets the contact information given by user and stores them in variables.
	var first_name = getElementById("firstName").value;
	var last_name = getElementById("lastName").value;	
	var phone_number = getElementById("phone").value;
	var email = getElementById("email").value;
	
	var street = getElementById("street").value;
	var city = getElementById("city").value;
	var state = getElementById("state").value;
	var zip = getElementById("zip").value;
	
	var address = street + " " + city + "," + state + " " + zip;
	
	// creates an object, and stores the values given into it
	var payload = {
		operation: "add",
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
	
	//TODO: display updated contact list
	
	
}

//sends request to delete a specific contact and displays updated table
sendDeleteRequest(){
	//TODO: figure out how to get contact ID from table
	//TODO: send an XML HTTP request with that contact ID
	//TODO: display updated contact list
}

//sends a request to edit a specific contact and displays updated table
sendEditRequest(){
	//TODO: figure out how to get contact ID from table
	//TODO: send an XML HTTP request with that contact ID and the contact info
	//TODO: display updated contact list
	
}

//sends request for server to search for the name in the search field
sendSearchRequest(){
	
	//sets a variable to the search field
	var search_input = getElementById("search").value;
	var userID = current_user_ID;
	
	//creates an object with that value
	var payload = { 
		ID: userID,
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
	
	//TODO: Display results of the search
	
}

