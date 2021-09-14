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

user_name = localStorage.getItem("user_name_key");
room_name = localStorage.getItem("room_name_key");

function getData() {
    firebase.database().ref("/" + room_name).on('value', function (snapshot) {
          document.getElementById("output").innerHTML = "";
          snapshot.forEach(function (childSnapshot) {
                childKey = childSnapshot.key;
                childData = childSnapshot.val();
                if (childKey != "purpose") {
                      subfolder_id = childKey;
                      subfolder_data = childData;
                      db_name = subfolder_data["name"];
                      db_message = subfolder_data["message"];
                      db_like = subfolder_data["like"];
                      name_tag = '<h4>' + db_name + '<img src="tick.png" class="user_tick"></h4>';
                      msg_tag = '<h4 class="message_h4">' + db_message + '</h4>';
                      button_start_tag = '<button id="' + subfolder_id + '"onclick="update_like(this.id)"value="' + db_like + '">';
                      button_text_tag = '<span class="glyphicon glyphicon-thumbs-up">LIKE:' + db_like + '</span></button><hr>';
                      row=name_tag+msg_tag+button_start_tag+button_text_tag;
                      document.getElementById("output").innerHTML+=row;
                }
          });
    });
}
getData();

function logout() {
    localStorage.removeItem("room_name_key");
    localStorage.removeItem("user_name_key");
    window.location = "index.html";
}

function send() {
    msg = document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
          name: user_name,
          message: msg,
          like: 0
    });
    document.getElementById("msg").value = "";
}

function update_like(button_id){
    likes=document.getElementById(button_id).value;
    console.log(button_id);
    update_likes=Number(likes)+1;
    console.log(update_likes);
    firebase.database().ref(room_name).child(button_id).update({
          like:update_likes
    });
}