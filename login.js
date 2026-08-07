document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("loginForm");

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        const username =
            document.getElementById("username").value.trim().toLowerCase();

        const password =
            document.getElementById("password").value.trim();

        const message =
            document.getElementById("loginMessage");


        if (username === "admin" && password === "admin123") {

            sessionStorage.setItem("awanadRole", "ADMIN");
            sessionStorage.setItem("awanadLoggedIn", "true");

            window.location.href = "dashboard.html";

            return;
        }


        if (username === "roro" && password === "roro123") {

            sessionStorage.setItem("awanadRole", "RORO");
            sessionStorage.setItem("awanadLoggedIn", "true");

            window.location.href = "roro.html";

            return;
        }


        if (username === "container" && password === "container123") {

            sessionStorage.setItem("awanadRole", "CONTAINER");
            sessionStorage.setItem("awanadLoggedIn", "true");

            window.location.href = "containers.html";

            return;
        }


        if (username === "bulk" && password === "bulk123") {

            sessionStorage.setItem("awanadRole", "BULK");
            sessionStorage.setItem("awanadLoggedIn", "true");

            window.location.href = "bulk.html";

            return;
        }


        if (username === "finance" && password === "finance123") {

            sessionStorage.setItem("awanadRole", "FINANCE");
            sessionStorage.setItem("awanadLoggedIn", "true");

            window.location.href = "invoices.html";

            return;
        }


        message.textContent =
            "Invalid username or password.";

        message.className =
            "login-message error";

    });

});
