//DOM related code
//ul wala class = guides
const guideList = document.querySelector('.guides');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');

const setupUI = (user) => {
	if(user) {
		//display user info
		db.collection('users').doc(user.uid).get().then(doc => {
			const html=`
			<div class="accinfo">Logged In as ${user.email}</div>
			<div class="accinfo">User Name: ${doc.data().name}</div>
			`;
			accountDetails.innerHTML =html;
			const heading = document.querySelector('#welcometext');
			const numItems = $('.col').children('.sticky-action').length;
			M.toast({html: "Hey " + doc.data().name + ", You have " + numItems + " tasks left to do"})
		});
		

		//toggle UI elements
		loggedInLinks.forEach(item => item.style.display = 'block');
		loggedOutLinks.forEach(item => item.style.display = 'none');
	}
	else {
		loggedInLinks.forEach(item => item.style.display = 'none');
		loggedOutLinks.forEach(item => item.style.display = 'block');
		accountDetails.innerHTML =``;
	}
}
//setup guides
const setupGuides = (data) => {
	if(data.length) {
	let html= '';
	data.forEach(doc => { 
		const guide = doc.data();
		// we use (`) in js for HTML Templating
		//here we are dynamically making divs and loading data from our servers into these DIVs
		const li = `
<div class="col s4">
		<div class="card sticky-action">
		<div class="card-image waves-effect waves-block waves-light">
		  <img class="activator" src="https://materializecss.com/images/office.jpg">
		</div>
		<div class="card-content">
		<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
		  <span class="card-title activator grey-text text-darken-4">${guide.title}<i class="material-icons right">more_vert</i></span>
		  <p><a href="#" class="white black-text btn-small">Enquire</a>
		  <a href="#" class="waves-effect waves-light btn-small">Submit Task</a>
		  </p>
		</div>
		<div class="card-reveal">
		  <span class="card-title grey-text text-darken-4">${guide.title}<i class="material-icons right">close</i></span>
		  <p>${guide.content}</p>
		</div>
	  </div>
</div>
		`;
		html += li;
	});
	guideList.innerHTML =  html;
} else {
		guideList.innerHTML = `<h5 class="center-align">Welcome To Deltask, Login to Proceed</h5>`;
}
}

// setup materialize components
document.addEventListener('DOMContentLoaded', function() {
// ^ while the page is loading, do this 
	var modals = document.querySelectorAll('.modal');
	M.Modal.init(modals);
  
	var items = document.querySelectorAll('.collapsible');
	M.Collapsible.init(items);
  
  });

  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
  });

  // Or with jQuery

  $(document).ready(function(){
	$('select').formSelect();
	
  });
  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.datepicker');
  });

  // Or with jQuery

  $(document).ready(function(){
    $('.datepicker').datepicker();
  });

  // Or with jQuery
  $(document).ready(function(){
    $('.tabs').tabs();
  });