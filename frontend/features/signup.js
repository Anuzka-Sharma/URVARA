document.addEventListener("DOMContentLoaded", function () {
    const languageSelect = document.getElementById("language");
    const signupForm = document.getElementById("signupForm");  // Signup form ko select kar rahe hain

    // भाषा बदलने पर कंटेंट अपडेट करें
    languageSelect.addEventListener("change", function () {
        if (languageSelect.value === "english") {
            document.getElementById("title").textContent = "Sign Up";
            document.getElementById("desc").textContent = "Please fill in your details below";
            document.getElementById("nameLabel").textContent = "Full Name:";
            document.getElementById("name").placeholder = "Enter your name";
            document.getElementById("phoneLabel").textContent = "Mobile Number:";
            document.getElementById("phone").placeholder = "Enter your mobile number";
            document.getElementById("passwordLabel").textContent = "Password:";
            document.getElementById("password").placeholder = "Choose a password";
            document.getElementById("signup-btn").textContent = "Sign Up";
            document.getElementById("login-text").innerHTML = "Already have an account? <a href='#'>Login</a>";
        } else {
            document.getElementById("title").textContent = "साइन अप";
            document.getElementById("desc").textContent = "कृपया नीचे अपना विवरण भरें";
            document.getElementById("nameLabel").textContent = "पूरा नाम:";
            document.getElementById("name").placeholder = "अपना नाम दर्ज करें";
            document.getElementById("phoneLabel").textContent = "मोबाइल नंबर:";
            document.getElementById("phone").placeholder = "अपना मोबाइल नंबर दर्ज करें";
            document.getElementById("passwordLabel").textContent = "पासवर्ड:";
            document.getElementById("password").placeholder = "पासवर्ड चुनें";
            document.getElementById("signup-btn").textContent = "साइन अप करें";
            document.getElementById("login-text").innerHTML = "पहले से खाता है? <a href='#'>लॉगिन करें</a>";
        }
    });

    // Signup form submit event
    signupForm.addEventListener('submit', async function (e) {
        e.preventDefault(); // Prevent form from submitting normally

        const name = document.getElementById("name").value;
        const phone = document.getElementById("phone").value;
        const password = document.getElementById("password").value;

        // Prepare data for API call
        const data = {
            username: name,
            mobile: phone,
            password: password
        };

        try {
            // Send API request to the backend to store the user data
            const response = await fetch('http://localhost:8080/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            const responseData = await response.json();

            if (response.ok) {
                console.log("Signup successful", responseData);
                // Redirect to login page after successful signup
                window.location.href = "http://localhost:8080/auth/login"; // Redirect to login page after successful signup

            } else {
                console.error("Error during signup", responseData.error);
                // Show error message to user
                alert("Signup failed: " + responseData.error);
            }
        } catch (error) {
            console.error("Network error:", error);
            alert("Network error. Please try again.");
        }
    });
});
