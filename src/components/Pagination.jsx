/* eslint-disable react/prop-types */
import { Pagination, Button } from "@nextui-org/react";

export function PaginationBar({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="absolute bottom-5 right-5 text-white space-y-4">
      {/* Pagination */}
      <Pagination
        showShadow
        color="primary"
        page={currentPage}
        total={totalPages}
        onChange={onPageChange}
      />

      {/* Previous and Next buttons */}
      <div className="flex gap-2">
        <Button
          color="primary"
          size="sm"
          variant="ghost"
          onPress={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <Button
          color="primary"
          size="sm"
          variant="ghost"
          disabled={currentPage === totalPages}
          onPress={() => onPageChange(currentPage + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
