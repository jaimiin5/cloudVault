import { useState, useEffect } from "react";
import axios from "axios";
import { FileCard } from "./FileCard";
import { SearchBar } from "./SearchBar";
import { PaginationBar } from "./Pagination";
import { NoData } from "./NoData";
import { UseReload } from "../context/ReloadContext";

export default function FileGrid() {
  const { reload } = UseReload();

  const [files, setFiles] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFiles = async () => {
      const userId = localStorage.getItem("activeUserId");
      const token = localStorage.getItem("token");

      setIsLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/files/${userId}`,

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: { page: currentPage, limit: 8 },
          }
        );
        setFiles(response.data.files);
        setTotalPages(Math.ceil(response.data.length / response.data.limit));
      } catch (err) {
        setError(`${err}Failed to fetch files`);
      }
      setIsLoading(false);
    };

    fetchFiles();
  }, [currentPage, reload]);

  const filteredFiles = files.filter((file) =>
    file.filename.toLowerCase().includes(searchValue.toLowerCase())
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="h-screen p-7">
      {/* <h5 className="text-white font-bold text-2xl">Welcom Back</h5> */}
      {files.length > 0 && (
        <SearchBar value={searchValue} onChange={setSearchValue} />
      )}
      {filteredFiles.length > 0 ? (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12  mt-6">
            {filteredFiles.map((file) => (
              <FileCard key={file.file_id} file={file} />
            ))}
          </div>
          <PaginationBar
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      ) : (
        <NoData />
      )}
    </div>
  );
}
