"use client";

import React, { useRef } from "react";

interface MessageProps {}

const Messages = (props: MessageProps) => {
  const scrollDownRef = useRef<HTMLDivElement | null>(null);
  return (
    <div
      id="messages"
      className="scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch flex h-full flex-1 flex-col-reverse gap-4 overflow-y-auto p-3"
    >
      <div ref={scrollDownRef} />
      <div className="chat-message">
        <div>
          <div className="mx-2 flex max-w-xs flex-col space-y-2 text-base">
            <span className="inline-block rounded-lg bg-indigo-600 px-4 py-2 text-white">
              Messageeeeee ad sad sadka'skd'aksd'askd'aksd'akkk'k'as'lkd'ka 1{" "}
              <span className="ml-2 justify-self-end text-xs text-white">
                22:00
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
