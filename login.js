// ==========================================
// AWANAD SOMS - LOGIN & DEPARTMENT ROLES
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    const loginForm = document.getElementById("loginForm");

    if (!loginForm) return;

    loginForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const username =
            document.getElementById("username").value.trim().toLowerCase();

        const password =
            document.getElementById("password").value.trim();

        const message =
            document.getElementById("loginMessage");


        // ==========================================
        // TEMPORARY USER ACCOUNTS
        // ==========================================

        const users = {

            admin: {
                password: "admin123",
                role: "ADMIN",
                name: "Administrator",
                page: "dashboard.html"
            },

            container: {
                password: "container123",
                role: "CONTAINER",
                name: "Container Department",
                page: "containers.html"
            },

            roro: {
                password: "roro123",
                role: "RORO",
                name: "RORO Department",
                page: "roro.html"
            },

            bulk: {
                password: "bulk123",
                role: "BULK",
                name: "Bulk Department",
                page: "bulk.html"
            },

            finance: {
                password: "finance123",
                role: "FINANCE",
                name: "Finance Department",
                page: "invoices.html"
            }

        };


        // ==========================================
        // CHECK USER
        // ==========================================

        const user = users[username];


        if (!user || user.password !== password) {

            message.textContent =
                "Invalid username or password.";

            message.className =
                "login-message error";

            return;

        }


        // ==========================================
        // SAVE LOGIN SESSION
        // ==========================================

        sessionStorage.setItem(
            "awanadLoggedIn",
            "true"
        );

        sessionStorage.setItem(
            "awanadUsername",
            username
        );

        sessionStorage.setItem(
            "awanadRole",
            user.role
        );

        sessionStorage.setItem(
            "awanadUserName",
            user.name
        );


        // ==========================================
        // SUCCESS MESSAGE
        // ==========================================

        message.textContent =
            "Login successful. Opening system...";

        message.className =
            "login-message success";


        // ==========================================
        // OPEN DEPARTMENT
        // ==========================================

        setTimeout(function () {

            window.location.href = user.page;

        }, 500);

    });

});
