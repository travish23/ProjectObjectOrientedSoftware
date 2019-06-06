
// Called when submit button on login page is hit
function doLogin()
{
	var username = document.getElementById("loginUser").value;
	var password = document.getElementById("loginPass").value;
	
	var jsonPayload = '{"username" : "' + username + '", "password" : "' + password + '"}';

	var url = 'http://contactmanager.site/ProjectObjectOrientedSoftware/API/login.php';
	
	alert("Javascript");
	var xhr = new XMLHttpRequest();
	xhr.open("GET", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.send(jsonPayload);
		xhr.onreadystatechange = function() 
		{
			
		
		    // Complete
			if (xhr.readyState == 4 && xhr.status == 200) 
			{
               			 var json = JSON.parse(xhr.responseText);
				
			
				// Passwords matched
				if(json.state == 1) {
					
					console.log("test");
				    window.location.href = 'http://contactmanager.site/ProjectOjectOrientedSoftware/API/contactmanager.php';
				}
				else{
				    alert("Incorrect Username or Password");
				}
			}
		};
		//alert(test);
        //alert("after payload");
        //var test = JSON.parse(xhr.response);
        //alert("we parsed");
		
	}//
		catch(err)
	{
	alert(err.message);
	}
}
