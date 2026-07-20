// ================= LOGIN =================

function login() {

const username = document.getElementById("username")?.value.trim();
const password = document.getElementById("password")?.value.trim();

if (username === "admin" && password === "1234") {

localStorage.setItem("loggedIn","true");
window.location.href = "dashboard.html";

} else {

alert("Invalid Username or Password");

}

}

// ================= AUTH =================

if (window.location.pathname.includes("dashboard.html")) {

if (localStorage.getItem("loggedIn") !== "true") {

window.location.href = "index.html";

}

}

// ================= LOGOUT =================

function logout(){

localStorage.removeItem("loggedIn");

window.location.href="index.html";

}

// ================= DASHBOARD =================

const containers = JSON.parse(localStorage.getItem("containers")) || [];
const vessels = JSON.parse(localStorage.getItem("vessels")) || [];
const invoices = JSON.parse(localStorage.getItem("invoices")) || [];
const roro = JSON.parse(localStorage.getItem("roro")) || [];

if(document.getElementById("totalContainers"))
document.getElementById("totalContainers").innerHTML=containers.length;

if(document.getElementById("totalVessels"))
document.getElementById("totalVessels").innerHTML=vessels.length;

if(document.getElementById("pendingInvoices"))
document.getElementById("pendingInvoices").innerHTML=invoices.length;

if(document.getElementById("totalRoro"))
document.getElementById("totalRoro").innerHTML=roro.length;

const tbody=document.getElementById("todayOperations");

if(tbody){

tbody.innerHTML="";

vessels.forEach(v=>{

tbody.innerHTML+=`

<tr>

<td>${v.name || "-"}</td>

<td>${v.cargo || "-"}</td>

<td>${v.status || "Expected"}</td>

</tr>

`;

});

}

const activity=document.getElementById("activityFeed");

if(activity){

activity.innerHTML="";

activity.innerHTML+=`
<p>✅ System Started Successfully</p>
<p>🚢 Vessel Module Ready</p>
<p>📦 Container Module Ready</p>
<p>📑 BL Register Ready</p>
`;

}
