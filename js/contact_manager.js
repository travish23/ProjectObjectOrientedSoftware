var urlBase = 'http://contactmanager.site/ProjectObjectOrientedSoftware/API';
var extension = "php";

var current_user_ID = 1;

function doLogin()
{
	var username = document.getElementById("loginUser").value;
	var password = document.getElementById("loginPass").value;

	var jsonPayload = '{"username" : "' + username + '", "psw" : "' + password + '"}';

	var url = 'http://contactmanager.site/ProjectObjectOrientedSoftware/API/testlogin.php';

	var xhr = new XMLHttpRequest();
	//xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	xhr.onreadystatechange = function()
		{


		    // Complete
			if (xhr.readyState == 4 && xhr.status == 200)
			{
        var json = JSON.parse(xhr.responseText);
				// Passwords matched
				if(json.error == "0") {

					window.location.href = 'http://contactmanager.site/ProjectObjectOrientedSoftware/HTML/userContactsPage.html';
				}
				else{
				    alert("Incorrect Username or Password");
				}
			}
		}
		xhr.open("POST", url, true);
		xhr.send(jsonPayload);
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

	var name = first_name + " " + last_name;
	var address = street + " " + city + "," + state + " " + zip;

	// creates an object, and stores the values given into it
	var payload = {
		name: name,
		phone_number: phone_number,
		email: email,
		address: address,
		};

	//converts that object into  JSON object
	var json_payload = JSON.stringify(payload);

	console.log("The json payload is " + json_payload);

	//creates the XML HTTP Request object
	var request_object = new XMLHttpRequest();
	var url = urlBase + '/addContact.' + extension;

	request_object.onreadystatechange = function() {
		if(request_object.readyState === 4 && request_object.status === 200)
		{
			console.log("Response: " + request_object.responseText);
			displayAllContacts();
			return;
		}
	};

	request_object.open("POST", url);
	request_object.send(json_payload);
}

//sends request to delete a specific contact and displays updated table
function sendDeleteRequest(){

	console.log("Got into sendDeleteRequest()");

	//TODO: figure out how to get contact ID from table
	var contact = document.querySelector(".selected");
	if (contact == null)
		return;

	var contactId = contact.id;

	var payload = {
		contact_id: contactId,
		};

	//converts that object into  JSON object
	var json_payload = JSON.stringify(payload);

	//converts that object into  JSON object
	console.log("contact id: " + contactId + " (" + typeof(contactId) + ")");

	var request_object = new XMLHttpRequest();
	var url = urlBase + '/deleteContact.' + extension;

	request_object.onreadystatechange = function() {
		if(request_object.readyState === 4 && request_object.status === 200)
		{
			console.log("Response: " + request_object.responseText);
			displayAllContacts();
			return;
		}
	};
	request_object.open("POST", url);
	request_object.send(json_payload);
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

	var request_object = new XMLHttpRequest();
	var url = urlBase + '/searchNames.' + extension;
	var response_object;

	request_object.onreadystatechange = function() {
		if(request_object.readyState === 4 && request_object.status === 200)
		{
			response_object = JSON.parse(this.responseText);
			displayTable(response_object.results);
			return;
		}
	};
	request_object.open("POST", url);
	request_object.send(json_payload);

	//TODO: Display results of the search

}


function displayAllContacts(){

		var payload = {ID: current_user_ID};

	var json_payload = JSON.stringify(payload);


	var request_object = new XMLHttpRequest();
	var url = urlBase + "/displayAllContactsForUser." + extension;

	var response_object;

	request_object.onreadystatechange = function() {
		if(request_object.readyState === 4 && request_object.status === 200)
		{
			response_object = JSON.parse(this.responseText);
			displayTable(response_object.results);
			return;
		}
	};
	request_object.open("POST", url);
	request_object.send(json_payload);
}

function displayTable(contact_table_contents){

	//0					 1				2			3			 4			5
	//contactID, ownerID, name, email, phone, address

	clearTable();

	var number_of_contacts = contact_table_contents.length;
	var i;
	var table = document.getElementById("contactTable");
	var rows = document.querySelectorAll(".blankRow");

	//console.log()

	for(i = 0; i < rows.length && i < number_of_contacts; i++){

		var categories = rows[i].children;
		var name = contact_table_contents[i][2].split(" ");

		rows[i].classList.remove("blankRow");
		rows[i].setAttribute("id", contact_table_contents[i][0]);

		categories[0].innerHTML = name[1];
		categories[1].innerHTML = name[0];
		categories[2].innerHTML = contact_table_contents[i][3];
		categories[3].innerHTML = contact_table_contents[i][4];
		categories[4].innerHTML = contact_table_contents[i][5];
	}

	while(i < number_of_contacts)
	{
		var row = table.insertRow(i);
		row.setAttribute("id", contact_table_contents[i][0]);

		var cell0 = row.insertCell(0);
		var cell1 = row.insertCell(1);
		var cell2 = row.insertCell(2);
		var cell3 = row.insertCell(3);
		var cell4 = row.insertCell(4);

		cell0.innerHTML = name[1];
		cell1.innerHTML = name[0];
		cell2.innerHTML = contact_table_contents[i][3];
		cell3.innerHTML = contact_table_contents[i][4];
		cell4.innerHTML = contact_table_contents[i][5];
		i++;
	}

}

function clearTable()
{
	var old_tbody = document.getElementById("tableBody");
	var new_tbody = document.createElement("tbody");
	populate(new_tbody);
	old_tbody.parentNode.replaceChild(new_tbody, old_tbody);
	new_tbody.id = "tableBody";
}

function populate(body)
{
	for (var i = 0; i < 14; i++)
	{
		var row = body.insertRow(i);
		row.classList.add("blankRow");

		var cell0 = row.insertCell(0);
		var cell1 = row.insertCell(1);
		var cell2 = row.insertCell(2);
		var cell3 = row.insertCell(3);
		var cell4 = row.insertCell(4);

		cell0.innerHTML = "";
		cell1.innerHTML = "";
		cell2.innerHTML = "";
		cell3.innerHTML = "";
		cell4.innerHTML = "";
	}
}
