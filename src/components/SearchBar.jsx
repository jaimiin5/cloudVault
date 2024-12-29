/* eslint-disable react/prop-types */
export function SearchBar({ value, onChange }) {
  return (
    <div className="relative left-[1200px] w-1/5 rounded-lg">
      <input
        type="text"
        placeholder="Search files..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 text-white bg-[#1d1d1d] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <svg
        className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        ></path>
      </svg>
    </div>
  );
}
