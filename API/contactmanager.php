<?php

    //include("displayAllContactsForUser.php");
    session_start();
    $input = file_get_contents('php://input');

    echo(user_id);
    $user = $_SESSION['username']

    if(isset($_SESSION['username']))
    {
        header("location: ../HTML/userContactsPage.html");
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

				<div id="formsDiv">

					<!-- SEARCH FORM -->

					<form class="myForm" id="searchForm" onsubmit="sendSearchRequest();return false">

						<div class="formGroup">
							<input type="text" placeholder="Search contacts..." name="search" id="search">
							<div class="btnContainer">
								<input type="submit" class="button" name="search" value="Search">
								<input type="button" class="button2" id="cancelSearchBtn" onclick="displayAllContacts(); cancelSearch();" value="Cancel">
							</div>
						</div>

					</form>

					<!-- ADD CONTACT FORM -->

					<form class="myForm" id="contactForm" onsubmit="addContact();return false" style="display:none; visibility:hidden;">

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

					<form class="myForm" id="deleteForm" onsubmit="sendDeleteRequest();return false" style="display:none; visibility:hidden;">

						<p>Please select the contact(s) to be deleted.</p>

						<div class="btnContainer">
							<input type="submit" class="button" name="deleteContact" value="Delete Selection">
							<input type="button" class="button2" id="cancelDeleteContactBtn" onclick="cancelDeleteContact();" value="Cancel">
						</div>

					</form>

					<!-- EDIT FORM -->

					<form class="myForm" id="editForm" onsubmit="sendEditRequest();return false" style="display:none; visibility:hidden;">

						<p>Please select the contact to be edited.</p>

						<div class="btnContainer">
							<input type="submit" class="button" name="editContact" value="Edit Selection">
							<input type="button" class="button2" id="cancelEditContactBtn" onclick="cancelEditContact();" value="Cancel">
						</div>

					</form>

				</div> <!-- End formsDiv -->

				<div id="contactsDisplay">

					<table id="contactTable">
						<thead>
							<tr id="firstRow">
								<th name="lastname">Last Name</th>
								<th name="firstname">First Name</th>
								<th name="email">Email</th>
								<th name="phone">Phone Number</th>
								<th name="address">Address</th>
							</tr>
						</thead>
						<tbody id="tableBody">
							<tr class="blankRow">
								<td name="lastname"></td>
								<td name="firstname"></td>
								<td name="email"></td>
								<td name="phone"></td>
								<td name="address"></td>
							</tr>
								<tr class="blankRow">
								<td name="lastname"></td>
								<td name="firstname"></td>
								<td name="email"></td>
								<td name="phone"></td>
								<td name="address"></td>
							</tr>
								<tr class="blankRow">
								<td name="lastname"></td>
								<td name="firstname"></td>
								<td name="email"></td>
								<td name="phone"></td>
								<td name="address"></td>
							</tr>
								<tr class="blankRow">
								<td name="lastname"></td>
								<td name="firstname"></td>
								<td name="email"></td>
								<td name="phone"></td>
								<td name="address"></td>
							</tr>
								<tr class="blankRow">
								<td name="lastname"></td>
								<td name="firstname"></td>
								<td name="email"></td>
								<td name="phone"></td>
								<td name="address"></td>
							</tr>
								<tr class="blankRow">
								<td name="lastname"></td>
								<td name="firstname"></td>
								<td name="email"></td>
								<td name="phone"></td>
								<td name="address"></td>
							</tr>
								<tr class="blankRow">
								<td name="lastname"></td>
								<td name="firstname"></td>
								<td name="email"></td>
								<td name="phone"></td>
								<td name="address"></td>
							</tr>
								<tr class="blankRow">
								<td name="lastname"></td>
								<td name="firstname"></td>
								<td name="email"></td>
								<td name="phone"></td>
								<td name="address"></td>
							</tr>
								<tr class="blankRow">
								<td name="lastname"></td>
								<td name="firstname"></td>
								<td name="email"></td>
								<td name="phone"></td>
								<td name="address"></td>
							</tr>
								<tr class="blankRow">
								<td name="lastname"></td>
								<td name="firstname"></td>
								<td name="email"></td>
								<td name="phone"></td>
								<td name="address"></td>
							</tr>
								<tr class="blankRow">
								<td name="lastname"></td>
								<td name="firstname"></td>
								<td name="email"></td>
								<td name="phone"></td>
								<td name="address"></td>
							</tr>
								<tr class="blankRow">
								<td name="lastname"></td>
								<td name="firstname"></td>
								<td name="email"></td>
								<td name="phone"></td>
								<td name="address"></td>
							</tr>
								<tr class="blankRow">
								<td name="lastname"></td>
								<td name="firstname"></td>
								<td name="email"></td>
								<td name="phone"></td>
								<td name="address"></td>
							</tr>
							<tr class="blankRow">
								<td name="lastname"></td>
								<td name="firstname"></td>
								<td name="email"></td>
								<td name="phone"></td>
								<td name="address"></td>
							</tr>
						</tbody>
					</table>

				</div> <!-- End contactsDisplay -->

			</div> <!-- End contactsBox -->

		</div> <!-- End userInterfaceDiv -->

		<a href="../../../index.html">login page</a>

	</body>

</html>
