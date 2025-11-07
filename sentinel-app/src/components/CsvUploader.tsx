import React, { useState, useCallback } from 'react';
import { Button, Box, Typography, Paper } from '@mui/material';
import { useDropzone } from 'react-dropzone';

const CsvUploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      if (selectedFile.type === 'text/csv') {
        setFile(selectedFile);
      } else {
        alert('Please select a valid .csv file.');
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
    },
    multiple: false,
  });

  const handleIngest = async () => {
    if (file) {
      try {
        // This is where the Tauri command would be invoked.
        // For now, we'll just log a message.
        console.log(`Invoking ingest_csv with file: ${file.name}`);
        // await invoke('ingest_csv', { filePath: file.path }); // .path is not available in browser File API
        alert('CSV ingestion complete (mocked).');
      } catch (error) {
        console.error('Error ingesting CSV:', error);
        alert('Error during CSV ingestion.');
      }
    } else {
      alert('Please select a file to ingest.');
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 4, textAlign: 'center' }}>
      <Typography variant="h5" gutterBottom>
        Upload Product Data
      </Typography>
      <Box
        {...getRootProps()}
        sx={{
          border: '2px dashed grey',
          padding: 4,
          marginBottom: 2,
          cursor: 'pointer',
          backgroundColor: isDragActive ? '#f0f0f0' : 'transparent',
        }}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <Typography>Drop the CSV file here ...</Typography>
        ) : (
          <Typography>Drag 'n' drop a CSV file here, or click to select a file</Typography>
        )}
      </Box>
      {file && (
        <Typography variant="body1" gutterBottom>
          Selected file: {file.name}
        </Typography>
      )}
      <Button variant="contained" onClick={handleIngest} disabled={!file}>
        Ingest Data
      </Button>
    </Paper>
  );
};

export default CsvUploader;
