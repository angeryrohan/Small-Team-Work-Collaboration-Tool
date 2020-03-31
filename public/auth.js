//LISTEN FOR AUTH STATUS CHANGE
//firebase method
//keep track of user status (logedIN, or logedOUT)
//not on this basis, you can hide or show content , hellyah!
auth.onAuthStateChanged(user => {
  if (user) {
      // for any change in db, execute:
    db.collection('guides').onSnapshot(snapshot => {
        //pass data into index.JSON
      setupGuides(snapshot.docs);
      setupUI(user);
    }, err => console.log(err.message));
  } else {
    setupUI();
    setupGuides([]);
  }
});

//create new guides
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('guides').add({
        title: createForm['title'].value,
        content: createForm['content'].value
    }).then(() => {
    const modal = document.querySelector('#modal-create');
    M.Modal.getInstance(modal).close();
    createForm.reset();
    }).catch(err => {
        console.log(err.message);
    })
})

//signup
//query elements from DOM (object model)
const signupForm = document.querySelector('#signup-form');
//now add an event listener
signupForm.addEventListener('submit', (e)=> {
    //^ this (e) is an event object through which we can stop reloading process by passsing a function
    //as soon as you click the submit button, HTML triggers reloading, which we don't want because our popup would be gone
e.preventDefault();

// GET USER INFO
//get signupform, and get the calue of elementby id "signup-email"
const email =signupForm['signup-email'].value;
const password=signupForm['signup-password'].value;
console.log(email, password);



//LOGOUT USER
const logout = document.querySelector('#logout');
//if someone clicks an ID 'logout'
logout.addEventListener('click', (e) => {
    e.preventDefault();
    //document.querySelector('#welcometext').innerHTML = '';
    auth.signOut(); //signOut is a firebase method (asynchronus task)
})

//LOGIN FORM
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    //prevent reload
    e.preventDefault();

    //get user info
    //note we have 2 variables namely email and pass but doesn't matter because they both are in different scopes
    const email =loginForm['login-email'].value;
    const password=loginForm['login-password'].value;
    //call firebase method to actually login
    //isme bhi credential milega bhai
    auth.signInWithEmailAndPassword(email, password).then(cred => {
        //close login popup and reset the form
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        loginForm.reset();
    })
})

//SIGN UP THE USER
//firebase function which does what is says, and gets a credential token
auth.createUserWithEmailAndPassword(email, password).then(cred => {
  return db.collection('users').doc(cred.user.uid).set({
      name: signupForm['signup-name'].value
  });

}).then(() => {
// close the signup modal & reset form
const modal = document.querySelector('#modal-signup');
M.Modal.getInstance(modal).close();
signupForm.reset();
});
});