import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Paper, Button, Tabs, Tab,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TextField, Radio, FormControlLabel, Accordion, AccordionSummary, AccordionDetails,
  Divider, FormControl, Select, MenuItem, Link
} from '@mui/material';
import Grid from '@mui/material/Grid';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useParams, useNavigate, useLocation } from 'react-router-dom';


interface Attribute {
  id: number;
  name: string;
  vody: string;
  pim: string;
  grounding: string;
  status: string;
  groundingQuote: string;
  confidence: string;
  groundingLinks: string;
  groundingWebsite: string;
  finalValue?: string; // Make finalValue optional
}

  
const mockAttributes: Attribute[] = [
    { id: 1, name: 'Age Group', vody: 'Adults', pim: 'Adults', grounding: 'Adults', status: 'Auto-Approved', groundingQuote: 'Suitable for adults.', confidence: 'high', groundingLinks: 'https://example.com/link1,https://example.com/link2', groundingWebsite: 'walmart.com', finalValue: 'Adults' },
    { id: 2, name: 'Clothing Type', vody: 'Jeans', pim: 'Jeans', grounding: 'Jeans', status: 'Auto-Approved', groundingQuote: 'Classic denim jeans.', confidence: 'high', groundingLinks: 'https://example.com/link1', groundingWebsite: 'amazon.com', finalValue: '' },
    { id: 3, name: 'Fit', vody: 'Straight', pim: 'Regular', grounding: 'Straight', status: 'Manual Review', groundingQuote: 'Straight leg fit.', confidence: 'low', groundingLinks: '', groundingWebsite: '', finalValue: 'Regular' },
    { id: 4, name: 'Flame Resistant', vody: 'No', pim: 'No', grounding: 'N/A', status: 'Expert Review', groundingQuote: 'Not flame resistant.', confidence: 'high', groundingLinks: '', groundingWebsite: '', finalValue: '' },
    { id: 5, name: 'Material', vody: 'Denim', pim: 'Cotton', grounding: 'Cotton Blend', status: 'Manual Review', groundingQuote: 'Made from a durable cotton blend.', confidence: 'low', groundingLinks: 'https://example.com/link1,https://example.com/link2', groundingWebsite: 'target.com', finalValue: 'Cotton' },
  ];

interface ReviewState {
  finalValue: string;
  source: 'vody' | 'pim' | 'grounding' | 'custom' | null;
}

type Status = 'REVIEWED' | 'IN_REVIEW' | 'UNREVIEWED';

