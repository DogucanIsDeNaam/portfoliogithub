window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink functie
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink', 'shadow')
        } else {
            navbarCollapsible.classList.add('navbar-shrink', 'shadow')
        }

    };

    // Shrink de navbar 
    navbarShrink();

    // Shrink de navbar wanneer je naar beneden scrollt
    document.addEventListener('scroll', navbarShrink);

    // Activeer Bootstrap scrollspy op main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar wanneer toggler zichtbaar is
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

// ====================================================
// CONTACT VALIDATION/section START ===================
// ====================================================
/*
	First of all, i need access to:
	- the form element to access the input values,
	- error element,
	- success element,
	- submit button,
	- and please-wait element.
*/
let form = document.forms['contact-form'];
let error = document.querySelector(".error");
let success = document.querySelector(".success");
let submitButton = document.querySelector("form button");
let pleaseWaitMessage = document.querySelector(".please-wait");
let pleaseWaitMessage2 = document.querySelector(".please-wait2");
let pleaseWaitMessage3 = document.querySelector(".please-wait3");

//loading class als een variabel


/* Next i am going to write some functions to make things more clearer */

/* I write a function to disable the submit button when we send the message, and also
display a "please wait" message */
function disableButton(){
	submitButton.disabled = true;
	submitButton.classList.add("disabled");

	pleaseWaitMessage.loading = true;
	pleaseWaitMessage.classList.add("loading");

	pleaseWaitMessage2.loading = true;
	pleaseWaitMessage2.classList.add("loading");

	pleaseWaitMessage2.triangle = true;
	pleaseWaitMessage2.classList.add("loading");

	pleaseWaitMessage3.triangle = true;
	pleaseWaitMessage3.classList.add("loading");
}

/* Next i write a function to enable the submit button and clear the "please-wait" message */
function enableButton(){
	submitButton.disabled = false;
	submitButton.classList.remove("disabled");

	pleaseWaitMessage.loading = false;
	pleaseWaitMessage.classList.remove("loading");

	pleaseWaitMessage2.loading = false;
	pleaseWaitMessage2.classList.remove("loading");

	pleaseWaitMessage3.loading = false;
	pleaseWaitMessage3.classList.remove("loading");
}

/* Next i write a function to clear the error element */
function clearError(){
	error.innerHTML = "";
	error.style.display = "";
}

/* And the last function i need is to clear the form when the message is send successfully */
function clearForm(){
	// I clear all the form fields and the please-wait message.
	form.firstname.value = "";
	form.email.value = "";
	form.message.value = "";
	pleaseWaitMessage.innerHTML = "";

	 // Next i will set a timer to clear the success message and enable the submit
	 // button, after 5 seconds.
	setTimeout(function(){
		success.style.display = "";
		success.innerHTML = "";
		submitButton.disabled = false;
		submitButton.classList.remove("disabled");
		
		pleaseWaitMessage.loading = false;
		pleaseWaitMessage.classList.remove("loading");
	}, 5000);
}

/*
	Next i need an onsubmit event-listener to catch the form when we press
	the submit button.
	Also i will pass as a parameter the event-object, to prevent the form
	sending the values to the server.
*/
form.addEventListener("submit", function(e){
	e.preventDefault(); /* Stopping the form to send values to the server */

	/* Next i will create an object to hold the form fields "names" and "values".
	I will send that object to the php file. */
	let formdata = {
		"name": this.firstname.value,
		"email": this.email.value,
		"message": this.message.value
	}

	/* Next i will loop through the formdata object and check if all fields have values */
	for(let [key, value] of Object.entries(formdata)){
		if(value === ""){
			// if there is an empty field we are displaying an error message, and stop
			// the function. There is no point to let the function running.
			error.style.display = "block";
			error.innerHTML = "ᕙ( ︡'︡益'︠)ง All fields with '*' are required";
			return false;
		}else{
			// we clear the error field in case there was an error from a previous submit.
			clearError();
		}
	}

	/* Now outside the for loop, we have send the data to the server (php file),
	but first i have to convert	them to a JSON string */
	let JSONdata = JSON.stringify(formdata);

	/* To send the data to the server i need an XMLHttpRequest. */
	let http = new XMLHttpRequest();
	/* Next i need to prepare the request with the .open method */
	http.open('post', "script.php", true);
	/* Next i will set the request header.
	I will set the "content-type to "application/x-www-form-urlencoded", so that
	the data is send as key => value pairs " */
	http.setRequestHeader("content-type", "application/x-www-form-urlencoded");
	/* and last i will send the request, disable the submit button,
	and showing the please wait message */
	http.send('message=' + JSONdata);
	disableButton();

	/* now i have to catch the servers response.
	/* I will run the onreadystatechange event-handler. */
	http.onreadystatechange = function(){
		/* then i have to check the readyState and status properties. */
		if(this.readyState == 4 && this.status == 200){
			/* if the request was successful, i will catch the response with the
			responseText property. */
			let response = this.responseText;
			/* lets check now the incoming messages */
			if(response.indexOf("Error") != -1){
				/* If the message is an error, we display it. */
				error.style.display = "block";
				error.innerHTML = response;
				/* and i have to enable back the submit button, because we want the user
				to correct his error and submit the form again. */
				enableButton();
			}else{
				/* If the response is the success message, i clear any error.  */
				clearError();
				/* and i display the success message. */
				success.style.display = "block";
				success.innerHTML = response;
				/* and last i clear the contact form */
				clearForm();
			}
		};
	}
});

// ================================
// Back to Top scroll START =======
// ================================

//Get the button
let mybutton = document.getElementById("btn-back-to-top");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 20 ||
    document.documentElement.scrollTop > 20
  ) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}
// When the user clicks on the button, scroll to the top of the document
mybutton.addEventListener("click", backToTop);

function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// ================================
// Back to Top scroll START =======
// ================================