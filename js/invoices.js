window.onload = function(){

    loadVessels();

    loadInvoices();

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

// ===============================
// SAVE INVOICE
// ===============================

function saveInvoice(){

    let invoiceNo = document.getElementById("invoiceNo").value.trim();

    let invoiceDate = document.getElementById("invoiceDate").value;

    let vessel = document.getElementById("invoiceVessel").value;

    let customer = document.getElementById("invoiceCustomer").value;

    let category = document.getElementById("invoiceCategory").value;

    let commodity = document.getElementById("invoiceCommodity").value;

    let quantity = Number(document.getElementById("invoiceQuantity").value);

    let remaining = Number(document.getElementById("remainingQuantity").value);

    let unit = document.getElementById("invoiceUnit").value;

    let amount = Number(document.getElementById("invoiceAmount").value);

    let status = document.getElementById("invoiceStatus").value;

    if(invoiceNo==""){

        alert("Enter Invoice Number");

        return;

    }

    if(quantity<=0){

        alert("Enter Invoice Quantity");

        return;

    }

    if(quantity>remaining){

        alert("Invoice Quantity exceeds Remaining Cargo.");

        return;

    }

    let invoices =
    JSON.parse(localStorage.getItem("invoiceRegister")) || [];

    invoices.push({

        invoiceNo,

        invoiceDate,

        vessel,

        customer,

        category,

        commodity,

        quantity,

        unit,

        amount,

        status

    });

    localStorage.setItem(
        "invoiceRegister",
        JSON.stringify(invoices)
    );

alert("Invoice Saved Successfully.");

loadInvoiceDetails();

loadInvoices();    
}
// ===============================
// LOAD INVOICE TABLE
// ===============================

function loadInvoices(filter=""){

    let invoices =
    JSON.parse(localStorage.getItem("invoiceRegister")) || [];

    let table =
    document.getElementById("invoiceTable");

    table.innerHTML="";

    filter = filter.toLowerCase();

    invoices.forEach(inv=>{

        if(

            inv.invoiceNo.toLowerCase().includes(filter) ||

            inv.vessel.toLowerCase().includes(filter) ||

            inv.customer.toLowerCase().includes(filter) ||

            inv.commodity.toLowerCase().includes(filter)

        ){

            table.innerHTML += `

<tr>

<td>${inv.invoiceNo}</td>

<td>${inv.invoiceDate}</td>

<td>${inv.vessel}</td>

<td>${inv.customer}</td>

<td>${inv.category}</td>

<td>${inv.commodity}</td>

<td>${inv.quantity} ${inv.unit}</td>

<td>${Number(inv.amount).toLocaleString()}</td>

<td>${inv.status}</td>

</tr>

`;

        }

    });

}
function searchInvoices(){

    let value =
    document.getElementById("invoiceSearch").value;

    loadInvoices(value);

}