const ItemReviewView: React.FC = () => {
  const { itemNumber } = useParams<{ itemNumber: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { item } = location.state || {};

  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [reviewState, setReviewState] = useState<Record<number, ReviewState>>({});
  const [activeTab, setActiveTab] = useState('All');
  const [expanded, setExpanded] = useState<number | false>(false);
  const [itemStatus, setItemStatus] = useState<Status>(item?.reviewStatus || 'UNREVIEWED');

  useEffect(() => {
    setAttributes(mockAttributes);
    const initialState: Record<number, ReviewState> = {};
    mockAttributes.forEach(attr => {
      initialState[attr.id] = { finalValue: attr.finalValue || '', source: attr.finalValue ? 'vody' : null };
    });
    setReviewState(initialState);
  }, [itemNumber]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  const handleRadioChange = (attributeId: number, source: 'vody' | 'pim' | 'grounding') => {
    const sourceValue = attributes.find(a => a.id === attributeId)?.[source] || '';
    setReviewState(prev => ({ ...prev, [attributeId]: { finalValue: sourceValue, source: source } }));
  };

  const handleFinalValueChange = (attributeId: number, value: string) => {
    setReviewState(prev => ({ ...prev, [attributeId]: { ...prev[attributeId], finalValue: value, source: 'custom' } }));
  };

  const handleAccordionChange = (panel: number) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleSave = () => {
    alert(`Changes saved (mocked). Item status is now: ${itemStatus}`);
    navigate('/');
  };

  const filteredAttributes = attributes.filter(attr => activeTab === 'All' || attr.status === activeTab);

  const areAllReviewed = (category: string) => {
    const relevantAttributes = attributes.filter(
      attr => category === 'All' ? true : attr.status === category
    );
    if (relevantAttributes.length === 0) return false;
    return relevantAttributes.every(attr =>
      reviewState[attr.id] && reviewState[attr.id].finalValue
    );
  };

  const tabCategories = ['All', 'Auto-Approved', 'Manual Review', 'Expert Review'];

  return (
    <Paper elevation={3} sx={{ padding: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
        <Typography variant="h4">Review Item: {item?.itemNumber || itemNumber}</Typography>
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <Select
            value={itemStatus}
            onChange={(e) => setItemStatus(e.target.value as Status)}
          >
            <MenuItem value="UNREVIEWED">Unreviewed</MenuItem>
            <MenuItem value="IN_REVIEW">In Review</MenuItem>
            <MenuItem value="REVIEWED">Reviewed</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
        gap: 2,
        marginBottom: 2
      }}>
        <Typography><strong>Product name:</strong> {item?.itemName || 'Straight fit Jeans'}</Typography>
        <Typography><strong>Manufacturer:</strong> UX123</Typography>
        <Typography><strong>Vendor:</strong> Levis</Typography>
        <Typography><strong>Missing attributes:</strong> weight, height</Typography>
        <Typography sx={{ gridColumn: { xs: '1', md: '1 / -1' } }}>
          <strong>Product long description:</strong> This is a straight fit Jeans
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: 2 }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          {tabCategories.map(category => (
            <Tab
              key={category}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {category}
                  {areAllReviewed(category) && <CheckCircleIcon color="success" sx={{ fontSize: '1rem' }} />}
                </Box>
              }
              value={category}
            />
          ))}
        </Tabs>
      </Box>
      {filteredAttributes.map((attr) => (
        <Accordion key={attr.id} expanded={expanded === attr.id} onChange={handleAccordionChange(attr.id)}>
          <AccordionSummary>
            <Box sx={{ display: 'flex', width: '100%', alignItems: 'center' }}>
              <Typography sx={{ width: activeTab === 'All' ? '25%' : '33.33%', flexShrink: 0 }}>
                {attr.name}
              </Typography>
              <Typography sx={{ width: activeTab === 'All' ? '25%' : '33.33%', color: 'text.secondary', flexShrink: 0, paddingLeft: 2 }}>
                Final Value: {reviewState[attr.id]?.finalValue}
              </Typography>
              <Typography sx={{ width: activeTab === 'All' ? '25%' : '33.33%', color: 'text.secondary', flexShrink: 0, paddingLeft: 2 }}>
                Confidence: {attr.confidence}
              </Typography>
              {activeTab === 'All' && (
                <Typography sx={{ width: '25%', color: 'text.secondary', flexShrink: 0, paddingLeft: 2 }}>
                  Status: {attr.status}
                </Typography>
              )}
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Vody</TableCell>
                    <TableCell>PIM</TableCell>
                    <TableCell>Grounding</TableCell>
                    <TableCell>Final Value</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <FormControlLabel value="vody" control={<Radio checked={reviewState[attr.id]?.source === 'vody'} onChange={() => handleRadioChange(attr.id, 'vody')} />} label={attr.vody} />
                    </TableCell>
                    <TableCell>
                      <FormControlLabel value="pim" control={<Radio checked={reviewState[attr.id]?.source === 'pim'} onChange={() => handleRadioChange(attr.id, 'pim')} />} label={attr.pim} />
                    </TableCell>
                    <TableCell>
                      <FormControlLabel value="grounding" control={<Radio checked={reviewState[attr.id]?.source === 'grounding'} onChange={() => handleRadioChange(attr.id, 'grounding')} />} label={attr.grounding} />
                    </TableCell>
                    <TableCell>
                      <TextField variant="outlined" size="small" fullWidth value={reviewState[attr.id]?.finalValue || ''} onChange={(e) => handleFinalValueChange(attr.id, e.target.value)} />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            {attr.grounding !== 'N/A' ? (
              <Box sx={{ marginTop: 2 }}>
                <Typography sx={{ mb: 1 }}><strong>Grounding Quote:</strong> "{attr.groundingQuote}"</Typography>
                <Grid container spacing={1}>
                  <Grid size={{ xs: 3 }}>
                    <Typography><strong>Grounding Website:</strong></Typography>
                  </Grid>
                  <Grid size={{ xs: 9 }}>
                    <Typography>{attr.groundingWebsite}</Typography>
                  </Grid>
                  <Grid size={{ xs: 3 }}>
                    <Typography><strong>Grounding Links:</strong></Typography>
                  </Grid>
                  <Grid size={{ xs: 9 }}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      {attr.groundingLinks.split(',').map((link, index) =>
                        link ? (
                          <Link href={link} target="_blank" rel="noopener noreferrer" key={index}>
                            link{index + 1}
                          </Link>
                        ) : null
                      )}
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            ) : (
              <Typography sx={{ marginTop: 2 }}>No grounding data available</Typography>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
      <Box sx={{ marginTop: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button variant="outlined" onClick={() => navigate('/')}>
          Back to Dashboard
        </Button>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Box>
    </Paper>
  );
};

export default ItemReviewView;
