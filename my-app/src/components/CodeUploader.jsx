import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const CodeUploader = ({ onFileUpload }) => {
  const onDrop = useCallback((acceptedFiles) => {
    onFileUpload(acceptedFiles[0]);
  }, [onFileUpload]);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="upload-box">
      <input {...getInputProps()} />
      <p>Drag & drop your code here, or click to upload</p>
    </div>
  );
};

export default CodeUploader;
