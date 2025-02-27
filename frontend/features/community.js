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
    const chatContainer = document.getElementById("chatContainer");
    const messageInput = document.getElementById("messageInput");
    const sendMessageBtn = document.getElementById("sendMessageBtn");

    function addMessage(text, isUser = true) {
        let messageElement = document.createElement("div");
        messageElement.classList.add("message");
        messageElement.classList.add(isUser ? "user-message" : "other-message");
        messageElement.textContent = text;
        chatContainer.appendChild(messageElement);
        chatContainer.scrollTop = chatContainer.scrollHeight; // Scroll to bottom
    }

    sendMessageBtn.addEventListener("click", function() {
        let message = messageInput.value.trim();
        if (message === "") return;
        addMessage(message, true);
        messageInput.value = "";
    });

    // Dummy messages to simulate a community chat
    addMessage("🌱 Ramesh: Best season to grow wheat?", false);
    addMessage("🚜 Suresh: Try sowing in November for best yield!", false);
});
