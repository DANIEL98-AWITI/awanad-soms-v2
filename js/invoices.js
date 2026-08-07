// ==========================================
// AWANAD SOMS - BILLING & INVOICE MANAGEMENT
// ==========================================

let editingInvoiceIndex = -1;


// ==========================================
// PAGE LOAD
// ==========================================

window.onload = function(){

    loadVessels();

    loadInvoices();

    const vesselSelect = document.getElementById("invoiceVessel");

    if(vesselSelect){

        vesselSelect.addEventListener(
            "change",
            loadInvoiceDetails
        );

    }

};


// ==========================================
// LOAD VESSELS
// ==========================================

function loadVessels(){

    let select = document.getElementById("invoiceVessel");

    if(!select) return;

    select.innerHTML =
        "<option value=''>Select Vessel</option>";

    let containers =
        JSON.parse(
            localStorage.getItem("containerOperations")
        ) || [];

    let roro =
        JSON.parse(
            localStorage.getItem("roroOperations")
        ) || [];

    let bulk =
        JSON.parse(
            localStorage.getItem("bulkOperations")
        ) || [];

    let vessels = [];


    containers.forEach(c => {

        if(c.vessel && !vessels.includes(c.vessel)){

            vessels.push(c.vessel);

        }

    });


    roro.forEach(r => {

        if(r.vessel && !vessels.includes(r.vessel)){

            vessels.push(r.vessel);

        }

    });


    bulk.forEach(b => {

        if(b.vessel && !vessels.includes(b.vessel)){

            vessels.push(b.vessel);

        }

    });


    vessels.forEach(v => {

        select.innerHTML +=
            `<option value="${v}">${v}</option>`;

    });

}


// ==========================================
// LOAD VESSEL DETAILS
// ==========================================

function loadInvoiceDetails(){

    let vessel =
        document.getElementById("invoiceVessel").value;

    if(vessel === "") return;


    let invoices =
        JSON.parse(
            localStorage.getItem("invoiceRegister")
        ) || [];

    let containers =
        JSON.parse(
            localStorage.getItem("containerOperations")
        ) || [];

    let roro =
        JSON.parse(
            localStorage.getItem("roroOperations")
        ) || [];

    let bulk =
        JSON.parse(
            localStorage.getItem("bulkOperations")
        ) || [];


    let totalQty = 0;
    let category = "";
    let commodity = "";
    let customer = "";
    let unit = "";


    // ==========================================
    // CONTAINERS
    // ==========================================

    let c =
        containers.filter(x => x.vessel === vessel);

    if(c.length > 0){

        totalQty = c.length;

        category = "Containers";

        commodity = "Containers";

        customer = c[0].customer || "";

        unit = "Containers";

    }


    // ==========================================
    // RORO
    // ==========================================

    let r =
        roro.filter(x => x.vessel === vessel);

    if(r.length > 0){

        totalQty = r.length;

        category = "RORO";

        commodity = "Vehicles";

        customer = r[0].customer || "";

        unit = "Units";

    }


    // ==========================================
    // BULK & PACKAGES
    // ==========================================

    let b =
        bulk.find(x => x.vessel === vessel);

    if(b){

        totalQty = Number(b.quantity) || 0;

        category = b.cargoType || "";

        commodity = b.cargo || "";

        customer = b.customer || "";

        unit = b.unit || "";

    }


    // ==========================================
    // CALCULATE ALREADY INVOICED
    // ==========================================

    let already = 0;

    invoices.forEach((inv, index) => {

        if(
            inv.vessel === vessel &&
            index !== editingInvoiceIndex
        ){

            already += Number(inv.quantity) || 0;

        }

    });


    let remaining = totalQty - already;


    // ==========================================
    // AUTO FILL
    // ==========================================

    document.getElementById(
        "invoiceCustomer"
    ).value = customer;


    document.getElementById(
        "invoiceCategory"
    ).value = category;


    document.getElementById(
        "invoiceCommodity"
    ).value = commodity;


    document.getElementById(
        "invoiceUnit"
    ).value = unit;


    // Do not erase quantity while editing

    if(editingInvoiceIndex === -1){

        document.getElementById(
            "invoiceQuantity"
        ).value = "";

    }


    document.getElementById(
        "alreadyInvoiced"
    ).value = already;


    document.getElementById(
        "remainingQuantity"
    ).value = remaining;

}


