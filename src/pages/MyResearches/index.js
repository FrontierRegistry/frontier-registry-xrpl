import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation, } from 'react-router-dom';
import { Row, Col, } from 'react-bootstrap';
import Moment from 'react-moment';
import moment from 'moment';
import { AiOutlineRight } from 'react-icons/ai';
import Web3 from 'web3';
import { useWeb3Auth } from "../../services/web3auth";
import { navLinks } from '../../services/constants';
import { contractAddress } from '../../config/chainConfig';
import contractAbi from '../../config/abi.json';
import "./index.scss";

const web3 = new Web3(window.ethereum);
const contract = new web3.eth.Contract(contractAbi, contractAddress);

const MyResearches = () => {
  const { provider, getAccounts } = useWeb3Auth();
  const [wallet, setWallet] = useState('');
  const [myResearches, setMyResearches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (provider === null) return;
      const account = await getAccounts();
      setWallet(account[0]);
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>33333333333333333");
      const myResearchList = await contract.methods.getResearchesByWallet(account[0]).call();
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>444444444444444");
      const myResearches = myResearchList.map((item, _) => (
        {
          title: item.title,
          content: item.content,
          dateTime: item.timestamp,
        }
      ));
      setMyResearches(myResearches);
    })();
  }, [wallet, provider]);

  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const elem = document.getElementById(location.hash.slice(1));
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  }, [location]);

  return (
    <div className="my-researches">
      <Row>
        <Col md="4" className='sidebar'>
          <div className='navlinks'>
            {
              navLinks.map((item, index) => (
                <div
                  className='navlink-item'
                  key={index}
                >
                  <a
                    href={item.href}
                  >
                    {item.name}
                  </a>
                </div>
              ))
            }
          </div>
        </Col>
        <Col md="8" className='my-researches-component'>
          <div className='my-researches-title'>
            My Research
          </div>
          {
            myResearches.map((item, index) => (
              <div
                className='my-research-item'
                key={index}
              >
                <div>
                  <div
                    className='my-research-item-title'>
                    {item.title}
                  </div>

                  <div
                    className='my-research-item-datetime'>
                    <Moment format="YYYY/MM/DD hh:mm:ss">
                      {new Date(parseInt(item.dateTime + '000'))}
                    </Moment>
                  </div>
                </div>

                <div
                  className='right-icon-wrapper'
                  onClick={() => navigate(`/detail-research/${index}`)}
                >
                  <AiOutlineRight />
                </div>
              </div>
            ))
          }
        </Col>

      </Row>
    </div>
  )
}

export default MyResearches
