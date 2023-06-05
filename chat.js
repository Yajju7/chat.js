// widget.js
(function () {
    // Add the CSS file to the HTML head
    const widgetCss = document.createElement("link");
    widgetCss.href = "chat.css";
    widgetCss.rel = "stylesheet";
    document.head.appendChild(widgetCss);
  
    // Create the widget's HTML structure
    const widgetButtonHtml = `
  <button class="widget-toggle">
      <div class="chat-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="11.5" stroke="currentColor" fill="none"/>
      <path d="M14.527 20l3.607-4.498h4.41C22.703 15.5 24 14.202 24 12.597V2.903C24 1.298 22.703 0 21.097 0H2.903C1.297 0 0 1.298 0 2.903v9.694C0 14.202 1.297 15.5 2.903 15.5h6.57l3.607 4.498L14.527 20zm-2.527-8c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6z" fill="currentColor"/>
     </svg>
      </div>
  </button>
`



    const widgetHtml = `
      <div class="widget" style="display:none">
          <div class="widget-header">
              Chat
          </div>
          <div class="widget-body">
              <div class="messages"></div>
          </div>
          <div class="widget-footer">
              <form id="messageForm">
                  <input type="text" name="message" placeholder="Type your message" />
                  <button type="submit">Send</button>
              </form>
          </div>
      </div>
    `;
  
    // Add the widget to the webpage
    const widgetWrapper = document.createElement("div");
    widgetWrapper.innerHTML = widgetHtml;
    document.body.appendChild(widgetWrapper);

    const widgetButton = document.createElement("div");
    widgetButton.innerHTML = widgetButtonHtml;
    document.body.appendChild(widgetButton);
    
    widgetButton.addEventListener("click", function () {
        const widget = document.querySelector(".widget");
        const chatIcon = document.querySelector(".chat-icon");
      
        if (widget.style.display === "none") {
          widget.style.display = "block";
          chatIcon.classList.add("opened");
        } else {
          widget.style.display = "none";
          chatIcon.classList.remove("opened");
        }
      });
      
  
  }());

const form = document.getElementById("messageForm");
const messagesContainer = document.querySelector(".messages");

const apiEndpoint = "http://127.0.0.1:5000/api/message";
const apiKey = "your-api-key"; // Replace with your API key or authentication method

const chatAPI = {
    sendMessage: async (message) => {
        const response = await fetch(apiEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message: message })
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error("Failed to send message");
        }
    },
};


// Add a function to handle receiving messages from the chat API and updating the UI
form.addEventListener("submit",  (event) => {
    event.preventDefault();
    const input = event.target.message;
    const message = input.value.trim();
    if (message === "") return;
        messageFunc(message)
     input.value = "";
});

async function messageFunc(message){  
   const sentMessageItem = document.createElement("div");
   sentMessageItem.classList.add("message", "sent-message");
   sentMessageItem.textContent = message;
  messagesContainer.appendChild(sentMessageItem);
  const messageData = await chatAPI.sendMessage(message);
   const responseMessageItem = document.createElement("div");
   responseMessageItem.classList.add("message", "received-message");
   responseMessageItem.textContent = messageData.response;
   messagesContainer.appendChild(responseMessageItem);

}