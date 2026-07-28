window.onload = function(){

    loadVessels();

}

function loadVessels(){

    let select = document.getElementById("invoiceVessel");

    select.innerHTML =
    "<option value=''>Select Vessel</option>";

    // Containers
    let containers =
    JSON.parse(localStorage.getItem("containerOperations")) || [];

    // RORO
    let roro =
    JSON.parse(localStorage.getItem("roroOperations")) || [];

    // Bulk & Packages
    let bulk =
    JSON.parse(localStorage.getItem("bulkOperations")) || [];

    let vessels = [];

    containers.forEach(c=>{

        if(!vessels.includes(c.vessel)){

            vessels.push(c.vessel);

        }

    });

    roro.forEach(r=>{

        if(!vessels.includes(r.vessel)){

            vessels.push(r.vessel);

        }

    });

    bulk.forEach(b=>{

        if(!vessels.includes(b.vessel)){

            vessels.push(b.vessel);

        }

    });

    vessels.forEach(v=>{

        select.innerHTML +=
        `<option value="${v}">${v}</option>`;

    });

}
