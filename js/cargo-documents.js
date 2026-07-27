function DBGet(key){
    return JSON.parse(localStorage.getItem(key)) || [];
}

function DBSave(key,data){
    localStorage.setItem(key,JSON.stringify(data));
}

function saveDocument(){

    const cargoType=document.getElementById("cargoType").value;
    const vessel=document.getElementById("vessel").value.trim();
    const documentNo=document.getElementById("documentNo").value.trim();
    const shippingLine=document.getElementById("shippingLine").value.trim();
    const customer=document.getElementById("customer").value.trim();

    const twenty=parseInt(document.getElementById("twenty").value)||0;
    const forty=parseInt(document.getElementById("forty").value)||0;

    const containerText=document.getElementById("containerNumbers").value.trim();

    let documents=DBGet("cargoDocuments");

    documents.push({
        cargoType,
        vessel,
        documentNo,
        shippingLine,
        customer,
        twenty,
        forty,
        date:new Date().toISOString()
    });

    DBSave("cargoDocuments",documents);

    if(cargoType==="Container"){

        let containers=DBGet("containerOperations");

        let numbers=containerText
            .split("\n")
            .map(x=>x.trim())
            .filter(x=>x!="");

        numbers.forEach(number=>{

            let size=number.includes("20") ? "20FT":"40FT";

            containers.push({

                containerNo:number,

                bl:documentNo,

                vessel,

                customer,

                shippingLine,

                size,

                discharged:false,

                evacuated:false,

                dischargedDate:null,

                evacuatedDate:null

            });

        });

        DBSave("containerOperations",containers);

    }
// ===============================
// BULK AUTOMATION
// ===============================

if(cargoType=="Bulk Cargo"){

    let bulk = JSON.parse(localStorage.getItem("bulkOperations")) || [];

    bulk.push({

        manifest: documentNo,

        vessel: vessel,

        cargo: document.getElementById("bulkCargo").value,

        customer: customer,

        shippingLine: shippingLine,

        quantity: document.getElementById("bulkQuantity").value,

        discharged:false,

        delivered:false,

        dischargedDate:null,

        deliveredDate:null

    });

    localStorage.setItem(
        "bulkOperations",
        JSON.stringify(bulk)
    );

}
    alert("Cargo Document Saved Successfully");
// ==========================================
// RORO AUTOMATION
// ==========================================

if(cargoType=="RORO"){

    let roro = JSON.parse(localStorage.getItem("roroOperations")) || [];

    let units = document.getElementById("roroNumbers").value
        .split("\n")
        .map(x=>x.trim())
        .filter(x=>x!="");

    units.forEach(line=>{

        let parts = line.split(",");

        let unitNo = parts[0] || "";
        let vehicleType = parts[1] || "Vehicle";

        roro.push({

            unitNo: unitNo,

            manifest: documentNo,

            vessel: vessel,

            customer: customer,

            shippingLine: shippingLine,

            vehicleType: vehicleType,

            discharged:false,

            evacuated:false,

            dischargedDate:null,

            evacuatedDate:null

        });

    });

    localStorage.setItem(
        "roroOperations",
        JSON.stringify(roro)
    );

}
}
// =======================================
// MASTER CARGO CATALOGUE
// =======================================

const cargoCatalogue = {

    Bulk: [

        {name:"Clinker",unit:"MT"},
        {name:"Coal",unit:"MT"},
        {name:"Gypsum",unit:"MT"},
        {name:"Wheat",unit:"MT"},
        {name:"Maize",unit:"MT"},
        {name:"Rice",unit:"MT"},
        {name:"Fertilizer",unit:"MT"},
        {name:"Salt",unit:"MT"},
        {name:"Sugar",unit:"MT"},
        {name:"Steel Billets",unit:"MT"}

    ],

    Packages: [

        {name:"Steel Coils",unit:"Coils"},
        {name:"Aluminium Coils",unit:"Coils"},
        {name:"Pallets",unit:"Pallets"},
        {name:"Cartons",unit:"Cartons"},
        {name:"Bags",unit:"Bags"},
        {name:"Drums",unit:"Drums"},
        {name:"Crates",unit:"Crates"},
        {name:"Machinery",unit:"Units"},
        {name:"Steel Pipes",unit:"Bundles"},
        {name:"Timber",unit:"Bundles"},
        {name:"General Cargo",unit:"Units"}

    ]

};

function loadCommodityList(){

    let type = document.getElementById("commodityType").value;

    let commodity = document.getElementById("bulkCargo");

    commodity.innerHTML = "";

    if(!cargoCatalogue[type]) return;

    cargoCatalogue[type].forEach(item=>{

        commodity.innerHTML +=
        `<option value="${item.name}">
            ${item.name}
        </option>`;

    });

    updateUnit();

}

function updateUnit(){

    let type = document.getElementById("commodityType").value;

    let commodity = document.getElementById("bulkCargo").value;

    let unit = "";

    cargoCatalogue[type].forEach(item=>{

        if(item.name==commodity){

            unit = item.unit;

        }

    });

    document.getElementById("bulkUnit").value = unit;

}

document.addEventListener("change",function(e){

    if(e.target.id=="bulkCargo"){

        updateUnit();

    }

});
