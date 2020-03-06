import React from "react";
import ReactEmoji from 'react-emoji'


const Message = ({ message: { user, text }, name }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <div>
      <div>
        <p>{trimmedName}: {ReactEmoji.emojify(text)}</p>
      </div>
    </div>
  ) : (
    <div>
      <div>
        <p>{user}: {ReactEmoji.emojify(text)}</p>
      </div>
    </div>
  );
};

export default Message;
