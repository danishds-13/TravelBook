document.addEventListener("DOMContentLoaded", function () {
    // Dynamic text change for country names
    const countries = ["United States", "India", "France", "Germany", "Italy", "Australia"];
    let index = 0;

    function changeText() {
        document.getElementById("changing-text").innerText = `Visit ${countries[index]}`;
        index = (index + 1) % countries.length;
    }
    setInterval(changeText, 200);

    // Booking Form Validation
    const bookingForm = document.getElementById("booking-form");

    if (bookingForm) {
        bookingForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const startDate = new Date(document.getElementById("start-date").value);
            const endDate = new Date(document.getElementById("end-date").value);
            const description = document.getElementById("description").value;

            const today = new Date();
            if (startDate <= today) {
                alert("Start date must be in the future.");
                return;
            }

            if (endDate <= startDate) {
                alert("End date must be later than the start date.");
                return;
            }

            if (description.length < 50 || description.length > 500) {
                alert("Description must be between 50 and 500 characters.");
                return;
            }

            alert("Booking successful!");
            bookingForm.reset();
        });
    }

    // Register Form Submission
    const registerForm = document.getElementById("register-form");

    if (registerForm) {
        registerForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevents default form submission

            // Fetch input values
            let fullname = document.getElementById("fullname").value;
            let contact = document.getElementById("contact").value;
            let dob = document.getElementById("dob").value;
            let email = document.getElementById("email").value;
            let password = document.getElementById("password").value;
            let confirmPassword = document.getElementById("confirm-password").value;
            let gender = document.querySelector('input[name="gender"]:checked');

            // Simple Validation
            if (!fullname || !contact || !dob || !email || !password || !confirmPassword || !gender) {
                alert("Please fill in all fields.");
                return;
            }

            if (password !== confirmPassword) {
                alert("Passwords do not match!");
                return;
            }

            // Store user data in localStorage
            let user = {
                fullname: fullname,
                contact: contact,
                dob: dob,
                email: email,
                password: password,
                gender: gender.value
            };

            localStorage.setItem("user", JSON.stringify(user));

            // Show modal or redirect to login
            alert("Registration successful! Redirecting to login...");
            window.location.href = "login.html";
        });
    }

    // Login Form Submission (Modal and Standalone)
    function handleLoginFormSubmission(event, emailFieldId, passwordFieldId) {
        event.preventDefault();

        let storedUser = JSON.parse(localStorage.getItem("user"));
        let email = document.getElementById(emailFieldId).value;
        let password = document.getElementById(passwordFieldId).value;

        if (!storedUser) {
            alert("No user found. Please register first.");
            return;
        }

        if (email === storedUser.email && password === storedUser.password) {
            alert("Login successful! Redirecting to homepage...");
            window.location.href = "index.html";
        } else {
            alert("Invalid email or password. Please try again.");
        }
    }

    // Attach event listeners to both login forms (modal and standalone)
    document.getElementById("login-form")?.addEventListener("submit", function (event) {
        handleLoginFormSubmission(event, "login-email", "login-password");
    });

    document.getElementById("login-form-standalone")?.addEventListener("submit", function (event) {
        handleLoginFormSubmission(event, "login-email-standalone", "login-password-standalone");
    });

    // Package Booking Button Click
    document.querySelectorAll(".book-now-btn").forEach(button => {
        button.addEventListener("click", () => {
            alert("Package booked successfully!");
        });
    });
});
