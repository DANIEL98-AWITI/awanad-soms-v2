window.onload = function(){

    loadRoro();

};

function loadRoro(){

    let roro = JSON.parse(localStorage.getItem("roroOperations")) || [];

    let table = document.getElementById("roroTable");

    table.innerHTML = "";

    let total = roro.length;
    let discharged = 0;
    let evacuated = 0;

    roro.forEach((u,index)=>{

        if(u.discharged) discharged++;

        if(u.evacuated) evacuated++;

        table.innerHTML += `

<tr>

<td>${u.unitNo}</td>

<td>${u.manifest}</td>

<td>${u.vessel}</td>

<td>${u.customer}</td>

<td>${u.shippingLine}</td>

<td>${u.vehicleType}</td>

<td>

<input
type="checkbox"
${u.discharged ? "checked" : ""}
onchange="toggleDischarged(${index},this.checked)">

</td>

<td>

<input
type="checkbox"
${u.evacuated ? "checked" : ""}
onchange="toggleEvacuated(${index},this.checked)">

</td>

</tr>

`;

    });

    document.getElementById("totalUnits").innerHTML = total;

    document.getElementById("dischargedUnits").innerHTML = discharged;

    document.getElementById("evacuatedUnits").innerHTML = evacuated;

    document.getElementById("yardUnits").innerHTML =
        discharged - evacuated;

}

function toggleDischarged(index,value){

    let roro = JSON.parse(localStorage.getItem("roroOperations")) || [];

    roro[index].discharged = value;

    if(value){

        roro[index].dischargedDate = new Date().toISOString();

    }

    localStorage.setItem("roroOperations",JSON.stringify(roro));

    loadRoro();

}

function toggleEvacuated(index,value){

    let roro = JSON.parse(localStorage.getItem("roroOperations")) || [];

    roro[index].evacuated = value;

    if(value){

        roro[index].evacuatedDate = new Date().toISOString();

    }

    localStorage.setItem("roroOperations",JSON.stringify(roro));

    loadRoro();

}
