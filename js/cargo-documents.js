function saveDocument() {

    let cargoType = document.getElementById("cargoType").value;
    let vessel = document.getElementById("vessel").value;
    let documentNo = document.getElementById("documentNo").value;
    let shippingLine = document.getElementById("shippingLine").value;
    let customer = document.getElementById("customer").value;

    let twenty = parseInt(document.getElementById("twenty").value) || 0;
    let forty = parseInt(document.getElementById("forty").value) || 0;

    // Save document

    let documents =
        JSON.parse(localStorage.getItem("cargoDocuments")) || [];

    documents.push({

        cargoType,

        vessel,

        documentNo,

        shippingLine,

        customer,

        twenty,

        forty

    });

    localStorage.setItem("cargoDocuments", JSON.stringify(documents));

    // Generate Containers Automatically

    let containers =
        JSON.parse(localStorage.getItem("containerOperations")) || [];

    for (let i = 1; i <= twenty; i++) {

        containers.push({

            containerNo: "PENDING",

            size: "20FT",

            vessel,

            bl: documentNo,

            customer,

            shippingLine,

            status: "Awaiting Container Number"

        });

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
