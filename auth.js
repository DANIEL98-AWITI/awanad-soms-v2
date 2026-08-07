// ==========================================
// AWANAD SOMS
// DEPARTMENT ACCESS CONTROL
// ==========================================

(function () {

    const loggedIn =
        sessionStorage.getItem("awanadLoggedIn");

    const role =
        sessionStorage.getItem("awanadRole");


    // ==========================================
    // NO LOGIN = RETURN TO LOGIN PAGE
    // ==========================================

    if (
        loggedIn !== "true" ||
        !role
    ) {

        window.location.href =
            "./index.html";

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

        "dashboard.html": [
            "ADMIN"
        ],

        "containers.html": [
            "ADMIN",
            "CONTAINER"
        ],

        "roro.html": [
            "ADMIN",
            "RORO"
        ],

        "bulk.html": [
            "ADMIN",
            "BULK"
        ],

        "invoices.html": [
            "ADMIN",
            "FINANCE"
        ]

    };


    // ==========================================
    // CHECK PAGE
    // ==========================================

    if (permissions[page]) {

        if (
            !permissions[page]
                .includes(role)
        ) {

            alert(
                "Access denied.\n\n" +
                "You do not have permission " +
                "to access this department."
            );

            redirectUser(role);

        }

    }


    // ==========================================
    // REDIRECT USER TO THEIR DEPARTMENT
    // ==========================================

    function redirectUser(role) {

        if (role === "ADMIN") {

            window.location.href =
                "./dashboard.html";

        }

        else if (role === "CONTAINER") {

            window.location.href =
                "./containers.html";

        }

        else if (role === "RORO") {

            window.location.href =
                "./roro.html";

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
    // LOGOUT FUNCTION
    // ==========================================

    window.awanadLogout = function () {

        sessionStorage.clear();

        window.location.href =
            "./index.html";

    };


    // ==========================================
    // USER INFORMATION
    // ==========================================

    window.awanadUserRole = role;

})();
