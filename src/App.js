import { useEffect, } from 'react';
import { Route, Routes, BrowserRouter as Router, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Main from './pages/Main'
import NewResearch from './pages/NewResearch';
import MyResearches from './pages/MyResearches';
import DetailResearch from './pages/DetailResearch';
import './App.css';

const App = () => {
  const { REACT_APP_CHAIN_NAME, REACT_APP_MAINNET_OR_TESTNET } = process.env;

  const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  }

  return (
    <Router>
      <div className="app">
        <Layout>
          {/* <ScrollToTop> */}
          <Routes>
            <Route path='/' element={< Main />} />
            <Route path='/new-research' element={<NewResearch />} />
            <Route path='/my-research' element={<MyResearches />} />
            <Route path='/detail-research/:id' element={<DetailResearch />} />
          </Routes>
          {/* </ScrollToTop> */}
        </Layout>
      </div>
    </Router>
  );
}

export default App;