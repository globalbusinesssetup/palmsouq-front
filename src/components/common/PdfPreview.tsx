// components/PdfPreview.js
import React from 'react';

const PdfPreview = ({ fileUrl }: any) => {
  return (
    <object data={fileUrl} type="application/pdf" width="100%" height="100%">
      <iframe
        src={fileUrl}
        width="100%"
        height="100%"
        style={{ border: 'none' }}
      >
        This browser does not support PDFs. Please download the PDF to view it:
        <a href={fileUrl}>Download PDF</a>
      </iframe>
    </object>
  );
};

export default PdfPreview;
