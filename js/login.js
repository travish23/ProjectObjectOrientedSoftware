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