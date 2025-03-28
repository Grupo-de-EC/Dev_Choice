// Function to send message
function sendMessage() {
  const input = document.getElementById("user-input");
  const text = input.value.trim();
  if (text !== "") {
    const messagesDiv = document.getElementById("messages");
    const msg = document.createElement("div");
    msg.className = "message";
    msg.textContent = text;
    messagesDiv.appendChild(msg);
    input.value = "";
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }
}

// Contrast Toggle
document.getElementById("contrasteBtn").addEventListener("click", () => {
  document.body.classList.toggle("alto-contraste");
});

// Optional: Prevent form submission on search (if needed)
document.getElementById("search-form").addEventListener("submit", function (e) {
  e.preventDefault();
  // Add search functionality here if desired
});
