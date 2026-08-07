// ==========================================
// AWANAD SOMS
// USER ACCESS CONTROL
// ==========================================

(function () {

    const loggedIn =
        sessionStorage.getItem("awanadLoggedIn");

    const role =
        sessionStorage.getItem("awanadRole");


    // ==========================================
    // CHECK LOGIN
    // ==========================================

    if (
        loggedIn !== "true" ||
        !role
    ) {

        window.location.href = "./index.html";

        return;

    }


    // ==========================================
    // CURRENT PAGE
    // ==========================================

    const page =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();


    // ==========================================
    // PAGE PERMISSIONS
    // ==========================================

    const permissions = {

        // ADMIN ONLY
        "dashboard.html": [
            "ADMIN"
        ],

        // CONTAINER
        "containers.html": [
            "ADMIN",
            "CONTAINER"
        ],

        // RORO
        "roro.html": [
            "ADMIN",
            "RORO"
        ],

        "roro-vessels.html": [
            "ADMIN",
            "RORO"
        ],

        // BULK
        "bulk.html": [
            "ADMIN",
            "BULK"
        ],

        // FINANCE
        "invoices.html": [
            "ADMIN",
            "FINANCE"
        ],

        // COMMON DOCUMENT PAGE
        "cargo-documents.html": [
            "ADMIN",
            "RORO",
            "CONTAINER",
            "BULK"
        ],

        // REPORTS
        "reports.html": [
            "ADMIN",
            "RORO",
            "CONTAINER",
            "BULK",
            "FINANCE"
        ],

        // SETTINGS
        "settings.html": [
            "ADMIN"
        ],

        // VESSEL MANAGEMENT
        "vessels.html": [
            "ADMIN"
        ]

    };


    // ==========================================
    // CHECK ACCESS
    // ==========================================

    if (permissions[page]) {

        if (!permissions[page].includes(role)) {

            alert(
                "ACCESS DENIED\n\n" +
                "You do not have permission " +
                "to access this page."
            );

            redirectUser();

            return;

        }

    }


    // ==========================================
    // REDIRECT USER
    // ==========================================

    function redirectUser() {

        if (role === "ADMIN") {

            window.location.href =
                "./dashboard.html";

        }

        else if (role === "RORO") {

            window.location.href =
                "./roro.html";

        }

        else if (role === "CONTAINER") {

            window.location.href =
                "./containers.html";

        }

        else if (role === "BULK") {

            window.location.href =
                "./bulk.html";

        }

        else if (role === "FINANCE") {

            window.location.href =
                "./invoices.html";

        }

        else {

            sessionStorage.clear();

            window.location.href =
                "./index.html";

        }

    }


    // ==========================================
    // LOGOUT
    // ==========================================

    window.awanadLogout = function () {

        sessionStorage.clear();

        window.location.href =
            "./index.html";

    };


    // ==========================================
    // GLOBAL USER ROLE
    // ==========================================

    window.awanadUserRole = role;

})();
