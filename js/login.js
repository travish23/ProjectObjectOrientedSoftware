var urlBase = 'http://contactmanager.site/ProjectObjectOrientedSoftware/API';
var extension = "php";

function sendUsernameAndPassword(){

	console.log("Got into sendUsernameAndPassword()");

	//gets the elements given by the user and store them in variables
	var name = document.getElementById("loginUser").value;
	var user_password = document.getElementById("loginPass").value;

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
	var url = urlBase + '/testlogin.' + extension;

	
	var response_object;

	request_object.onreadystatechange = function() {
		console.log("(2)The response_object is " + request_object.responseText);

		if(request_object.readyState === 4 && request_object.status === 200)
		{
			response_object = JSON.parse(this.responseText);
			console.log("The parsed object is " + response_object.results[0]);
			displayTable(response_object.results);
			return;
		}
	};
	
	request_object.open("POST", url);
	//send the username and password to the Login.php file
	request_object.send(json_payload);

	//creates an object to get information back
	console.log("request_object.responseText = " + request_object.responseText);
	
	var response_object = JSON.parse(request_object.responseText);

	console.log("The response object is " + request_object.responseText);

	if(response_object.state == 1){
		//updates the current user variable to the person who just logged in
		current_user_ID = response_object.ID;

		window.location.replace("http://www.contactmanager.site/contactmanager.php");


	}
	else{
		document.getElementById("failMessage").style.visibility = "visible";
		document.getElementById("failMessage").style.display = "inline";

	}
}
