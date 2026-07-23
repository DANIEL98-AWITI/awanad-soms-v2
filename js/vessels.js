function importVessels() {

    const input = document.getElementById("vesselInput").value.trim();

    const table = document.getElementById("vesselTableBody");

    table.innerHTML = "";

    if (input === "") return;

    const lines = input.split("\n");

    let total = 0;
    let container = 0;
    let roro = 0;
    let bulk = 0;

    const roroKeywords = [
        "GRANDE",
        "HOEGH",
        "MORNING",
        "TOMBARRA",
        "DON JUAN",
        "LAKE",
        "ASIAN",
        "AUTO"
    ];

    const bulkKeywords = [
        "GULF",
        "BARAKA",
        "IVS",
        "PANAMAX",
        "BULK",
        "STAR",
        "OCEAN",
        "FORTUNE"
    ];

    lines.forEach(line => {

        if (line.trim() === "") return;

        total++;

        let parts = line.trim().split(/\s{2,}|\t+/);

        let vessel = parts[0];
        let eta = parts.length > 1 ? parts[1] : "";

        let cargo = "Container";

        if (roroKeywords.some(word => vessel.toUpperCase().includes(word))) {

            cargo = "RORO";
            roro++;

        } else if (bulkKeywords.some(word => vessel.toUpperCase().includes(word))) {

            cargo = "Bulk Cargo";
            bulk++;

        } else {

            container++;

        }

        table.innerHTML += `

        <tr>

            <td>${vessel}</td>

            <td>${eta}</td>

            <td>${cargo}</td>

        </tr>

        `;

    });

    document.getElementById("totalVessels").innerText = total;
    document.getElementById("containerCount").innerText = container;
    document.getElementById("roroCount").innerText = roro;
    document.getElementById("bulkCount").innerText = bulk;

}
