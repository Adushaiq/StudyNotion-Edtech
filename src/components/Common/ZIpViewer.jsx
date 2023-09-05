import React, { useState } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const ZipViewer = ({ zipUrl }) => {
  const [downloading, setDownloading] = useState(false);

  const downloadZipFile = async () => {
    setDownloading(true);

    console.log("zipUrl: ", zipUrl)
    try {

      const response = await fetch(zipUrl);
      const blob = await response.blob();

      // Create a new ZIP archive
      const zip = new JSZip();

      // Add the fetched content to the ZIP archive
      zip.file('downloaded.zip', blob);

      // Generate the ZIP content
      const zipContent = await zip.generateAsync({ type: 'blob' });

      // Save the ZIP content as a file
      saveAs(zipContent, 'downloaded.zip');
    } catch (error) {
      console.error('Error downloading or creating ZIP:', error);
    }

    setDownloading(false);
  };

  return (
    <div className="w-full h-[70vh] flex justify-center items-center">
      <button
        onClick={downloadZipFile}
        className=" bg-yellow-50 p-4 rounded-lg text-black font-bold hover:bg-yellow-200"
        disabled={downloading}
      >
        {downloading ? 'Downloading...' : 'DOWNLOAD ZIP'}
      </button>
    </div>
  );
};

export default ZipViewer;
