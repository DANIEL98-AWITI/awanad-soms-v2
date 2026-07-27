window.onload = function(){

    loadBulk();

};

function loadBulk(){

    let bulk = JSON.parse(localStorage.getItem("bulkOperations")) || [];

    let table = document.getElementById("bulkTable");

    table.innerHTML = "";

    let total = bulk.length;
    let discharged = 0;
    let delivered = 0;

    bulk.forEach((b,index)=>{

        if(b.discharged) discharged++;

        if(b.delivered) delivered++;

        table.innerHTML += `

<tr>

<td>${b.manifest}</td>

<td>${b.cargoType}</td>

<td>${b.vessel}</td>

<td>${b.cargo}</td>

<td>${b.customer}</td>

<td>${b.quantity} ${b.unit}</td>

<td>

<input
type="number"
value="${b.dischargedQty || 0}"
style="width:90px"
onchange="updateDischarged(${index},this.value)">

</td>

<td>

<input
type="number"
value="${b.deliveredQty || 0}"
style="width:90px"
onchange="updateDelivered(${index},this.value)">

</td>

<td>

${(b.quantity||0) - (b.deliveredQty||0)}

</td>

</tr>

`;

    });

    document.getElementById("totalBulk").innerHTML = total;

    document.getElementById("bulkDischarged").innerHTML = discharged;

    document.getElementById("bulkDelivered").innerHTML = delivered;

    document.getElementById("bulkYard").innerHTML =
        discharged - delivered;

}

function toggleBulkDischarged(index,value){

    let bulk = JSON.parse(localStorage.getItem("bulkOperations")) || [];

    bulk[index].discharged = value;

    if(value){

        bulk[index].dischargedDate = new Date().toISOString();

    }

    localStorage.setItem("bulkOperations",JSON.stringify(bulk));

    loadBulk();

}

function toggleBulkDelivered(index,value){

    let bulk = JSON.parse(localStorage.getItem("bulkOperations")) || [];

    bulk[index].delivered = value;

    if(value){

        bulk[index].deliveredDate = new Date().toISOString();

    }

    localStorage.setItem("bulkOperations",JSON.stringify(bulk));

    loadBulk();

}
