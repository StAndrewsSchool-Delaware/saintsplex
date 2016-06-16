<?php 
	$ToEmail = 'a21resort@gmail.com'; 
	$EmailSubject = 'New Contact to Add'; 
	$mailheader = "From: ".$_POST["user_email"]."\r\n"; 
	$mailheader .= "Reply-To: ".$_POST["user_email"]."\r\n"; 
	$mailheader .= "Content-type: text/html; charset=iso-8859-1\r\n"; 
	$MESSAGE_BODY = "Name: ".$_POST["fullname"].""; 
	$MESSAGE_BODY .= "Email: ".$_POST["user_email"].""; 
	$MESSAGE_BODY .= "Cell Phone: ".$_POST["cellphone"].""; 
	$MESSAGE_BODY .= "Day Phone: ".$_POST["dayphone"].""; 
	$MESSAGE_BODY .= "Evening Phone: ".nl2br($_POST["eveningphone"]).""; 
	mail($ToEmail, $EmailSubject, $MESSAGE_BODY, $mailheader) or die ("Failure"); 
?>