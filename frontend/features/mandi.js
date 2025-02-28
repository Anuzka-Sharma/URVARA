document.addEventListener("DOMContentLoaded", function() {
    const apiKey = "579b464db66ec23bdd000001c51695fe32c1459670ba86ee0aa7ac9a"; // Tumhari API key
    const apiUrl = `https://api.data.gov.in/resource/35985678-0d79-46b4-9ed6-6f13308a1d24?format=json&api-key=YOUR_API_KEY`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById("priceData");
            tableBody.innerHTML = ""; // Purana data clear karo

            if (data.records) {
                data.records.forEach(item => {
                    let row = `<tr>
                        <td>${item.commodity}</td>
                        <td>${item.market}</td>
                        <td>₹${item.modal_price}</td>
                    </tr>`;
                    tableBody.innerHTML += row;
                });
            } else {
                tableBody.innerHTML = `<tr><td colspan="3">No data available</td></tr>`;
            }
        })
        .catch(error => {
            console.error("Error fetching mandi prices:", error);
            document.getElementById("priceData").innerHTML = `<tr><td colspan="3">Error fetching data</td></tr>`;
        });
});
