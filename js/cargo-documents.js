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
