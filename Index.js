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
document.getElementById("contrasteBtn").addEventListener("click", function () {
  document.body.classList.toggle("alto-contraste");
});
