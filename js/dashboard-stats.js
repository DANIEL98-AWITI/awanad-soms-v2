
window.addEventListener("load", function () {

    updateDashboard();

});

function updateDashboard() {

    let containers =
        JSON.parse(localStorage.getItem("containerOperations")) || [];

    let roro =
        JSON.parse(localStorage.getItem("roroOperations")) || [];

    let bulk =
        JSON.parse(localStorage.getItem("bulkOperations")) || [];

    let today = new Date();

    let currentMonth = today.getMonth();

    let currentYear = today.getFullYear();

    let months = [

        "January","February","March","April","May","June",

        "July","August","September","October","November","December"

    ];

let currentMonthCount = 0;
let lastMonthCount = 0;

containers.forEach(c=>{

    if(c.evacuated && c.evacuatedDate){

        let d = new Date(c.evacuatedDate);

        if(
            d.getMonth()==currentMonth &&
            d.getFullYear()==currentYear
        ){

            currentMonthCount++;

        }

        let lastMonth=currentMonth-1;
        let lastYear=currentYear;

        if(lastMonth<0){

            lastMonth=11;
            lastYear--;

        }

        if(
            d.getMonth()==lastMonth &&
            d.getFullYear()==lastYear
        ){

            lastMonthCount++;

        }

    }

});

document.getElementById("dashboardContainers").innerHTML=currentMonthCount;

document.getElementById("containerGrowth").innerHTML=
months[currentMonth]+" "+currentYear;

let change=0;

if(lastMonthCount>0){

    change=((currentMonthCount-lastMonthCount)/lastMonthCount)*100;

}

let trend=document.getElementById("containerTrendText");
let icon=document.getElementById("containerTrendIcon");

if(change>0){

    icon.innerHTML="▲";
    trend.innerHTML=Math.round(change)+"% vs Last Month";

}else if(change<0){

    icon.innerHTML="▼";
    trend.innerHTML=Math.abs(Math.round(change))+"% vs Last Month";

}else{

    icon.innerHTML="●";
    trend.innerHTML="No Change";

}

// ==========================================
// RORO SUMMARY
// ==========================================

let roroTotal = roro.length;

let roroDischarged = 0;
let roroEvacuated = 0;
let roroYard = 0;


// Count RORO units
roro.forEach(r => {

    // ------------------------------
    // DISCHARGED
    // ------------------------------

    if (
        r.discharged === true ||
        r.discharged === "true" ||
        String(r.discharged).toLowerCase() === "yes" ||
        String(r.discharged).toLowerCase() === "discharged"
    ) {

        roroDischarged++;

    }


    // ------------------------------
    // EVACUATED
    // ------------------------------

    if (
        r.evacuated === true ||
        r.evacuated === "true" ||
        String(r.evacuated).toLowerCase() === "yes" ||
        String(r.evacuated).toLowerCase() === "evacuated"
    ) {

        roroEvacuated++;

    }

});


// Units remaining in yard
roroYard = roroDischarged - roroEvacuated;

if (roroYard < 0) {

    roroYard = 0;

}


// ==========================================
// MAIN DASHBOARD RORO CARD
// ==========================================

let dashboardRoro =
    document.getElementById("dashboardRoro");

if (dashboardRoro) {

    dashboardRoro.innerHTML = roroTotal;

}


// ==========================================
// RORO MONTH / PERIOD LABEL
// ==========================================

let roroGrowth =
    document.getElementById("roroGrowth");

if (roroGrowth) {

    roroGrowth.innerHTML =
        roroTotal +
        " Registered Units";

}

    document.getElementById("roroGrowth").innerHTML=

        months[currentMonth]+" "+currentYear;

    let bulkCount=0;

    bulk.forEach(b=>{

        if(b.status==="Completed"){

            if(b.completedDate){

                let d=new Date(b.completedDate);

                if(d.getMonth()==currentMonth && d.getFullYear()==currentYear){

                    bulkCount++;

                }

            }

        }

    });

    document.getElementById("dashboardBulk").innerHTML=bulkCount;

 document.getElementById("bulkGrowth").innerHTML =

    months[currentMonth]+" "+currentYear;


// ==========================================
// INVOICE SUMMARY
// ==========================================

let invoices =
    JSON.parse(
        localStorage.getItem("invoiceRegister")
    ) || [];

let paidInvoiceCount = 0;
let unpaidInvoiceCount = 0;

let paidInvoiceAmount = 0;
let unpaidInvoiceAmount = 0;


invoices.forEach(inv => {

    // Do not include archived invoices
    if(inv.archived === true){

        return;

    }


    let amount =
        Number(inv.amount) || 0;


    let status =
        String(inv.status || "")
        .toLowerCase()
        .trim();


    if(status === "paid"){

        paidInvoiceCount++;

        paidInvoiceAmount += amount;

    }

    else{

        unpaidInvoiceCount++;

        unpaidInvoiceAmount += amount;

    }

});


// ==========================================
// UNPAID INVOICES
// ==========================================

let pendingElement =
    document.getElementById(
        "pendingInvoices"
    );

let pendingAmountElement =
    document.getElementById(
        "pendingInvoiceAmount"
    );


if(pendingElement){

    pendingElement.innerHTML =
        unpaidInvoiceCount;

}


if(pendingAmountElement){

    pendingAmountElement.innerHTML =
        "KES " +
        unpaidInvoiceAmount.toLocaleString();

}


// ==========================================
// PAID INVOICES
// ==========================================

let paidElement =
    document.getElementById(
        "paidInvoices"
    );

let paidAmountElement =
    document.getElementById(
        "paidInvoiceAmount"
    );


if(paidElement){

    paidElement.innerHTML =
        paidInvoiceCount;

}


if(paidAmountElement){

    paidAmountElement.innerHTML =
        "KES " +
        paidInvoiceAmount.toLocaleString();

}

}
