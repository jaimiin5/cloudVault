/* eslint-disable react/prop-types */
import Sidebar from './SideBar'

export default function MainLayout({ children }) {
  return (
    <div className="flex h-screen bg-[#0A0A0A]">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6">
        {children}  {/* Render children (Home, FileGrid, etc.) */}
      </main>
    </div>
  );
}
