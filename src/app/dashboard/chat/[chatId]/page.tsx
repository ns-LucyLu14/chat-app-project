import React from "react";

interface PageProps {
  params: {
    chatId: string;
  };
}

const Chat = ({ params }: PageProps) => {
  return <div>chat room {params.chatId}</div>;
};

export default Chat;
