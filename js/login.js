
// Called when submit button on login page is hit
function doLogin()
{
	var username = document.getElementById("loginUser").value;
	var password = document.getElementById("loginPass").value;

	var jsonPayload = '{"username" : "' + username + '", "password" : "' + password + '"}';

	var url = 'http://contactmanager.site/ProjectObjectOrientedSoftware/API/login.php';
	//alert("Javascript");
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url);
	xhr.setRequestHeader("Content-type", 'application/json; charset=UTF-8');
	console.log("try");
	try
	{
		xhr.send(jsonPayload);
		console.log("after try");
		xhr.onreadystatechange = function()
		{
			console.log("response: " + xhr.response);
		    // Complete
			if (xhr.readyState == 4 && xhr.status == 200)
			{
				console.log("(if) response: " + xhr.response);
                var json = JSON.parse(xhr.response);
			console.log(xhr.response);
				// Passwords matched
				if(json.state == 1) {
				    window.location.href = 'https://contactmanager.site/ProjectObjectOrientedSoftware/API/contactmanager.php';
				}
				else{
				    alert("Incorrect Username or Password");
				}
			}
		};


	}

	catch(err)
	{
		alert(err.message);
	}
}
