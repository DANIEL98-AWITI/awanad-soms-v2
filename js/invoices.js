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

    let invoices=
    JSON.parse(localStorage.getItem("invoiceRegister")) || [];

    let containers=
    JSON.parse(localStorage.getItem("containerOperations")) || [];

    let roro=
    JSON.parse(localStorage.getItem("roroOperations")) || [];

    let bulk=
    JSON.parse(localStorage.getItem("bulkOperations")) || [];

    let totalQty=0;
    let category="";
    let commodity="";
    let customer="";
    let unit="";

    // ================= CONTAINERS =================

    let c=containers.filter(x=>x.vessel==vessel);

    if(c.length>0){

        totalQty=c.length;
        category="Containers";
        commodity="Containers";
        customer=c[0].customer;
        unit="Containers";

    }

    // ================= RORO =================

    let r=roro.filter(x=>x.vessel==vessel);

    if(r.length>0){

        totalQty=r.length;
        category="RORO";
        commodity="Vehicles";
        customer=r[0].customer;
        unit="Units";

    }

    // ================= BULK =================

    let b=bulk.find(x=>x.vessel==vessel);

    if(b){

        totalQty=b.quantity;
        category=b.cargoType;
        commodity=b.cargo;
        customer=b.customer;
        unit=b.unit;

    }

    let already=0;

    invoices.forEach(inv=>{

        if(inv.vessel==vessel){

            already += Number(inv.quantity);

        }

    });

    let remaining=totalQty-already;

    document.getElementById("invoiceCustomer").value=customer;
    document.getElementById("invoiceCategory").value=category;
    document.getElementById("invoiceCommodity").value=commodity;
    document.getElementById("invoiceUnit").value=unit;

    document.getElementById("invoiceQuantity").value="";
    document.getElementById("alreadyInvoiced").value=already;
    document.getElementById("remainingQuantity").value=remaining;

}

    }

}
