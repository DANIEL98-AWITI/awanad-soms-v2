function importVessels() {

    const input = document.getElementById("vesselInput").value.trim();

    if (input === "") {
        alert("Paste the KPA 14-Day Vessel List first.");
        return;
    }

    const table = document.getElementById("vesselTableBody");
    table.innerHTML = "";

    const lines = input.split("\n");

    let total = 0;
    let container = 0;
    let roro = 0;
    let bulk = 0;

    const imported = [];

    const roroKeywords = [
        "GRANDE",
        "HOEGH",
        "MORNING",
        "DON JUAN",
        "LAKE",
        "AUTO",
        "TOMBARRA"
    ];

    const bulkKeywords = [
        "GULF",
        "BARAKA",
        "PANAMAX",
        "IVS",
        "BULK",
        "STAR",
        "FORTUNE",
        "OCEAN"
    ];

    lines.forEach(line => {

        line = line.trim();

        if (line == "") return;

        let words = line.split(/\s+/);

        if (words.length < 2) return;

        let eta = words.pop();

        let vessel = words.join(" ");

        // Remove duplicates
        if (imported.includes(vessel.toUpperCase())) return;

        imported.push(vessel.toUpperCase());

        total++;

        let cargo = "Container";

        if (roroKeywords.some(x => vessel.toUpperCase().includes(x))) {

            cargo = "RORO";
            roro++;

        }

        else if (bulkKeywords.some(x => vessel.toUpperCase().includes(x))) {

            cargo = "Bulk Cargo";
            bulk++;

        }

        else {

            cargo = "Container";
            container++;

        }

        let arrivalStatus = "";

        let badge = "";

        const today = new Date();

        const etaDate = new Date(eta);

        if (!isNaN(etaDate)) {

            const diff = Math.ceil((etaDate - today) / (1000 * 60 * 60 * 24));

            if (diff <= 0) {

                arrivalStatus = "Today";
                badge = "#18A957";

            }

            else if (diff == 1) {

                arrivalStatus = "Tomorrow";
                badge = "#ff9800";

            }

            else {

                arrivalStatus = "In " + diff + " Days";
                badge = "#1565C0";

            }

        }

        else {

            arrivalStatus = "Scheduled";
            badge = "#607d8b";

        }

        table.innerHTML += `

        <tr>

            <td>${vessel}</td>

            <td>${eta}</td>

            <td>${cargo}</td>

            <td>
                <span style="
                    background:${badge};
                    color:white;
                    padding:6px 14px;
                    border-radius:20px;
                    font-size:12px;
                    font-weight:600;">
                    ${arrivalStatus}
                </span>
            </td>

        </tr>

        `;

    });

    document.getElementById("totalVessels").innerText = total;
    document.getElementById("containerCount").innerText = container;
    document.getElementById("roroCount").innerText = roro;
    document.getElementById("bulkCount").innerText = bulk;

}
