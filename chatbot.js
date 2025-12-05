// Chatbot JavaScript
const chatMessages = document.getElementById("chatMessages");
const chatInput = document.getElementById("chatInput");
const sendBtn = document.querySelector(".chat-send-btn");

const responses = {
  hello: "Hello! How can I assist you today?",
  hi: "Hi there! What can I do for you?",
  hey: "Hey! How can I help?",
  "how are you": "I'm doing great, thank you for asking! How about you?",
  "what can you do":
    "I can answer questions, provide information, help with various tasks, and engage in conversation. Try asking me something!",
  help: "I'm here to help! You can ask me about various topics, get information, or just chat. What would you like to know?",
  bye: "Goodbye! Feel free to come back anytime you need assistance.",
  goodbye: "Goodbye! Have a great day!",
  thanks: "You're welcome! Happy to help!",
  "thank you": "You're very welcome! Is there anything else I can help with?",
  weather:
    "I don't have real-time weather data, but I recommend checking a weather website for current conditions in your area.",
  time: `The current time is ${new Date().toLocaleTimeString()}.`,
  date: `Today is ${new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })}.`,
  name: "I'm an AI assistant created to help answer your questions and assist with various tasks.",
  "who made you":
    "I was created by Alex Morgan as part of a portfolio project to demonstrate AI chatbot capabilities.",
  "who created you":
    "I was developed by Alex Morgan, a full-stack developer and social media manager.",
  features:
    "This chatbot features natural language processing, context awareness, and can handle a variety of queries. It's built with modern web technologies!",
  "your name": "I'm an AI assistant. You can call me Helper!",
  joke: "Why do programmers prefer dark mode? Because light attracts bugs! 😄",
  "tell me a joke":
    "Why did the developer go broke? Because he used up all his cache! 💰",
  "how old are you":
    "I was created recently as part of this portfolio project, so I'm quite young!",
  "where are you from":
    "I exist in the digital realm, created using HTML, CSS, and JavaScript.",
  "favorite color":
    "I love the gradient colors used in this portfolio - purple and pink! They're very modern.",
  "what is your purpose":
    "My purpose is to demonstrate conversational AI capabilities and assist users with their questions.",
};

function sendMessage() {
  const message = chatInput.value.trim();
  if (!message) return;

  // Disable input while processing
  chatInput.disabled = true;
  sendBtn.disabled = true;

  // Add user message
  addMessage(message, "user");
  chatInput.value = "";

  // Show typing indicator
  setTimeout(() => {
    // Get bot response
    const response = getBotResponse(message);
    addMessage(response, "bot");

    // Re-enable input
    chatInput.disabled = false;
    sendBtn.disabled = false;
    chatInput.focus();
  }, 1000);
}

function addMessage(text, sender) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${sender}`;

  const avatar = document.createElement("div");
  avatar.className = "message-avatar";
  avatar.textContent = sender === "bot" ? "🤖" : "👤";

  const content = document.createElement("div");
  content.className = "message-content";
  content.textContent = text;

  messageDiv.appendChild(avatar);
  messageDiv.appendChild(content);

  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getBotResponse(message) {
  const lowerMessage = message.toLowerCase();

  // Check for exact matches
  for (let key in responses) {
    if (lowerMessage.includes(key)) {
      return responses[key];
    }
  }

  // Check for greetings
  if (
    lowerMessage.match(
      /^(hi|hello|hey|greetings|good morning|good afternoon|good evening)/
    )
  ) {
    return "Hello! How can I help you today?";
  }

  // Check for questions
  if (lowerMessage.includes("?")) {
    return "That's an interesting question! While I have limited knowledge in this demo, a full implementation would provide detailed answers based on your query.";
  }

  // Check for short messages
  if (lowerMessage.length < 3) {
    return "Could you please provide more details? I'm here to help!";
  }

  // Default responses based on sentiment
  if (lowerMessage.match(/love|like|great|awesome|amazing|good|excellent/)) {
    return "I'm glad you're enjoying our conversation! What else would you like to know?";
  }

  if (lowerMessage.match(/bad|hate|terrible|awful|worst/)) {
    return "I'm sorry to hear that. How can I help make things better?";
  }

  // Random default responses
  const defaultResponses = [
    "That's interesting! Tell me more.",
    "I understand. How can I help you with that?",
    "Thanks for sharing! What else would you like to know?",
    "I see! Is there anything specific I can help you with?",
    "Interesting point! Feel free to ask me anything else.",
    "I appreciate you sharing that. What would you like to discuss?",
  ];

  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

// Event listeners
sendBtn.addEventListener("click", sendMessage);

chatInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});

// Add initial messages
setTimeout(() => {
  addMessage("Hello! I'm your AI assistant. How can I help you today?", "bot");
}, 500);

// Focus input on load
window.addEventListener("load", () => {
  chatInput.focus();
});
