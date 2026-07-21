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

const totalContainers=document.getElementById("totalContainers");
if(totalContainers) totalContainers.innerHTML=containers.length;

const totalVessels=document.getElementById("totalVessels");
if(totalVessels) totalVessels.innerHTML=vessels.length;

const pendingInvoices=document.getElementById("pendingInvoices");
if(pendingInvoices) pendingInvoices.innerHTML=invoices.length;

const totalRoro=document.getElementById("totalRoro");
if(totalRoro) totalRoro.innerHTML=roro.length;

// ================= TODAY OPERATIONS =================

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

// ================= ACTIVITY FEED =================

const activity=document.getElementById("activityFeed");

if(activity){

activity.innerHTML=`
<p>✅ System Started Successfully</p>
<p>🚢 Vessel Module Ready</p>
<p>📦 Container Module Ready</p>
<p>📑 BL Register Ready</p>
`;

}

// ================= LIVE CLOCK =================

function updateClock(){

const liveDate=document.getElementById("liveDate");
const liveClock=document.getElementById("liveClock");

if(!liveDate || !liveClock) return;

const now=new Date();

liveDate.innerHTML=now.toLocaleDateString("en-GB",{
weekday:"short",
day:"2-digit",
month:"short",
year:"numeric"
});

liveClock.innerHTML=now.toLocaleTimeString("en-GB");

}

if(document.getElementById("liveClock")){

updateClock();
setInterval(updateClock,1000);

}

// ================= CHART =================

const weeklyChart=document.getElementById("weeklyChart");

if(weeklyChart && typeof Chart!=="undefined"){

new Chart(weeklyChart,{

type:"line",

data:{

labels:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],

datasets:[

{

label:"Containers",

data:[52,68,71,80,76,92,88],

borderColor:"#1565C0",

backgroundColor:"rgba(21,101,192,.15)",

fill:true,

tension:.4

},

{

label:"RORO",

data:[18,25,27,24,30,35,38],

borderColor:"#18A957",

backgroundColor:"rgba(24,169,87,.15)",

fill:true,

tension:.4

}

]

},

options:{

responsive:true,

maintainAspectRatio:false,

plugins:{

legend:{
position:"top"
}

}

}

});

}
