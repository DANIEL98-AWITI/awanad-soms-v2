function login() {

const username = document.getElementById("username").value.trim();
const password = document.getElementById("password").value.trim();

if (username === "admin" && password === "1234") {

window.location.href = "dashboard.html";

} else {

alert("Invalid Username or Password");

}

}
