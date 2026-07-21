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
function updateClock(){

const now=new Date();

document.getElementById("liveDate").innerHTML=
now.toLocaleDateString("en-GB",{
weekday:"short",
day:"2-digit",
month:"short",
year:"numeric"
});

document.getElementById("liveClock").innerHTML=
now.toLocaleTimeString();

}

setInterval(updateClock,1000);

updateClock();
// ================= WEEKLY CHART =================

const chartCanvas = document.getElementById("weeklyChart");

if(chartCanvas){

new Chart(chartCanvas,{

type:"bar",

data:{

labels:[
"Mon",
"Tue",
"Wed",
"Thu",
"Fri",
"Sat",
"Sun"
],

datasets:[

{

label:"Containers",

data:[52,68,71,80,76,92,88],

backgroundColor:"#1565C0",

borderRadius:8

},

{

label:"RORO",

data:[21,26,24,29,31,35,33],

backgroundColor:"#18a957",

borderRadius:8

}

]

},

options:{

responsive:true,

plugins:{

legend:{
position:"top"
}

},

scales:{

y:{
beginAtZero:true
}

}

}

});

}
