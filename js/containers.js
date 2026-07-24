window.onload = function () {
    loadContainers();
};

function loadContainers() {

  let containers =DB.get("containerOperations")

    let table = document.getElementById("containerTable");
    table.innerHTML = "";

    let total = containers.length;
    let discharged = 0;
    let evacuated = 0;

    containers.forEach((c,index)=>{

        if(!c.status){
            c.status="Expected";
        }

        if(c.status==="Discharged"){
            discharged++;
        }

        if(c.status==="Evacuated"){
            evacuated++;
        }

        table.innerHTML += `

<tr>

<td>${c.containerNo}</td>

<td>${c.bl}</td>

<td>${c.vessel}</td>

<td>${c.customer}</td>

<td>${c.shippingLine}</td>

<td>${c.size}</td>

<td>

<input
type="checkbox"
${c.discharged ? "checked" : ""}
onchange="toggleDischarged(${index},this.checked)">

</td>

<td>

<input
type="checkbox"
${c.evacuated ? "checked" : ""}
onchange="toggleEvacuated(${index},this.checked)">

</td>
</tr>

`;

    });

    localStorage.setItem("containerOperations",JSON.stringify(containers));

    document.getElementById("totalContainers").innerHTML = total;
    document.getElementById("dischargedContainers").innerHTML = discharged;
    document.getElementById("evacuatedContainers").innerHTML = evacuated;
document.getElementById("yardContainers").innerHTML = discharged - evacuated;
}

function changeStatus(index,status){

    let containers = DB.get("containerOperations")

    containers[index].status = status;

    // Automatically save evacuation date
    if(status=="Evacuated"){

        containers[index].evacuatedDate = new Date().toISOString();

    }

    localStorage.setItem("containerOperations",JSON.stringify(containers));

    loadContainers();

}
function toggleDischarged(index,value){

    let containers =
    DB.get("containerOperations")

    containers[index].discharged = value;

    if(value){

        containers[index].dischargedDate = new Date().toISOString();

    }

    localStorage.setItem("containerOperations",JSON.stringify(containers));

    loadContainers();

}

function toggleEvacuated(index,value){

    let containers =
    DB.get("containerOperations")

    containers[index].evacuated = value;

    if(value){

        containers[index].evacuatedDate = new Date().toISOString();

    }

    localStorage.setItem("containerOperations",JSON.stringify(containers));

    loadContainers();

}
