import React from 'react'
import { Document, Page } from 'react-pdf';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

const FileModal = () => {
  return (
       <Document file={`http://127.0.0.1:5000/static/uploads/download.jpg`}>
      <Page pageNumber={1} />
    </Document>
  )
}

export default FileModal
