import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Paper, Button, Accordion, AccordionSummary,
  AccordionDetails, TextField, FormControlLabel, Radio, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Grid, Link
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './AttributeReviewView.module.css';

// Mock data for items containing a specific attribute
const mockItemsForAttribute = [
  { id: 1, name: "Dickies Men's Regular Jean", longDescription: 'A classic jean for everyday wear.', groundingQuote: 'Made from 100% cotton denim.', vody: 'Adults', pim: 'Adults', grounding: 'Adults', confidence: 'high', groundingWebsite: 'walmart.com', groundingLinks: 'https://example.com/link1,https://example.com/link2' },
  { id: 2, name: "Kids's Graphic Tee", longDescription: 'Fun and colorful t-shirt for kids.', groundingQuote: 'Available in youth sizes.', vody: 'Kids', pim: 'Children', grounding: 'Kids', confidence: 'low', groundingWebsite: 'target.com', groundingLinks: 'https://example.com/link3' },
  { id: 3, name: "Men's Performance Polo", longDescription: 'Moisture-wicking polo shirt.', groundingQuote: 'Designed for adult men.', vody: 'Adults', pim: 'Men', grounding: 'N/A', confidence: 'high', groundingWebsite: '', groundingLinks: '' },
];

interface ItemForAttribute {
  id: number;
  name: string;
  longDescription: string;
  groundingQuote: string;
  vody: string;
  pim: string;
  grounding: string;
  confidence: string;
  groundingWebsite: string;
  groundingLinks: string;
}

interface AttributeReviewState {
  finalValue: string;
  source: 'vody' | 'pim' | 'grounding' | 'custom' | null;
  confidence?: string;
}

const AttributeReviewView: React.FC = () => {
  const { attributeName } = useParams<{ attributeName: string }>();
  const navigate = useNavigate();
  const [items, setItems] = useState<ItemForAttribute[]>([]);
  const [reviewState, setReviewState] = useState<Record<number, AttributeReviewState>>({});
  const [expanded, setExpanded] = useState<number | false>(false);

  useEffect(() => {
    setItems(mockItemsForAttribute);
    const initialState: Record<number, AttributeReviewState> = {};
    mockItemsForAttribute.forEach(item => {
      initialState[item.id] = { finalValue: item.vody, source: 'vody' };
    });
    setReviewState(initialState);
  }, [attributeName]);

  const handleRadioChange = (itemId: number, source: 'vody' | 'pim' | 'grounding') => {
    const sourceValue = items.find(i => i.id === itemId)?.[source] || '';
    setReviewState(prev => ({ ...prev, [itemId]: { finalValue: sourceValue, source: source } }));
  };

  const handleFinalValueChange = (itemId: number, value: string) => {
    setReviewState(prev => ({ ...prev, [itemId]: { ...prev[itemId], finalValue: value, source: 'custom' } }));
  };

  const handleAccordionChange = (panel: number) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleSave = () => {
    alert('Bulk changes saved (mocked).');
    navigate('/attributes');
  };

  return (
    <Paper elevation={3} className={styles.attributeReviewContainer}>
      <Box className={styles.header}>
        <Typography variant="h4">Reviewing Attribute: {attributeName}</Typography>
        <Button variant="outlined" onClick={() => navigate('/attributes')}>Back to List</Button>
      </Box>
      {items.map((item) => (
        <Accordion key={item.id} expanded={expanded === item.id} onChange={handleAccordionChange(item.id)}>
          <AccordionSummary>
            <Box sx={{ display: 'flex', width: '100%', alignItems: 'center' }}>
              <Typography sx={{ width: '33.33%', flexShrink: 0, pr: 2 }} noWrap>
                {item.name}
              </Typography>
              <Typography sx={{ width: '33.33%', flexShrink: 0, color: 'text.secondary', pr: 2 }} noWrap>
                Final Value: {reviewState[item.id]?.finalValue}
              </Typography>
              <Typography sx={{ width: '33.33%', flexShrink: 0, color: 'text.secondary', pr: 2 }} noWrap>
                Confidence: {item.confidence}
              </Typography>
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
                      <FormControlLabel value="vody" control={<Radio checked={reviewState[item.id]?.source === 'vody'} onChange={() => handleRadioChange(item.id, 'vody')} />} label={item.vody} />
                    </TableCell>
                    <TableCell>
                      <FormControlLabel value="pim" control={<Radio checked={reviewState[item.id]?.source === 'pim'} onChange={() => handleRadioChange(item.id, 'pim')} />} label={item.pim} />
                    </TableCell>
                    <TableCell>
                      <FormControlLabel value="grounding" control={<Radio checked={reviewState[item.id]?.source === 'grounding'} onChange={() => handleRadioChange(item.id, 'grounding')} />} label={item.grounding} />
                    </TableCell>
                    <TableCell>
                      <TextField variant="outlined" size="small" fullWidth value={reviewState[item.id]?.finalValue || ''} onChange={(e) => handleFinalValueChange(item.id, e.target.value)} />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Typography className={styles.descriptionContainer}><strong>Long Description:</strong> {item.longDescription}</Typography>
            {item.grounding !== 'N/A' ? (
              <Box sx={{ marginTop: 2 }}>
                <Typography sx={{ mb: 1 }}><strong>Grounding Quote:</strong> "{item.groundingQuote}"</Typography>
                <Grid container spacing={1}>
                  <Grid item xs={3}>
                    <Typography><strong>Grounding Website:</strong></Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <Typography>{item.groundingWebsite}</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography><strong>Grounding Links:</strong></Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      {item.groundingLinks.split(',').map((link, index) =>
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
      <Box className={styles.saveContainer}>
        <Button variant="contained" color="primary" onClick={handleSave}>Save All Changes</Button>
      </Box>
    </Paper>
  );
};

export default AttributeReviewView;
