import React from "react";

const NoData = () => {
  return (
    <div>
      <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Welcome to File Management Application
      </h1>
      <p class="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
        Our platform allows you to easily upload, store, and manage all your
        files in one secure place. Whether you're uploading images, documents,
        or any other type of file, we make it simple for you to keep everything
        organized and accessible.
      </p>
      <p className="mb-6 text-lg font-bold text-sky-600 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
        Cuurently you haven't upload any files yet click below to upload
      </p>
      <a
        href="/drop"
        class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
      >
        Upload file
        <svg
          class="w-3.5 h-3.5 ms-2 rtl:rotate-180"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </a>
    </div>
  );
};

export default NoData;
