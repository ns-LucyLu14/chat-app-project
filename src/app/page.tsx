import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await getServerAuthSession();

  if (session) redirect("/dashboard");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div
        className={`container flex flex-col items-center justify-center gap-12 bg-background px-4 py-16`}
      >
        <h1 className="text-5xl font-extrabold tracking-tight text-primaryText sm:text-[5rem]">
          Domagoj <span className="text-[hsl(280,100%,70%)]">Chat-App</span>{" "}
          Project
        </h1>

        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-col items-center justify-center gap-4">
            <Link
              href={"/api/auth/signin"}
              className="rounded-full bg-secondaryBackground px-10 py-3 font-semibold text-primaryText no-underline transition hover:bg-primaryHover hover:text-secondaryText"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
