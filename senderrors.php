<?php 
	$ToEmail = 'a21resort@gmail.com'; 
	$EmailSubject = 'Errors'; 
	$mailheader = "From: ".$_POST["fullname"]."\r\n"; 
	$mailheader .= "Content-type: text/html; charset=iso-8859-1\r\n"; 
	$MESSAGE_BODY .= "Error: ".nl2br($_POST["error"]).""; 
	mail($ToEmail, $EmailSubject, $MESSAGE_BODY, $mailheader) or die ("Failure"); 
?>