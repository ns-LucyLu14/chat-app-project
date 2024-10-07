"use client";

import React, { useRef, useState } from "react";

const AddFriendPage = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [input, setInput] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e);
  };

  return (
    <main className="px-6 pt-8">
      <h1 className="mb-8 text-5xl font-bold">
        Add a friend to start chatting with them!
      </h1>
      <form className="max-w-sm" onSubmit={handleSubmit}>
        <label
          htmlFor="text"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Add friend by Name or Username
        </label>

        <div className="mt-2 flex gap-4">
          <input
            type="text"
            ref={inputRef}
            value={input}
            onChange={handleChange}
            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Enter Name or Username"
          />
          <button className="rounded-md bg-indigo-600 px-10 py-3 font-semibold text-white no-underline transition hover:bg-indigo-200">
            Add
          </button>
        </div>
      </form>
    </main>
  );
};

export default AddFriendPage;
