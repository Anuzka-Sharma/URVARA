document.getElementById("videoInput").addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (file) {
        const videoPreview = document.getElementById("videoPreview");
        const postButton = document.getElementById("postButton");

        videoPreview.src = URL.createObjectURL(file);
        videoPreview.style.display = "block"; // Show video preview
        postButton.style.display = "block"; // Show "Post" button
    }
});

document.getElementById("postButton").addEventListener("click", function() {
    alert("Your video is being uploaded! 🚀");
    // Yahan actual video upload function add karna hoga (Backend ke saath)
});
