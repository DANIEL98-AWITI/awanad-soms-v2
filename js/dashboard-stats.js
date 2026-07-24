
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

 let totalContainers = containers.length;

let dischargedContainers = 0;

let evacuatedContainers = 0;

containers.forEach(c=>{

    if(c.discharged){

        dischargedContainers++;

    }

    if(c.evacuated){

        evacuatedContainers++;

    }

});   
    document.getElementById("dashboardContainers").innerHTML=containerCount;

    document.getElementById("containerGrowth").innerHTML=

        months[currentMonth]+" "+currentYear;

    let roroCount=0;

    roro.forEach(r=>{

        if(r.status==="Evacuated"){

            if(r.evacuatedDate){

                let d=new Date(r.evacuatedDate);

                if(d.getMonth()==currentMonth && d.getFullYear()==currentYear){

                    roroCount++;

                }

            }

        }

    });

    document.getElementById("dashboardRoro").innerHTML=roroCount;

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

    document.getElementById("bulkGrowth").innerHTML=

        months[currentMonth]+" "+currentYear;

}
