import React, { useState, useEffect } from "react";
import axios from "axios";
import "./chatbot.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [faqList, setFaqList] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [showFaqs, setShowFaqs] = useState(false);
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [botTyping, setBotTyping] = useState(false);
  const [showChat, setShowChat] = useState(false);
  
  const [ticket, setTicket] = useState({
    employeeId: "",
    ticketType: "",
    ticketDescription: "",
  });

  const customerId = localStorage.getItem("customerId") || null;

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await axios.get("http://localhost:9829/chatbot/faqs");
        setFaqList(res.data);
      } catch (error) {
        console.error("Error fetching FAQs", error);
      }
    };
    fetchFaqs();
  }, []);

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    const userMessage = { text, sender: "user", timestamp: new Date().toLocaleTimeString() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setBotTyping(true);

    let response = "Sorry, I don't understand that.";
    
    if (text.toLowerCase() === "hi") {
      response = "Hi, how may I help you?";
      setShowOptions(true);
      setShowTicketForm(false);
    } else if (text === "Raise Ticket") {
      setShowTicketForm(true);
      setBotTyping(false);
      return;
    } else if (text === "Check My Ticket Status") {
      if (!customerId) {
        response = "Customer ID not found. Please log in again.";
      } else {
        try {
          const res = await axios.get(`http://localhost:9829/chatbot/ticketstatus/${customerId}`);
          response = res.data;
        } catch (error) {
          response = "Error fetching ticket status.";
        }
      }
    } else if (text === "FAQs") {
      setShowFaqs(true);
      setMessages((prev) => [
        ...prev,
        ...faqList.map(faq => ({ text: `${faq.question}: ${faq.answer}`, sender: "bot", timestamp: new Date().toLocaleTimeString() }))
      ]);
      setBotTyping(false);
      return;
    }

    setTimeout(() => {
      setMessages((prev) => [...prev, { text: response, sender: "bot", timestamp: new Date().toLocaleTimeString() }]);
      setBotTyping(false);
    }, 1000);
  };

  const handleTicketChange = (e) => {
    setTicket({ ...ticket, [e.target.name]: e.target.value });
  };

  const submitTicket = async () => {
    if (!ticket.ticketType || !ticket.ticketDescription || !ticket.employeeId) {
      alert("Please fill in all required fields.");
      return;
    }

    const newTicket = {
      customerId,
      employeeId: ticket.employeeId,
      ticketType: ticket.ticketType,
      ticketDescription: ticket.ticketDescription,
      ticketRaiseDate: new Date().toISOString().slice(0, 19),
      ticketStatus: "PENDING",
    };

    try {
      await axios.post("http://localhost:9829/ticket/addTicket", newTicket, {
        headers: { "Content-Type": "application/json" },
      });
      setMessages((prev) => [...prev, { text: "Your ticket has been raised successfully!", sender: "bot" }]);
      setShowTicketForm(false);
      setTicket({ employeeId: "", ticketType: "", ticketDescription: "" });
    } catch (error) {
      alert(`Error: ${error.response?.data?.message || "Failed to submit ticket."}`);
    }
  };

  return (
    <>
      {!showChat && (
        <div className="chatbot-icon-container" onClick={() => setShowChat(true)}>
          <span className="chatbot-icon">🤖</span>
        </div>
      )}
      {showChat && (
        <div className="chatbot-container">
          <div className="chatbot-header">Chatbot <button className="close-chat" onClick={() => setShowChat(false)}>✖</button></div>
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                <span className="message-avatar">{msg.sender === "bot" ? "🤖" : "👤"}</span>
                <div className="message-content">{msg.text}</div>
                <span className="message-timestamp">{msg.timestamp}</span>
              </div>
            ))}
            {botTyping && <div className="bot-typing">🤖 Bot is typing...</div>}
          </div>
          {showOptions && !showTicketForm && (
            <div className="chatbot-options">
              <button onClick={() => sendMessage("Raise Ticket")}>Raise Ticket</button>
              <button onClick={() => sendMessage("Check My Ticket Status")}>Check My Ticket Status</button>
              <button onClick={() => sendMessage("FAQs")}>FAQs</button>
            </div>
          )}
          {showTicketForm && (
            <div className="chatbot-ticket-form">
              <h4>Raise a Ticket</h4>
              <input type="text" name="employeeId" placeholder="Employee ID" value={ticket.employeeId} onChange={handleTicketChange} required /><br/>
              <select name="ticketType" value={ticket.ticketType} onChange={handleTicketChange} required>
                <option value="">Select Issue Type</option>
                <option value="Service">Service</option>
                <option value="Technical">Technical</option>
                <option value="Billing">Billing</option>
              </select><br/>
              <textarea name="ticketDescription" placeholder="Describe your issue" value={ticket.ticketDescription} onChange={handleTicketChange} required />
              <button onClick={submitTicket}>Submit</button>
            </div>
          )}
          <div className="chatbot-input">
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type 'Hi' to start conversation..." />
            <button onClick={() => sendMessage(input)}>Send</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
