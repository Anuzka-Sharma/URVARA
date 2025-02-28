document.addEventListener("DOMContentLoaded", function() {
    const apiKey = "YOUR_API_KEY"; // 🔥 Replace with your actual API key
    const apiUrl = "YOUR_API_ENDPOINT"; // 🔥 Replace with your API URL

    fetch(apiUrl, {
        headers: {
            "Authorization": `Bearer ${apiKey}`
        }
    })
    .then(response => response.json())
    .then(data => {
        const tableBody = document.getElementById("priceData");
        tableBody.innerHTML = ""; // Clear previous data

        data.forEach(item => {
            let row = `<tr>
                <td>${item.crop}</td>
                <td>${item.location}</td>
                <td>₹${item.price}</td>
            </tr>`;
            tableBody.innerHTML += row;
        });
    })
    .catch(error => {
        console.error("Error fetching mandi prices:", error);
        document.getElementById("priceData").innerHTML = `<tr><td colspan="3">Error fetching data</td></tr>`;
    });
});
