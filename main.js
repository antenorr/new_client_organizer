// document.addEventListener('DOMContentLoaded', function () {
//     var elems = document.querySelectorAll('.sidenav');
//     var instances = M.Sidenav.init(elems, options);
// });

// Or with jQuery

$(document).ready(function () {
    $('.sidenav').sidenav();
});

var config = {
    apiKey: "AIzaSyC-Q41O3Fg4xg6bvAb5bTadW4fRlmAYuio",
    authDomain: "organization-e9128.firebaseapp.com",
    databaseURL: "https://organization-e9128.firebaseio.com",
    projectId: "organization-e9128",
    storageBucket: "",
    messagingSenderId: "945045948570"
};
firebase.initializeApp(config);

let db = firebase.database();








/******************************************************
 ** Initiate - and grab the intial values from the Database to populate the dom **
 */
db.ref().on("value", (snapShot) => {
    
    // console.log(snapShot.val() );
    // console.log(snapShot.val()["-LIhUfxYLKui1BwKvEqY"] );

    // console.log(snapShot.val().userName);
    // console.log(snapShot.val().lastName);
    // console.log(snapShot.val().userPhone);
    // console.log(snapShot.val().userEmail);
}, (errorObject) => {
    console.log(errorObject.code);
});
 // * **************************************************









/**********************************************************
 * **** When the submit button is pressed - send to the database ***
 */
let submitButton = document.querySelector("#submit-button");
submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    let name = document.querySelector("#input-first-name").value.trim();
    let lastName = document.querySelector("#input-last-name").value.trim();
    let phone = document.querySelector("#input-phone").value.trim();
    let email = document.querySelector("#input-email").value.trim()
    console.log(name, lastName, phone, email);

    // db.ref('users/').push({
    db.ref().push({
        userName: name,
        userLastName: lastName,
        userPhone: phone,
        userEmail: email
        
    });


})
 // * **************************************************
























// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
db.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.key)  //gives me the unique key of each child;
    console.log(childSnapshot.val());

    // Store everything into a variable.
    var userName = childSnapshot.val().userName;
    var userLastName= childSnapshot.val().userLastName;
    var userPhone = childSnapshot.val().userPhone;
    var userEmail = childSnapshot.val().userEmail;

    // Employee Info
 
    // console.log(userName );
    // console.log(userLastName);
    // console.log(userPhone );
    // console.log(userEmail);



    // Create the new row
    var newRow = $(`<tr class=${childSnapshot.key} >`).append(
        $("<td>").text(userName),
        $("<td>").text(userLastName),
        $("<td>").text(userPhone ),
        $("<td>").text(userEmail),
        $("<td>").html(`<a class='btn-floating btn-small waves-effect waves-light red delete-button' id=${ childSnapshot.key }><i class='material-icons'>remove</i></a >`)
    );

    // Append the new row to the table
    $("#employee-table > tbody").append(newRow);
});



$(document).on("click", ".delete-button", (e) => {
    console.log(e.currentTarget.id);
    let magicKey = e.currentTarget.id;
    db.ref().child(magicKey).remove();

    $(`tr.${magicKey}`).remove();
})