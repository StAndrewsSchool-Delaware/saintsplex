$(document).ready(function () {

    var workersData;
    var studentsData;

    var workersQuery = new Parse.Query("Worker");
    workersQuery.addAscending("fname");
    workersQuery.limit(1000);
    workersQuery.find().then(function(results) {
        workersData = results;

        var studentsQuery = new Parse.Query("Student");
        studentsQuery.addAscending("fname");
        studentsQuery.find().then(function(results){

            studentsData = results;

            for (var i = 0; i < workersData.length; i++) {
                drawWorkerContact(workersData[i].id, workersData[i].attributes);
            }

            for (var i = 0; i < studentsData.length; i++) {
                drawStudentContact(studentsData.id, studentsData[i].attributes);
            }

            refresh();

        });
    });

    var drawWorkerContact = function(id, contact) {

        if (typeof contact.position === 'undefined') {
            contact.position = 'Worker';
        }

        if (typeof contact.fname === 'undefined') {
            contact.fname = '';
        }

        if (typeof contact.lname === 'undefined') {
            contact.lname = '';
        }

        if (typeof contact.dayphone === 'undefined') {
            contact.dayphone = 'Unavailable';
        }

        if (typeof contact.cellphone === 'undefined') {
            contact.cellphone = 'Unavailable';
        }

        if (typeof contact.eveningphone === 'undefined') {
            contact.eveningphone = 'Unavailable';
        }

        if (typeof contact.picture === 'undefined') {
            contact.picture = 'http://congress.gov.ph/images/unknown.profile.png';
        }

        var contant_li = $("<li />", {
             "data-filtertext": contact.fname + " "
                              + contact.lname + " "
                              +  "Position " + contact.position + " "
                              + contact.dayphone.replace(/-/gi, '')  + " "
                              + contact.eveningphone.replace(/-/gi, '') + " "
                              + contact.cellphone.replace(/-/gi,'') + " "
                     });

        var contant_href = $("<a />", {
            "text": contact.fname + " " + contact.lname,
            "data-contact-id": id
        });

        var contant_div = $("<div />", {
                                 "text": contact.position,
                                 "class": "badge badge-info"
                                });

        $(contant_li).append(contant_href);
        $(contant_href).append(contant_div);
        $("#main-contact-list").append(contant_li);


    }

    var drawStudentContact = function(id, contact) {

        if (typeof contact.form === 'undefined') {
            contact.form = 'Student';
        }

        if (typeof contact.fname === 'undefined') {
            contact.fname = '';
        }

        if (typeof contact.lname === 'undefined') {
            contact.lname = '';
        }


        if (typeof contact.cellphone === 'undefined') {
            contact.cellphone = 'Unavailable';
        }

        if (typeof contact.room === 'undefined') {
            contact.room = 'Unavailable';
        }

        var contant_li = $("<li />", {
                "data-filtertext":  contact.fname + " "
                                + contact.lname + " "
                                + contact.cellphone.replace(/-/gi, '')  + " "
                                + "Room " + contact.room + " "
                                + "Form " + contact.form
                            });

        var contant_href = $("<a />", {
            "text": contact.fname + " " + contact.lname,
            "data-contact-id": id
        });

        var contant_div = $("<div />", {
                                 "text": contact.form,
                                 "class": formColor(contact.form)
                                });

        $(contant_li).append(contant_href);
        $(contant_href).append(contant_div);
        $("#main-contact-list").append(contant_li);

    }

    function formColor (form) {
        switch (form) {
            case "Freshmen":
                return "badge badge-success"
                break;
            case "Sophomore":
                return "badge badge-danger"
                break;
            case "Junior":
                return "badge badge-info"
                break;
            case "Senior":
                return "badge badge-warning"
                break;
            default:
                return "badge badge-info"
        }
    }

    var refresh = function() {
        //when you add dynamic data to a jquerymobile listview -
        //you have to refresh it
        $("#main-contact-list").listview('refresh');

        //hide the ajax loader image and show the listview
       // $("div.loader").hide(0, function () {
        $("#main-contact-list").fadeIn();
    }

    var get_contact_by_id = function (contact_id) {
        var contact;

        for (var i = 0; i < workersData.length; i++) {
            if (workersData[i].id == contact_id) {
                return workersData[i];
            }
        }

        if (!contact) {
            for (var i = 0; i < studentsData.length; i++) {
                if (studentsData[i].id == contact_id) {
                    return studentsData[i];
                }
            }
        }
    };

    //function to handle the click of a contact
    $("body").delegate("#main-contact-list li a", "tap", function (event, ui) {
        event.preventDefault();

        //get the appropriate contact from the json object and paint the details pane
        var contact = get_contact_by_id($(this).attr("data-contact-id"));

        if (contact.className == "Worker") {
             if ( contact.get('position') != "Staff" )
             {

                $("div.name").html(contact.get('fname') + " " + contact.get('lname'));
                //$("div.email").html(contact.email);
                $("div.position").html(contact.get('position'));
                $("div.dayPhone").html("<a class='ui-link' href='tel:" + contact.get('dayphone') + "'>" + contact.get('dayphone') + "</a>");
                $("div.cellPhone").html("<a class='ui-link' href='tel:" + contact.get('cellphone') + "'>" + contact.get('cellphone') + "</a>");
                $("div.eveningPhone").html("<a class='ui-link' href='tel:" + contact.get('eveningphone') + "'>" + contact.get('eveningphone') + "</a>");
                $("div.picture").html("<img class='profilePic' src='" + contact.get('picture') + "'>");

                //after the details pane is painted, navigate user to details view
                //
                $.mobile.changePage("#contact-details", { transition: "slidefade" });

             } else {
                $("div.name").html(contact.get('fname') + " " + contact.get('lname'));
                //$("div.email").html(contact.email);
                $("div.position").html(contact.get('position'));
                $("div.dayPhone").html("<a class='ui-link' href='tel:" + contact.get('dayphone') + "'>" + contact.get('dayphone') + "</a>");
                $("div.cellPhone").html("Unavailable");
                $("div.eveningPhone").html("Unavailable");
                $("div.picture").html("<img class='profilePic' src='" + contact.get('picture') + "'>");

                $.mobile.changePage("#contact-details", { transition: "slidefade" });
             }

        } else {
            $("div.student-name").html(contact.get('fname') + " " + contact.get('lname'));
            //$("div.email").html(contact.email);
            $("div.student-form").html(contact.get('form'));
            $("div.student-cellPhone").html("<a class='ui-link' href='tel:" + contact.get('cellphone') + "'>" + contact.get('cellphone') + "</a>");
            $("div.student-picture").html("<img class='profilePic' src='" + contact.get('picture') + "'>");
            //$("div.roommates").html();
            $.mobile.changePage("#student-contact-details", { transition: "slidefade" });
        }

    });
});
