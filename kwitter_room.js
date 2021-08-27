//ADD YOUR FIREBASE LINKS HERE

var firebaseConfig = {
    apiKey: "AIzaSyAy737hxak2YjGoJhIqfm5DU7tcQ_aQefU",
    authDomain: "kwitter-e58c3.firebaseapp.com",
    databaseURL: "https://kwitter-e58c3-default-rtdb.firebaseio.com",
    projectId: "kwitter-e58c3",
    storageBucket: "kwitter-e58c3.appspot.com",
    messagingSenderId: "748987634119",
    appId: "1:748987634119:web:26a58e3057f8beb054c9e2"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function getData() {
    firebase.database().ref("/").on('value', function (snapshot) {
          document.getElementById("output").innerHTML = "";
          snapshot.forEach(function (childSnapshot) {
                childKey = childSnapshot.key;
                Room_names = childKey;

                //Start code
                row = '<div class="room_name" id="' + Room_names + '" onclick="redirect(this.id)">' + Room_names + '</div><hr>';
                document.getElementById("output").innerHTML += row;
                //End code
          });
    });
}
getData();

user_name = localStorage.getItem("user_name");

document.getElementById("user_name").innerHTML = "Welcome " + user_name + "!";

