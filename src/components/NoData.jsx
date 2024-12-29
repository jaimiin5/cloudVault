import { Card, CardBody } from "@nextui-org/react";

export function NoData() {
  return (
    <Card className="mt-60 w-full bg-[#0A0A0A]">
      <CardBody className="text-center py-10">
        <svg
          className="mx-auto h-12 w-12 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
          />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-400">No files</h3>
        <a  href='/' className="mt-1 text-sm text-gray-500 underline">
          Get started by Uploading a new file.
        </a>
      </CardBody>
    </Card>
  );
}
