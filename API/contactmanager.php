<?php
    include("config.php")
	
	
    session_start();
    $user_check = $_SESSION['login_user'];
	
	
    if(!isset($_SESSION['login_user']))
    {
        header("location: index.html");
        die();
    }
    if(!isset($_SESSION['searchFlag']))
    {
        $_SESSION['searchFlag'] = false;
    }
?>

<!DOCTYPE html>
<html>

	<head>
		<title>Contacts</title>

		<link rel="stylesheet" type="text/css" href="css/userContactsPage.css">
		<script type="text/javascript" src="../js/userContactsPage.js" defer></script>
		<script type="text/javascript" src="../js/contact_manager.js"></script>

	</head>
	<body onload="displayAllContacts();">

		<h1 id="contactsTitle">Contacts</h1>

		<div id="userInterfaceDiv">

			<div id="contactButtonsBox">

				<!-- SEARCH BUTTON -->

				<button type="button" class="button" id="searchBtn" onclick="showSearchForm();">Search</button>

				<!-- ADD BUTTON -->

				<button type="button" class="button" id="addContactBtn" onclick="showContactForm();">Add</button>

				<!-- DELETE BUTTON-->

				<button type="button" class="button" id="deleteContactBtn" onclick="showDeleteForm();">Delete</button>

				<!-- EDIT BUTTON -->

				<button type="button" class="button" id="editContactBtn" onclick="showEditForm();">Edit</button>

				<!-- LOGOUT BUTTON -->

				<button type="button" class="button" id="logoutBtn" onclick="sendLogoutRequest();">Log Out</button>

			</div> <!-- End contactButtonsBox -->

			<div id="contactsBox">

				<div id="formsDiv" style="display:none; visibility:hidden;">

					<!-- SEARCH FORM -->

					<form class="myForm" id="searchForm" onsubmit="sendSearchRequest();" style="display:none; visibility:hidden;">

						<div class="formGroup">
							<input type="text" placeholder="Search contacts..." name="search" id="search">

							<div class="btnContainer">
			               <input type="submit" class="button" name="search" value="Search">
								<input type="button" class="button2" id="cancelSearchBtn" onclick="cancelSearch();" value="Cancel">
			            </div>
						</div>

					</form>

					<!-- ADD CONTACT FORM -->

					<form class="myForm" id="contactForm" onsubmit="addContact();" style="display:none; visibility:hidden;">

						<div class="formGroup">
		               <label for="name">First name</label>
		               <input type="text" name="firstName" id="firstName" placeholder="first name" required>
		            </div>

		            <div class="formGroup">
		               <label for="lastName">Last name</label>
		               <input type="text" name="lastName" id="lastName" placeholder="last name" required>
		            </div>

						<div class="formGroup">
		               <label for="email">Email</label>
		               <input type="email" name="email" id="email" placeholder="example@domain.com" required>
		            </div>

						<div class="formGroup">
		               <label for="phone">Phone</label>
		               <input type="tel" name="phone" id="phone" placeholder="xxx-xxx-xxxx" required>
		            </div>

						<div class="formGroup">
		               <label for="address">Address</label>
		               <input type="text" name="street" id="street" class="address" placeholder="Street" required>
							<input type="text" name="city" id="city" class="address" placeholder="City" required>
							<input type="text" name="state" id="state" class="address" placeholder="State" required>
							<input type="text" name="zipCode" id="zip" class="address" placeholder="ZIP Code" required>
		            </div>

		            <div class="btnContainer">
		               <input type="submit" class="button" name="addContact" value="Add Contact">
							<input type="button" class="button2" id="cancelAddContactBtn" onclick="cancelAddContact();" value="Cancel">
		            </div>

					</form>

					<!-- DELETE FORM -->

					<form class="myForm" id="deleteForm" onsubmit="sendDeleteRequest();" style="display:none; visibility:hidden;">

						<p>Please select the contact(s) to be deleted.</p>

						<div class="btnContainer">
							<input type="submit" class="button" name="deleteContact" value="Delete Selection">
							<input type="button" class="button2" id="cancelDeleteContactBtn" onclick="cancelDeleteContact();" value="Cancel">
						</div>

					</form>

					<!-- EDIT FORM -->

					<form class="myForm" id="editForm" onsubmit="sendEditRequest();" style="display:none; visibility:hidden;">

						<p>Please select the contact to be edited.</p>

						<div class="btnContainer">
							<input type="submit" class="button" name="editContact" value="Edit Selection">
							<input type="button" class="button2" id="cancelEditContactBtn" onclick="cancelEditContact();" value="Cancel">
						</div>

					</form>

				</div> <!-- End formsDiv -->

				<div id="contactsDisplay">
					<table id="contactTable">
					  <tr id="firstRow">
					    <th name="lastname">Last Name</th>
					    <th name="firstname">First Name</th>
					    <th name="email">Email</th>
						 <th name="phone">Phone Number</th>
						 <th name="address">Address</th>
					  </tr>
				
				
                    <?php
                    $conn = new mysqli("localhost", "luua4y2c74pm", "@Contact4331", "Cop4331Project1");
					
                	if(mysqli_connect_errno($conn))
                	{
                		echo("Failed to connect to MySQL: " . mysqli_connect_error($conn));
                	}
                	else
                	{
                		$stmt1 = $conn->prepare("SELECT user_id FROM Users WHERE name = ?");
						$stmt1->bind_param("s", $user_check);
						$stmt1->execute();
						$stmt1->bind_result($userId);
						$stmt1->store_result();
						if ($stmt1->num_rows() < 1)
						{
							echo("Error");
						}
						else
						{
							while ($stmt1->fetch())
							{
								$stmt2 = $conn->prepare("SELECT contact_id, name, email, phone, address FROM Contacts WHERE owner_id = ? ORDER BY name");
								$stmt2->bind_param("i", $userId);
								$stmt2->execute();
								$stmt2->bind_result($contactId, $name, $email, $phone, $address);
								$stmt2->store_result();
								while ($stmt2->fetch())
								{
									echo "<tr>";
									echo "<td>" . $name . "</td>";
									echo "<td>" . $email . "</td>";
									echo "<td>" . $phone . "</td>";
									echo "<td>" . $address . "</td>";
									echo "<td><button id='addContact' type='button' class='btn btn-danger' onclick='deleteContact(".$contactId.")'>Delete</button></td>";
									echo "</tr>";
								}
							}
							$stmt1->close();
							$stmt2->close();
							$conn->close();
						}
                	}
                    ?>
                </tbody>
            </table>
        </div>


        <!-- Trigger the modal with a button -->
        <button id="addContactModal" name="addContactModal" type="button" data-toggle="modal" data-target="#myModal" class="btn btn-primary">Add Contact</button>


        <!-- Modal -->
        <div class="modal fade" id="myModal" role="dialog">
            <div class="modal-dialog">
                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Add Contact</h4>
                    </div>
                    <div class="modal-body">
                        <form action="javascript:addContact();" method="POST">
                            <div class="form-group">
                                <label>Name:</label>
                                <input id="contact_name" name="contact_name" type="text" class="form-control" placeholder="Enter contact name" required>
                            </div>
                            <div class="form-group">
                                <label>Email:</label>
                                <input id="contact_email" name="contact_email" type="text" class="form-control" placeholder="Enter contact email">
                            </div>
                            <div class="form-group"> <!-- There is probably a better way to do this -->
                                <label>Phone:</label>
                                <input id="contact_phone" name="contact_phone" type="number" class="form-control" placeholder="Enter contact phone number">
                            </div>
                            <div class="form-group"> <!-- There is probably a better way to do this -->
                                <label>Address:</label>
                                <input id="contact_address" name="contact_address" type="text" class="form-control" placeholder="Enter contact address">
                            </div>
                            <button type="submit" class="btn btn-default">Submit</button>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" onclick="javascript:window.location.reload()" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>

<script>


function searchList() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("contact_table");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}
function deleteContact(contact_id)
{
	var contactId = contact_id;
	var jsonPayload = '{"contact_id" : "' + contactId + '"}';
	var url = 'https://yeetdog.com/ContactProject/delete_contact.php';
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				window.location.reload();
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		alert(err.message);
	}
}
function addContact()
{
	var ownerId = <?php echo json_encode($userId); ?>;
	var contact_name = document.getElementById("contact_name").value;
	var contact_email = document.getElementById("contact_email").value;
	var contact_phone = +document.getElementById("contact_phone").value;
	var contact_address = document.getElementById("contact_address").value;
	var jsonPayload = '{"owner_id" : "' + ownerId + '", "contact_name" : "' + contact_name + '", "contact_email" : "' + contact_email + '", "contact_phone" : "' + contact_phone + '", "contact_address" : "' + contact_address + '"}';
	var url = 'https://yeetdog.com/ContactProject/add_contact.php';
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				window.location.reload();
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		alert(err.message);
	}
}
</script>
