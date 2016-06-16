# Saintsplex
St. Andrew's Saintsplex

This version of Saintsplex currently runs on Parse. I have removed the configurations for accessing the database such as usernames and passwords but all the files are here. 

In the js folder, you will find keys.js, login.js and main.js. keys.js includes the configuration for initializing with the Parse database. 

login.js is the script called when a user signs in on the home page (index.html). It also saves the user so that if he or she returns, it automatically redirects him or her to the contacts page (contacts.html).

main.js is responsible for  structuring and setting up the page with the contact information. It queries the Parse database for all the students and workers (separate classes in Parse database), sorts through each student and worker to create a page with a list of all the contacts.

Email me @ officialyousafkhan@gmail.com for anymore information. 
