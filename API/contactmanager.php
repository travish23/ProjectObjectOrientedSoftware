<?php
   
	
	
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


				
                    <?php
include("../HTML/userContactsPage.html");
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
