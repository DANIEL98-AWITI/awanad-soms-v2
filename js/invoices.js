window.onload = function(){

    loadVessels();

    document
        .getElementById("invoiceVessel")
        .addEventListener("change",loadInvoiceDetails);

};

function loadVessels(){

    let select=document.getElementById("invoiceVessel");

    select.innerHTML="<option value=''>Select Vessel</option>";

    let containers=JSON.parse(localStorage.getItem("containerOperations"))||[];
    let roro=JSON.parse(localStorage.getItem("roroOperations"))||[];
    let bulk=JSON.parse(localStorage.getItem("bulkOperations"))||[];

    let vessels=[];

    containers.forEach(c=>{
        if(!vessels.includes(c.vessel))
            vessels.push(c.vessel);
    });

    roro.forEach(r=>{
        if(!vessels.includes(r.vessel))
            vessels.push(r.vessel);
    });

    bulk.forEach(b=>{
        if(!vessels.includes(b.vessel))
            vessels.push(b.vessel);
    });

    vessels.forEach(v=>{

        select.innerHTML+=
        `<option value="${v}">${v}</option>`;

    });

}

function loadInvoiceDetails(){

    let vessel=document.getElementById("invoiceVessel").value;

    if(vessel=="") return;

    let containers=JSON.parse(localStorage.getItem("containerOperations"))||[];
    let roro=JSON.parse(localStorage.getItem("roroOperations"))||[];
    let bulk=JSON.parse(localStorage.getItem("bulkOperations"))||[];

    // ==========================
    // CONTAINERS
    // ==========================

    let c=containers.filter(x=>x.vessel==vessel);

    if(c.length>0){

        document.getElementById("invoiceCustomer").value=c[0].customer;

        document.getElementById("invoiceCategory").value="Containers";

        document.getElementById("invoiceCommodity").value="Containers";

        document.getElementById("invoiceQuantity").value=c.length;

        document.getElementById("invoiceUnit").value="Containers";

        return;

    }

    // ==========================
    // RORO
    // ==========================

    let r=roro.filter(x=>x.vessel==vessel);

    if(r.length>0){

        document.getElementById("invoiceCustomer").value=r[0].customer;

        document.getElementById("invoiceCategory").value="RORO";

        document.getElementById("invoiceCommodity").value="Vehicles";

        document.getElementById("invoiceQuantity").value=r.length;

        document.getElementById("invoiceUnit").value="Units";

        return;

    }

    // ==========================
    // BULK
    // ==========================

    let b=bulk.find(x=>x.vessel==vessel);

    if(b){

        document.getElementById("invoiceCustomer").value=b.customer;

        document.getElementById("invoiceCategory").value=b.cargoType;

        document.getElementById("invoiceCommodity").value=b.cargo;

        document.getElementById("invoiceQuantity").value=b.quantity;

        document.getElementById("invoiceUnit").value=b.unit;

    }

}
