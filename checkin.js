document.getElementById("signInForm").addEventListener("submit", function(event) {
    event.preventDefault();

    var name = document.getElementById("nameInput").value;
    var messageBox = document.getElementById("message");

    fetch("https://script.google.com/macros/s/AKfycbzwWB3zzIfJBO9G2UOZcl14J4woG2VcRglljUd8UGP4lXKHf9a2nGhCZCcA9ABwaAIc4A/exec", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({name: name})
    })

    .then(response => response.text())
    .then(data => {
        messageBox.style.display = "block";


    if (data === "Checked In") {
        messageBox.style.color = "green";
        messageBox.style.border = "2px solid green";
        console.log('Response from server:', data)
    
    } else {
        messageBox.style.color = "red";
        messageBox.style.border = "2px solid red";
    }

        messageBox.textContent = data;

        document.getElementById("nameInput").value= "";

    })
    .catch(error => {
        console.error("Error:", error);
        messageBox.style.display = "block"
        messageBox.style.color = "red";
        messageBox.style.border = "2px solid red";
        messageBox.textContent = "An error occurred. Please try again.";
    });
});
