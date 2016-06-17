$(document).ready(function() {

	var redirect = function() {
		var redirect = window.location.href+"/contacts.html";
		window.location.replace(redirect);
	}


	$('.form-signin').submit(function(event) {
		event.preventDefault();
		var pass = event.target[0].value; // Gets pass from the form

		Parse.User.logIn('sas', pass, {
			success: function(results) {
				redirect();
			},
			error: function() {

			}
		});
	});

	if (Parse.User.current()) {
		redirect();
		Parse.User.logOut();
	}
});