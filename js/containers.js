window.onload = function () {
    loadContainers();
};

function loadContainers() {

    let containers = JSON.parse(localStorage.getItem("containerOperations")) || [];

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

<select onchange="changeStatus(${index},this.value)">

<option value="Expected" ${c.status=="Expected"?"selected":""}>Expected</option>

<option value="Discharged" ${c.status=="Discharged"?"selected":""}>Discharged</option>

<option value="Evacuated" ${c.status=="Evacuated"?"selected":""}>Evacuated</option>

</select>

</td>

</tr>

`;

    });

    localStorage.setItem("containerOperations",JSON.stringify(containers));

    document.getElementById("totalContainers").innerHTML = total;
    document.getElementById("dischargedContainers").innerHTML = discharged;
    document.getElementById("evacuatedContainers").innerHTML = evacuated;

}

function changeStatus(index,status){

    let containers = JSON.parse(localStorage.getItem("containerOperations")) || [];

    containers[index].status = status;

    localStorage.setItem("containerOperations",JSON.stringify(containers));

    loadContainers();

}
