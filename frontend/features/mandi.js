document.addEventListener("DOMContentLoaded", function() {
    const languageSelect = document.getElementById("language");

    // ✅ पहले से सेव भाषा अप्लाई करें
    const savedLang = localStorage.getItem("language") || "hindi";
    languageSelect.value = savedLang;
    changeLanguage(savedLang);

    // ✅ जब हेडर में भाषा बदले, तो सेव करें
    languageSelect.addEventListener("change", function() {
        const selectedLang = languageSelect.value;
        localStorage.setItem("language", selectedLang);
        changeLanguage(selectedLang);
    });
});

    const prices = [
        { crop: "Wheat", location: "Banasthali niwai", price: 2200 },
        { crop: "Rice", location: "Ahmadpura", price: 2500 },
        { crop: "Sugarcane", location: "Agarpura", price: 3100 },
        { crop: "Cotton", location: "Ajeetpura", price: 6000 }
    ];

    const tableBody = document.getElementById("priceData");

    prices.forEach(item => {
        let row = `<tr>
            <td>${item.crop}</td>
            <td>${item.location}</td>
            <td>₹${item.price}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });
