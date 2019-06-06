var urlBase = 'http://contactmanager.site/ProjectObjectOrientedSoftware/API';
var extension = "php";

var current_user_ID = 0;

//TODO: Coordinate the variable names in this file to the variable names in other files
//so the program actually works

//TODO: Create a display function to display the 2D arrays given as a table of contacts
// and use that function where needed

//sends the username and password to the server for login
function sendUsernameAndPassword(){

	console.log("Got into sendUsernameAndPassword()");

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

	console.log("The json payload is " + json_payload);

	//create the XML HTTP Request object
	var request_object = new XMLHttpRequest();

	//Set the XML HTTP Request Object to send stuff to the Login.php file
	var url = urlBase + '/login.' + extension;
	request_object.open("POST", url);

	//send the username and password to the Login.php file
	request_object.send(json_payload);

	//creates an object to get information back
	var response_object = JSON.parse(request_object.response);

	console.log("The response object is " + request_object.response);

	if(response_object.state == 1){
		//updates the current user variable to the person who just logged in
		current_user_ID = response_object.ID;

		window.location.replace("http://www.contactmanager.site/userContactsPage.html");


	}
	else{
		document.getElementById("failMessage").style.visibility = "visible";
		document.getElementById("failMessage").style.display = "inline";

	}
}

//sends request to create new account with username and password. Displays failure or success
function sendCreateNewAccountRequest(){

	console.log("Got into sendCreateNewAccountRequest()");

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

	console.log("The json payload is " + json_payload);

	//create the XML HTTP Request object
	var request_object = new XMLHttpRequest();

	//Set the XML HTTP Request Object to send stuff to the newAccount.php file
	var url = urlBase + '/register.' + extension;
	request_object.open("POST", url);

	//send the username and password to the newAccount.php file
	request_object.send(json_payload);

	//creates an object to get information back
	var response_object = JSON.parse(request_object.response);

	console.log("The response object is " + request_object.response)


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
function sendLogoutRequest(){

	console.log("Got into sendLogoutRequest()");

	//creates a new XML HTTP Request Object
	var request_object = new XMLHttpRequest();

	//sets that object to go to logout.php
	var url = urlBase + '/logout.' + extension;
	request_object.open("GET", url);

	//sets current user to 0
	current_user_ID = 0;

	//TODO: send user back to login page

	window.location.replace("http://contactmanager.site/index.html");
}

// sends the contact information a user inputs to the server, and displays updated table
function sendAddContactRequest(){

	console.log("Got into sendAddContactRequest()");

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

	console.log("The json payload is " + json_payload);

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
function sendDeleteRequest(){

	console.log("Got into sendDeleteRequest()");

	//TODO: figure out how to get contact ID from table
	//TODO: send an XML HTTP request with that contact ID
	//TODO: display updated contact list
}

//sends a request to edit a specific contact and displays updated table
function sendEditRequest(){

	console.log("Got into sendEditRequest()");

	//TODO: figure out how to get contact ID from table
	//TODO: send an XML HTTP request with that contact ID and the contact info
	//TODO: display updated contact list

}

//sends request for server to search for the name in the search field
function sendSearchRequest(){

	console.log("Got into sendSearchRequest()");

	//sets a variable to the search field
	var search_input = document.getElementById("search").value;
	var userID = current_user_ID;

	//creates an object with that value
	var payload = {
		ID: userID,
		search: search_input
	};

	//creates a json object out of that object
	var json_payload = JSON.stringify(payload);

	console.log("The json payload is " + json_payload);

	//creates an XML HTTP Request object
	var request_object = new XMLHttpRequest();

	//Sets that object to send stuff to the searchNames.php file
	var url = urlBase + '/searchNames.' + extension;
	request_object.open("POST", url);

	//sends a request with
	request_object.send(json_payload);

	console.log("The response object is " + request_object.responseText);

	//TODO: Display results of the search

}


function displayAllContacts(){

	console.log("Got into displayAllContac5s()");

	current_user_ID = 1;
	var payload = {ID: current_user_ID};

	var json_payload = JSON.stringify(payload);


	var request_object = new XMLHttpRequest();
	var url = urlBase + "/displayAllContactsForUser." + extension;

	request_object.open("POST", url);
	request_object.send(json_payload);

	console.log("(1)The response_object is " + request_object.responseText);
	var response_object;

	request_object.onreadystatechange = function() {
		console.log("(2)The response_object is " + request_object.responseText);

		if(request_object.readyState === 4 && request_object.status === 200)
		{
			response_object = JSON.parse(this.responseText);
			console.log("The parsed object is " + response_object.results[0]);
		}
	};

	console.log("we made it");
	/*
	for(i = 0; i < response_object.length; i++){

	}
	*/
	//console.log("response_object[1][2] is " + response_object.results[1][2]);


	displayTable(response_object.results);
}


function displayTable(contact_table_contents){

	var number_of_contacts = contact_table_contents.length;

	var i;
	var rows = document.querySelectorAll(".blankRow");
	var categories = rows[0].children;
	rows[0].classList.remove("blankRow");

	rows[0].setAttribute("id", contact_table_contents[0][0]);

	categories[0].innerHTML = contact_table_contents[0][1];
	categories[1].innerHTML = contact_table_contents[0][2];
	categories[2].innerHTML = contact_table_contents[0][3];
	categories[3].innerHTML = contact_table_contents[0][4];


	/*
	for(i = 0; i < number_of_contacts; i++){



	}
	*/

}
