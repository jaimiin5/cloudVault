/* eslint-disable react/prop-types */
import { Sidebar } from "./SideBar";

function Layout({ children }) {
  return (
    <div className="h-screen p-2 flex justify-start items-center bg-[#0A0A0A]">
      <Sidebar />
      <main className="w-full m-10">{children}</main>
    </div>
  );
}

export default Layout;
