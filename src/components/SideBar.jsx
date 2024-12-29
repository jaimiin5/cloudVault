import { useNavigate } from "react-router-dom";

export function Sidebar() {
  const navigate = useNavigate();
  const sideLinks = [
    { name: "Home", url: "/" },
    { name: "Files", url: "files" },
  ];

  const handleLogout = () => {
    localStorage.clear(); // Clear localStorage
    navigate("/login"); // Redirect to login after logout
  };

  return (
    <aside className="h-full w-80 bg-[#1D1D1D] text-white p-6 m-2 rounded-xl">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <nav>
        <ul className="space-y-2">
          {sideLinks.map((link, i) => (
            <li key={i}>
              <a
                href={link.url}
                className="block py-2 px-4 rounded hover:bg-gray-700 w-full text-left"
              >
                {link.name}
              </a>
            </li>
          ))}
          <li>
            <button
              onClick={handleLogout} // Log out and redirect to home
              className="block py-2 px-4 rounded hover:bg-gray-700 w-full text-left"
            >
              Log out
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
