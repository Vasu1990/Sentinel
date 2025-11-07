import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { CssBaseline, Container, AppBar, Toolbar, Typography, Button } from '@mui/material';
import CsvUploader from './components/CsvUploader';
import MainView from './components/MainView';
import ItemReviewView from './components/ItemReviewView';
import AttributeReviewList from './components/AttributeReviewList';
import AttributeReviewView from './components/AttributeReviewView';
import LoadingBackdrop from './components/LoadingBackdrop';
import SnackbarProvider from './components/SnackbarProvider';

function App() {
  return (
    <Router>
      <CssBaseline />
      <LoadingBackdrop />
      <SnackbarProvider />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              Sentinel
            </Link>
          </Typography>
          <Button color="inherit" component={Link} to="/upload">
            Upload CSV
          </Button>
        </Toolbar>
      </AppBar>
      <Container style={{ marginTop: '2rem' }}>
        <Routes>
          <Route path="/" element={<MainView />} />
          <Route path="/upload" element={<CsvUploader />} />
          <Route path="/item/:itemNumber" element={<ItemReviewView />} />
          <Route path="/attributes" element={<AttributeReviewList />} />
          <Route path="/attribute/:attributeName" element={<AttributeReviewView />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
