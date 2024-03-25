import React, { useState, useEffect } from 'react'
import { Row, Col, } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import { CKEditor } from 'ckeditor4-react';
import Web3 from 'web3';
import { navLinks } from '../../services/constants';
import { useWeb3Auth } from "../../services/web3auth";
import "./index.scss";
import { contractAddress } from '../../config/chainConfig';
import contractAbi from '../../config/abi.json';
const web3 = new Web3(window.ethereum);
const contract = new web3.eth.Contract(contractAbi, contractAddress);

const DetailResearch = () => {
  const { id } = useParams();
  const { provider, getAccounts } = useWeb3Auth();
  const [wallet, setWallet] = useState('');
  const [myCurrentResearch, setMyCurrentResearch] = useState({});

  useEffect(() => {
    (async () => {
      if (provider === null) return;
      const account = await getAccounts();
      setWallet(account[0]);
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>33333333333333333");
      const myResearchList = await contract.methods.getResearchesByWallet(account[0]).call();
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>444444444444444");
      const myCurrentResearch = {
        title: myResearchList[id].title,
        content: myResearchList[id].content.replace(/(?:\r\n|\r|\n)/g, '\n'),
        dateTime: myResearchList[id].timestamp,
      };
      setMyCurrentResearch(myCurrentResearch);
      console.log("my current research content: ", myCurrentResearch.content);
    })();
  }, [wallet, provider, id]);

  return (
    <div className="detail-research">
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
        <Col md="8" className='detail-research-component'>
          <div className='detail-research-component-header'>
            <h2 className='detail-research-text'>{myCurrentResearch.title}</h2>
          </div>
          <div
            className='ckeditor-component-wrapper'
          >
            {
              myCurrentResearch.content &&
              <CKEditor
                initData={myCurrentResearch.content}
                onInstanceReady={() => {
                  console.log("editor is ready");
                }
                }
                readOnly
              />
            }

          </div >
        </Col>
      </Row>
    </div>
  )
}

export default DetailResearch
