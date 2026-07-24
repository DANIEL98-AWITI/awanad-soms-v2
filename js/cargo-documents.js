function saveDocument(){

    const cargoType = document.getElementById("cargoType").value;
    const vessel = document.getElementById("vessel").value.trim();
    const documentNo = document.getElementById("documentNo").value.trim();
    const shippingLine = document.getElementById("shippingLine").value.trim();
    const customer = document.getElementById("customer").value.trim();

    const twenty = parseInt(document.getElementById("twenty").value) || 0;
    const forty = parseInt(document.getElementById("forty").value) || 0;

    const containerText = document.getElementById("containerNumbers").value.trim();

    // Save Cargo Document
    let documents = DB.get("cargoDocuments");

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

    DB.save("cargoDocuments",documents);

    // ==========================
    // CONTAINER AUTOMATION
    // ==========================

    if(cargoType==="Container"){

        let containers = DB.get("containerOperations");

        let numbers = containerText
            .split("\n")
            .map(x=>x.trim())
            .filter(x=>x!="");

        numbers.forEach(number=>{

            let size = "40FT";

            if(
                number.startsWith("MSCU") ||
                number.startsWith("TGHU") ||
                number.startsWith("OOLU")
            ){
                // You can improve this later if needed
                size = "40FT";
            }

            containers.push({

                containerNo:number,

                bl:documentNo,

                vessel:vessel,

                customer:customer,

                shippingLine:shippingLine,

                size:size,

                discharged:false,

                evacuated:false,

                dischargedDate:null,

                evacuatedDate:null

            });

        });

        DB.save("containerOperations",containers);

    }

    alert("Cargo Document Saved Successfully.");

}

    for (let i = 1; i <= forty; i++) {

        containers.push({

            containerNo: "PENDING",

            size: "40FT",

            vessel,

            bl: documentNo,

            customer,

            shippingLine,

            status: "Awaiting Container Number"

        });

    }

    localStorage.setItem(
        "containerOperations",
        JSON.stringify(containers)
    );

    alert("Document Saved Successfully");

}
