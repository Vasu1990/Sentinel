import React from 'react';
import { Box, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import styles from './AttributeReviewList.module.css';

// Mock data for unique attributes
const mockAttributes = [
  { id: 1, name: 'Age Group', count: 30, reviewed: true },
  { id: 2, name: 'Clothing Type', count: 30, reviewed: false },
  { id: 3, name: 'Fit', count: 25, reviewed: true },
  { id: 4, name: 'Flame Resistant', count: 15, reviewed: false },
  { id: 5, name: 'Material', count: 28, reviewed: true },
];

const AttributeReviewList: React.FC = () => {
  const navigate = useNavigate();

  const handleAttributeClick = (attributeName: string) => {
    navigate(`/attribute/${encodeURIComponent(attributeName)}`);
  };

  return (
    <Paper elevation={3} sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Review by Attribute
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Attribute Name</TableCell>
              <TableCell align="right">Count</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockAttributes.map((attr) => (
              <TableRow
                key={attr.id}
                hover
                className={styles.clickableRow}
                onClick={() => handleAttributeClick(attr.name)}
              >
                <TableCell component="th" scope="row">
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {attr.name}
                    {attr.reviewed && <CheckCircleIcon color="success" sx={{ fontSize: '1rem' }} />}
                  </Box>
                </TableCell>
                <TableCell align="right">{attr.count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default AttributeReviewList;
