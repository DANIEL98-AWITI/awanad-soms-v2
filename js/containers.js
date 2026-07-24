window.onload = function () {

    loadContainers();

};

function loadContainers() {

    let containers = JSON.parse(localStorage.getItem("containerOperations")) || [];

    let table = document.getElementById("containerTable");

    table.innerHTML = "";

    let registered = 0;
    let pending = 0;

    containers.forEach((c, index) => {

        if (c.containerNo == "PENDING") {

            pending++;

        } else {

            registered++;

        }

        table.innerHTML += `

        <tr>

        <td>

        <input
        type="text"
        value="${c.containerNo}"
        onchange="updateContainer(${index},this.value)"
        style="width:140px;padding:6px;border-radius:6px;border:1px solid #ccc;">

        </td>

        <td>${c.bl}</td>

        <td>${c.vessel}</td>

        <td>${c.customer}</td>

        <td>${c.shippingLine}</td>

        <td>${c.size}</td>

        <td>

        <span style="
        padding:6px 12px;
        border-radius:20px;
        background:${c.containerNo=="PENDING" ? "#ff9800" : "#18A957"};
        color:white;
        font-size:12px;
        font-weight:bold;">

        ${c.containerNo=="PENDING" ? "Awaiting Number" : "Registered"}

        </span>

        </td>

        </tr>

        `;

    });

    document.getElementById("totalContainers").innerHTML = containers.length;

    document.getElementById("registeredContainers").innerHTML = registered;

    document.getElementById("pendingContainers").innerHTML = pending;

}

function updateContainer(index, value) {

    let containers = JSON.parse(localStorage.getItem("containerOperations")) || [];

    containers[index].containerNo = value.toUpperCase();

    localStorage.setItem("containerOperations", JSON.stringify(containers));

    loadContainers();

}
