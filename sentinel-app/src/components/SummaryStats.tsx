import React from 'react';
import { Paper, Typography, Grid, Box } from '@mui/material';
import styles from './SummaryStats.module.css';

interface SummaryStatsProps {
  totalItems: number;
  reviewedItems: number;
  unreviewedItems: number;
}

const SummaryStats: React.FC<SummaryStatsProps> = ({
  totalItems,
  reviewedItems,
  unreviewedItems,
}) => {
  return (
    <Paper elevation={2} className={styles.summaryContainer}>
      <Grid container spacing={2} alignItems="center">
        <Grid size={{ xs: 12 }}>
          <Typography variant="h6" gutterBottom>
            Review Summary
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 4 }}>
              <Box textAlign="center">
                <Typography variant="h5">{totalItems}</Typography>
                <Typography color="textSecondary">Total Items</Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 4 }}>
              <Box textAlign="center">
                <Typography variant="h5" color="green">{reviewedItems}</Typography>
                <Typography color="textSecondary">Reviewed</Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 4 }}>
              <Box textAlign="center">
                <Typography variant="h5" color="orange">{unreviewedItems}</Typography>
                <Typography color="textSecondary">Unreviewed</Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default SummaryStats;
