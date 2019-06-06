
// Called when submit button on login page is hit
function doLogin()
{
	var username = document.getElementById("loginUser").value;
	var password = document.getElementById("loginPass").value;
	
	var jsonPayload = '{"username" : "' + username + '", "password" : "' + password + '"}';
	
	var url = 'http://contactmanager.site/ProjectObjectOrientedSoftware/API/login.php';
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", 'application/json; charset=UTF-8');
	try
	{
		xhr.send(jsonPayload);
		xhr.onreadystatechange = function() 
		{
		    // Complete
			if (xhr.readyState == 4 && xhr.status == 200) 
			{
                		var json = JSON.parse(xhr.response);
				
				// Passwords matched
				if(json.state == 1) {
				    window.location.href = 'http://contactmanager.site/ProjectObjectOrientedSoftware/contactmanager.php';
				}
				else{
				    alert("Incorrect Username or Password");
				}
			}
		};
		//alert(test);
        	alert("after payload");
        	alert("we parsed");
		
	}
	
	catch(err)
	{
		alert(err.message);
	}
}
