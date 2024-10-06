import Link from "next/link";
import { notFound } from "next/navigation";
import { FC, ReactNode } from "react";
import { FiMoon } from "react-icons/fi";
import { MdOutlineAddBox, MdOutlineConnectedTv } from "react-icons/md";
import { RiUserAddLine } from "react-icons/ri";
import { TbLogout } from "react-icons/tb";
import { getServerAuthSession } from "~/server/auth";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = async ({ children }) => {
  //   const session = await getServerAuthSession();

  //   if (!session) notFound();
  return (
    <div className="flex h-screen w-full">
      <div className="flex h-full w-full max-w-xs grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
        <Link href={"/dashboard"} className="flex h-16 shrink-0 items-center">
          <MdOutlineConnectedTv className="mr-2 h-10 w-10" /> Domagoj Chat App
        </Link>
        <div className="text-xs font-semibold leading-6 text-gray-400">
          Your chats
        </div>

        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>Friend 1</li>
            <li>Friend 2</li>
            <li>
              <div className="text-xs font-semibold leading-6 text-gray-400">
                Overview
              </div>

              <ul role="list" className="-mx-2 mt-2 space-y-1">
                <li>
                  <Link
                    href={"/dashboard/add"}
                    className="text-fray-700 group flex gap-3 rounded-md p-2 text-sm font-semibold leading-6 hover:bg-gray-50 hover:text-indigo-700"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white text-[0.625rem] font-medium text-gray-400 group-hover:border-indigo-600 group-hover:text-indigo-600">
                      <MdOutlineAddBox />
                    </span>
                    Add friend
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/dashboard"}
                    className="text-fray-700 group flex gap-3 rounded-md p-2 text-sm font-semibold leading-6 hover:bg-gray-50 hover:text-indigo-700"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white text-[0.625rem] font-medium text-gray-400 group-hover:border-indigo-600 group-hover:text-indigo-600">
                      <RiUserAddLine />
                    </span>
                    Friend requests
                  </Link>
                </li>
              </ul>
            </li>
            <li className="-mx-6 mt-auto flex items-center justify-between px-2">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white text-[0.625rem] font-medium text-gray-400 hover:border-indigo-600 hover:text-indigo-600">
                <FiMoon className="h-5 w-5" />
              </div>
              <div className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-700">
                Footer
              </div>

              <Link
                href={"/"}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white text-[0.625rem] font-medium text-gray-400 hover:border-indigo-600 hover:text-indigo-600"
              >
                <TbLogout className="h-5 w-5" />
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {children}
    </div>
  );
};

export default Layout;
