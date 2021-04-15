// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyDh7Yz4Zr02xNxhS9xngxogHpO2XZ5MjFs",
  authDomain: "vishal-sawai.firebaseapp.com",
  projectId: "vishal-sawai",
  storageBucket: "vishal-sawai.appspot.com",
  messagingSenderId: "434001729051",
  appId: "1:434001729051:web:288f4030ba2bda08858abe",
  measurementId: "G-P0HWXLVTQC"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();



function store() {
  var pname = document.getElementById('pname').value;
  var plink = document.getElementById('plink').value;

  db.collection("Project").doc(pname).set({
    // ProjectNo: pno,
    ProjectName: pname,
    ProjectLink: plink
  })
    .then(function () {
      alert(pname + " Project Submited");
    });



  // pname = document.getElementById("pname").value;
  var uploadTask = firebase.storage().ref("ProjectImage/" + pname + ".png").put(files[0]);

  uploadTask.on('state_changed', function (snapshot) {
    var progress = (snapshot.bytesTranferred/snapshot.totalBytes)*100;
    document.getElementById("UpProgress").innerHTML = "upload" + progress + "%";
  },
    function (error) {
      alert("error in saving the image");
    },
    function () {
      uploadTask.snapshot.ref.getDownloadURL().then(function(url){
        ImgUrl = url;

        db.collection("Project").doc(pname).update({
          Link: ImgUrl
        });
        alert("Image added successfully");
        });
    });
}

// variables

var ImgUrl;
var files = [];
var reader = new FileReader();

document.getElementById("select").onclick = function (e) {

  var input = document.createElement("input");
  input.type = "file";

  input.onchange = e => {
    files = e.target.files;
    reader = new FileReader();
    reader.onload = function () {
      document.getElementById("myimg").src = reader.result;
    }
    reader.readAsDataURL(files[0]);
  }
  input.click();
}

// login
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
      document.getElementById("user_div").style.display = "block";
      document.getElementById("login_div").style.display = "none";
      console.log(user);
  } else {
      document.getElementById("user_div").style.display = "none";
      document.getElementById("login_div").style.display = "block";
      console.log(user);
  }
});

function login() {

  var UserEmail = document.getElementById("lmail").value;
  var UserPass = document.getElementById("lpassword").value;

  firebase.auth().signInWithEmailAndPassword(UserEmail, UserPass).catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      window.alert("Error" + error)

  });
}
const LogOut = () => {
  firebase.auth().signOut().then(() => {
      // Sign-out successful.
      alert("Logout successful");
      // location.replace("patient.html");
  })
      .catch((error) => {
          // An error happened.
          alert("Error: " + error);
      });
};
