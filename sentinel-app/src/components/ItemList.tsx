import React, { useState, useMemo } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Paper, Typography, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import WarningIcon from '@mui/icons-material/Warning';
import styles from './ItemList.module.css';

type Status = 'REVIEWED' | 'IN_REVIEW' | 'UNREVIEWED';

const StatusCell: React.FC<{ status: Status }> = ({ status }) => {
  const statusConfig = {
    REVIEWED: { text: 'Reviewed', color: 'green', Icon: CheckCircleIcon },
    IN_REVIEW: { text: 'In Review', color: 'orange', Icon: HourglassEmptyIcon },
    UNREVIEWED: { text: 'Unreviewed', color: 'red', Icon: WarningIcon },
  };

  const { text, color, Icon } = statusConfig[status];

  return (
    <Box className={styles.statusCell}>
      <Icon style={{ color }} className={styles.statusIcon} />
      <Typography style={{ color }} className={styles.statusText}>{text}</Typography>
    </Box>
  );
};

const columns: GridColDef[] = [
  { field: 'itemNumber', headerName: 'Item Number', width: 150 },
  { field: 'itemName', headerName: 'Item Name', width: 450, flex: 1 },
  {
    field: 'totalAttributes',
    headerName: 'Total Attributes',
    type: 'number',
    width: 150,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'reviewStatus',
    headerName: 'Review Status',
    width: 150,
    renderCell: (params) => <StatusCell status={params.value} />,
    align: 'right',
    headerAlign: 'right',
  },
];

const allRows = [
  { id: 1, itemNumber: '102671964', itemName: "Dickies Men's Regular Jean", totalAttributes: 15, reviewStatus: 'UNREVIEWED' as Status },
  { id: 2, itemNumber: '102671965', itemName: "Levi's Women's Classic Shorts", totalAttributes: 12, reviewStatus: 'REVIEWED' as Status },
  { id: 3, itemNumber: '102671966', itemName: "Wrangler Men's Cowboy Cut Jeans", totalAttributes: 18, reviewStatus: 'IN_REVIEW' as Status },
  { id: 4, itemNumber: '102671967', itemName: "Kids's Graphic Tee", totalAttributes: 8, reviewStatus: 'UNREVIEWED' as Status },
];

const ItemList: React.FC = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<Status | 'ALL'>('ALL');

  const filteredRows = useMemo(() => {
    return allRows.filter((row) => {
      const matchesSearch =
        row.itemNumber.toLowerCase().includes(searchText.toLowerCase()) ||
        row.itemName.toLowerCase().includes(searchText.toLowerCase());
      const matchesStatus = statusFilter === 'ALL' || row.reviewStatus === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchText, statusFilter]);

  const handleRowClick = (params: any) => {
    navigate(`/item/${params.row.itemNumber}`, { state: { item: params.row } });
  };

  return (
    <Paper elevation={2} className={styles.itemListContainer}>
      <Box className={styles.filterContainer}>
        <TextField
          label="Filter by Item Number or Name"
          variant="outlined"
          size="small"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          sx={{ width: '50%' }}
        />
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            label="Status"
            onChange={(e) => setStatusFilter(e.target.value as Status | 'ALL')}
          >
            <MenuItem value="ALL">All</MenuItem>
            <MenuItem value="REVIEWED">Reviewed</MenuItem>
            <MenuItem value="IN_REVIEW">In Review</MenuItem>
            <MenuItem value="UNREVIEWED">Unreviewed</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <DataGrid
        rows={filteredRows}
        columns={columns}
        pageSizeOptions={[10, 25, 50]}
        onRowClick={handleRowClick}
        className={styles.dataGrid}
      />
    </Paper>
  );
};

export default ItemList;
