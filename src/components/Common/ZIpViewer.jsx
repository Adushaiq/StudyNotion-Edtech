import React from "react";

const ZipViewer = ({ fileUrl }) => {
  

  return (
    
    <a href={fileUrl} target="_blank" rel="noopener noreferrer">
      Download PDF or ZIP
    </a>
  
  );
};

export default ZipViewer;
