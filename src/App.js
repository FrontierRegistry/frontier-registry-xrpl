import { useEffect, } from 'react';
import { Route, Routes, BrowserRouter as Router, useLocation } from 'react-router-dom';
import { Web3AuthProvider } from './services/web3auth';
import Layout from './components/Layout';
import Main from './pages/Main'
import NewResearch from './pages/NewResearch';
import MyResearches from './pages/MyResearches';
import DetailResearch from './pages/DetailResearch';
import './App.css';

const App = () => {
  const { REACT_APP_CHAIN_NAME, REACT_APP_MAINNET_OR_TESTNET } = process.env;

  // const ScrollToTop = () => {
  //   const { pathname } = useLocation();

  //   useEffect(() => {
  //     window.scrollTo(0, 0);
  //   }, [pathname]);

  //   return null;
  // }

  return (
    <Router>
      <div className="app">
        <Web3AuthProvider web3AuthNetwork={REACT_APP_MAINNET_OR_TESTNET} chain={REACT_APP_CHAIN_NAME}>
          <Layout>
            {/* <ScrollToTop> */}
            <Routes>
              <Route path='/' element={< Main />} />
              <Route path='/new-research' element={<NewResearch />} />
              <Route path='/my-researches' element={<MyResearches />} />
              <Route path='/detail-research/:id' element={<DetailResearch />} />
            </Routes>
            {/* </ScrollToTop> */}
          </Layout>
        </Web3AuthProvider>
      </div>
    </Router>
  );
}

export default App;