import React from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SummaryStats from './SummaryStats';
import ItemList from './ItemList';
import styles from './MainView.module.css';

const MainView: React.FC = () => {
  const navigate = useNavigate();

  // Mock data for SummaryStats
  const summaryData = {
    totalItems: 1000,
    reviewedItems: 250,
    unreviewedItems: 750,
  };

  const handleAttributeReviewClick = () => {
    navigate('/attributes');
  };

  const handleExportClick = () => {
    // This will be connected to the 'export_csv' Tauri command
    alert('Export & Save clicked (mocked).');
  };

  return (
    <Paper elevation={3} className={styles.mainViewContainer}>
      <Box className={styles.header}>
        <Typography variant="h4" gutterBottom>
          Sentinel Review Dashboard
        </Typography>
        <Box>
          <Button variant="contained" onClick={handleAttributeReviewClick} sx={{ mr: 2 }}>
            Review by Attribute
          </Button>
          <Button variant="contained" color="primary" onClick={handleExportClick}>
            Export & Save
          </Button>
        </Box>
      </Box>

      <SummaryStats
        totalItems={summaryData.totalItems}
        reviewedItems={summaryData.reviewedItems}
        unreviewedItems={summaryData.unreviewedItems}
      />

      <ItemList />
    </Paper>
  );
};

export default MainView;
