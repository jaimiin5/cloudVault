import React, { useState } from "react";
import FileListData from "./FileListData";
import Navbar from "./Navbar";

const Landing = () => {
  return (
    // <------file dropzone------>

    <div>
      <Navbar/>
      <FileListData/>
    </div>
  );
};

export default Landing;