// ==========================================
// SAVE / UPDATE INVOICE
// ==========================================

function saveInvoice(){

    let invoiceNo =
        document.getElementById(
            "invoiceNo"
        ).value.trim();


    let invoiceDate =
        document.getElementById(
            "invoiceDate"
        ).value;


    let vessel =
        document.getElementById(
            "invoiceVessel"
        ).value;


    let customer =
        document.getElementById(
            "invoiceCustomer"
        ).value;


    let category =
        document.getElementById(
            "invoiceCategory"
        ).value;


    let commodity =
        document.getElementById(
            "invoiceCommodity"
        ).value;


    let quantity =
        Number(
            document.getElementById(
                "invoiceQuantity"
            ).value
        );


    let remaining =
        Number(
            document.getElementById(
                "remainingQuantity"
            ).value
        );


    let unit =
        document.getElementById(
            "invoiceUnit"
        ).value;


    let amount =
        Number(
            document.getElementById(
                "invoiceAmount"
            ).value
        );


    let status =
        document.getElementById(
            "invoiceStatus"
        ).value;


    // ==========================================
    // VALIDATION
    // ==========================================

    if(invoiceNo === ""){

        alert("Enter Invoice Number.");

        return;

    }


    if(vessel === ""){

        alert("Select a Vessel.");

        return;

    }


    if(quantity <= 0){

        alert("Enter Invoice Quantity.");

        return;

    }


    if(quantity > remaining){

        alert(
            "Invoice Quantity exceeds Remaining Cargo.\n\n" +
            "Available Quantity: " + remaining
        );

        return;

    }


    let invoices =
        JSON.parse(
            localStorage.getItem(
                "invoiceRegister"
            )
        ) || [];


    // ==========================================
    // CHECK DUPLICATE INVOICE NUMBER
    // ==========================================

    let duplicate = invoices.some(
        (inv, index) =>

        inv.invoiceNo.toLowerCase() ===
        invoiceNo.toLowerCase() &&

        index !== editingInvoiceIndex
    );


    if(duplicate){

        alert(
            "This Invoice Number already exists."
        );

        return;

    }


    // ==========================================
    // CREATE INVOICE OBJECT
    // ==========================================

    let invoiceData = {

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

    };


    // ==========================================
    // NEW INVOICE
    // ==========================================

    if(editingInvoiceIndex === -1){

        invoices.push(invoiceData);

        alert(
            "Invoice Saved Successfully."
        );

    }


    // ==========================================
    // UPDATE EXISTING INVOICE
    // ==========================================

    else{

        invoices[editingInvoiceIndex] =
            invoiceData;

        alert(
            "Invoice Updated Successfully."
        );

        editingInvoiceIndex = -1;

    }


    // ==========================================
    // SAVE DATABASE
    // ==========================================

    localStorage.setItem(
        "invoiceRegister",
        JSON.stringify(invoices)
    );


    // ==========================================
    // RESET FORM
    // ==========================================

    resetInvoiceForm();


    loadInvoices();

}


// ==========================================
// LOAD INVOICE TABLE
// ==========================================

