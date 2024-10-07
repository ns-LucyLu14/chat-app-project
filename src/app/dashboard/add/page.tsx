import React from "react";
import AddFriendForm from "~/app/components/AddFriendForm/AddFriendForm";
import { getServerAuthSession } from "~/server/auth";

const AddFriendPage = async () => {
  const session = await getServerAuthSession();
  if (!session) {
    throw new Error();
  }

  return (
    <main className="px-6 pt-8">
      <h1 className="mb-8 text-5xl font-bold">
        Add a friend to start chatting with them!
      </h1>
      <AddFriendForm userId={session.user.id} />
    </main>
  );
};

export default AddFriendPage;
