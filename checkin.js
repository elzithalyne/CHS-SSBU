document.getElementById("signInForm").addEventListener("submit", function(event) {
    event.preventDefault();

    var name = document.getElementById("nameInput").value.trim();
    var messageBox = document.getElementById("message");

    if (!name || !/^[a-zA-Z\s]+$/.test(name)) {
        messageBox.style.display = "block";
        messageBox.style.color = "red";
        messageBox.style.border = "2px solid red";
        messageBox.textContent = "Invalid name. Please enter a valid name.";
        return;
    }

    fetch("https://competitor-check-in.onrender.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name })
    })
        .then(response => response.text())
        .then(data => {
            console.log("Response from server:", data);
            messageBox.style.display = "block";

            if (data.includes("Checked In")) {
                messageBox.style.color = "green";
                messageBox.style.border = "2px solid green";
            } else {
                messageBox.style.color = "red";
                messageBox.style.border = "2px solid red";
            }

            messageBox.textContent = data;
            document.getElementById("nameInput").value = "";
        })
        .catch(error => {
            console.error("Error:", error);
            messageBox.style.display = "block";
            messageBox.style.color = "red";
            messageBox.style.border = "2px solid red";
            messageBox.textContent = "An error occurred. Please try again.";
        });
});