function loadInvoices(filter = ""){

    let invoices =
        JSON.parse(
            localStorage.getItem(
                "invoiceRegister"
            )
        ) || [];


    let table =
        document.getElementById(
            "invoiceTable"
        );


    if(!table) return;


    table.innerHTML = "";


    filter =
        filter.toLowerCase().trim();


    invoices.forEach((inv, index) => {

        let invoiceNo =
            String(inv.invoiceNo || "");


        let vessel =
            String(inv.vessel || "");


        let customer =
            String(inv.customer || "");


        let category =
            String(inv.category || "");


        let commodity =
            String(inv.commodity || "");


        if(

            invoiceNo.toLowerCase().includes(filter) ||

            vessel.toLowerCase().includes(filter) ||

            customer.toLowerCase().includes(filter) ||

            category.toLowerCase().includes(filter) ||

            commodity.toLowerCase().includes(filter)

        ){

            table.innerHTML += `

<tr>

<td>${invoiceNo}</td>

<td>${inv.invoiceDate || "-"}</td>

<td>${vessel}</td>

<td>${customer}</td>

<td>${category}</td>

<td>${commodity}</td>

<td>
${inv.quantity || 0} ${inv.unit || ""}
</td>

<td>
${Number(inv.amount || 0).toLocaleString()}
</td>

<td>
${inv.status || "Pending"}
</td>

<td>

<button
class="edit-invoice-btn"
onclick="editInvoice(${index})">

✏️ Edit

</button>

</td>

</tr>

`;

        }

    });

}


// ==========================================
// SEARCH INVOICES
// ==========================================

function searchInvoices(){

    let search =
        document.getElementById(
            "invoiceSearch"
        ).value;


    loadInvoices(search);

}


// ==========================================
// EDIT INVOICE
// ==========================================

function editInvoice(index){

    let invoices =
        JSON.parse(
            localStorage.getItem(
                "invoiceRegister"
            )
        ) || [];


    let invoice = invoices[index];


    if(!invoice){

        alert(
            "Invoice could not be found."
        );

        return;

    }


    // Remember which invoice is being edited

    editingInvoiceIndex = index;


    // ==========================================
    // LOAD VALUES INTO FORM
    // ==========================================

    document.getElementById(
        "invoiceNo"
    ).value = invoice.invoiceNo || "";


    document.getElementById(
        "invoiceDate"
    ).value = invoice.invoiceDate || "";


    document.getElementById(
        "invoiceVessel"
    ).value = invoice.vessel || "";


    document.getElementById(
        "invoiceCustomer"
    ).value = invoice.customer || "";


    document.getElementById(
        "invoiceCategory"
    ).value = invoice.category || "";


    document.getElementById(
        "invoiceCommodity"
    ).value = invoice.commodity || "";


    document.getElementById(
        "invoiceQuantity"
    ).value = invoice.quantity || 0;


    document.getElementById(
        "invoiceUnit"
    ).value = invoice.unit || "";


    document.getElementById(
        "invoiceAmount"
    ).value = invoice.amount || 0;


    document.getElementById(
        "invoiceStatus"
    ).value = invoice.status || "Pending";


    // Recalculate remaining correctly

    loadInvoiceDetails();


    // Restore the invoice quantity
    // because loadInvoiceDetails normally clears it

    document.getElementById(
        "invoiceQuantity"
    ).value = invoice.quantity || 0;


    // ==========================================
    // CHANGE BUTTON TEXT
    // ==========================================

    let button =
        document.querySelector(
            "button[onclick='saveInvoice()']"
        );


    if(button){

        button.innerHTML =
            "UPDATE INVOICE";

    }


    // Scroll to form

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


// ==========================================
// RESET FORM
// ==========================================

function resetInvoiceForm(){

    editingInvoiceIndex = -1;


    document.getElementById(
        "invoiceNo"
    ).value = "";


    document.getElementById(
        "invoiceDate"
    ).value = "";


    document.getElementById(
        "invoiceVessel"
    ).value = "";


    document.getElementById(
        "invoiceCustomer"
    ).value = "";


    document.getElementById(
        "invoiceCategory"
    ).value = "";


    document.getElementById(
        "invoiceCommodity"
    ).value = "";


    document.getElementById(
        "invoiceQuantity"
    ).value = "";


    document.getElementById(
        "alreadyInvoiced"
    ).value = "";


    document.getElementById(
        "remainingQuantity"
    ).value = "";


    document.getElementById(
        "invoiceUnit"
    ).value = "";


    document.getElementById(
        "invoiceAmount"
    ).value = "";


    document.getElementById(
        "invoiceStatus"
    ).value = "Pending";


    let button =
        document.querySelector(
            "button[onclick='saveInvoice()']"
        );


    if(button){

        button.innerHTML =
            "SAVE INVOICE";

    }

}
