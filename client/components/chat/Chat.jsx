import React, { useEffect, useRef, useState } from "react";
import "./Chat.css";
import socket from "../../src/service/socket";
const Chat = ({ setChat, chat }) => {
  const [messageState, setMessage] = useState([]);
  const sendRef = useRef();
  useEffect(() => {
    // console.log("hello");
    socket.emit("JOIN", { id: chat._id });
    socket.on("RECEVED", (data) => {
      if (data.data.messageSEND) {
        setMessage((prev) => [...prev, { send: data.data.messageSEND }]);
      } else if (data.data.messageRES) {
        setMessage((prev) => [...prev, { res: data.data.messageRES }]);
      }
      console.log(data);
    });
  }, []);
  const send = (e) => {
    e.preventDefault();
    socket.emit("MESSAGE", {
      id: chat._id,
      messageSEND: sendRef.current.value,
    });
  };
  return (
    <div className="OuterChat">
      <div class="chat-popup">
        <header class="chat-header">
          <h3>Chat with {chat?.details?.full_name}</h3>
          <button class="close-button" onClick={() => setChat(null)}>
            &times;
          </button>
        </header>

        <div class="chat-messages">
          {/* <div class="message received">
            Hi! I see you booked me for an electrical issue. Can you please
            provide more details?
          </div>
          <div class="message sent">
            Yes, my main light in the living room is not working. I think it
            might be a short circuit.
          </div> */}
          {/* <div class="message received">
            Understood. I'll be there around 2 PM. I'll bring all the necessary
            tools.
          </div>
          <div class="message sent">Sounds good, see you then!</div> */}
          {messageState.map((ele) => (
            <>
              {ele.send ? (
                <div class="message sent">{ele?.send}</div>
              ) : (
                <div class="message received">{ele?.res}</div>
              )}
            </>
          ))}
        </div>

        <form class="chat-input-form" onSubmit={send}>
          <input
            type="text"
            class="chat-input"
            placeholder="Type your message..."
            ref={sendRef}
            required
          />
          <button type="submit" class="send-button">
            &#10148;
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
