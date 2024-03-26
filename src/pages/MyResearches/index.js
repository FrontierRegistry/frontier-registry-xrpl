import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation, } from 'react-router-dom';
import { Row, Col, } from 'react-bootstrap';
import Moment from 'react-moment';
import moment from 'moment';
import { useWeb3Modal } from '../../services/Web3ModalContext';
import { AiOutlineRight } from 'react-icons/ai';
import { navLinks } from '../../services/constants';
import { contractAddress } from '../../config/chainConfig';
import contractAbi from '../../config/abi.json';
import "./index.scss";

const MyResearches = () => {
  const { provider, address, web3 } = useWeb3Modal();
  const [myResearches, setMyResearches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (provider === null) return;
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>33333333333333333");
      const contract = new web3.eth.Contract(contractAbi, contractAddress);
      const myResearchList = await contract.methods.getResearchesByWallet(address).call();
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>444444444444444");
      console.log("my researches: ", myResearchList);
      const myResearches = myResearchList.map((item, _) => (
        {
          title: item.title,
          content: item.content,
          dateTime: item.timestamp,
        }
      ));
      setMyResearches(myResearches);

      console.log("my researches: ", myResearchList);
    })();
  }, [provider, address]);

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
