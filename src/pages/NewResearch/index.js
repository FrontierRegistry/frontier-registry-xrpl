import React, { useState, useEffect, } from 'react';
import { useLocation, } from 'react-router-dom';
import {
  Row,
  Col,
} from 'react-bootstrap'
import { CKEditor } from 'ckeditor4-react';
import { navLinks } from '../../services/constants';
import TitleConfirmModal from '../../components/TitleConfirmModal';
import "./index.scss";
import axios from "axios";

const NewResearch = () => {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState('');
  const [image, setImage] = useState('');
  const [tokenID, setTokenID] = useState('');
  const [file, setFile] = useState('');
  const [description, setDescription] = useState('');
  const [chooseText, setChooseText] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [show, setShow] = useState(false);
  const [wait, setWait] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleWait = () => setWait(true);
  const handleStopWait = () => setWait(false);
  const handleShowText = () => setChooseText(true);
  const handleShowFile = () => setChooseText(false);

  const handleConfirm = async () => {
    handleClose();
    handleWait();

    const response = await axios.post("http://localhost:8080/api/v1/mint", image, {
      params: {
        authors: authors,
        title: title,
        description: description
      }
    });

    setTokenID(response.data.TokenID);
    console.log("Transaction hash of the token:", response.data.Hash);

    handleStopWait();
  }

  const handlePublish = async () => {
    console.log(content)
    if (content == '' && chooseText) {
      window.alert("Blank content!");
      return;
    }
    const title = content.split('\n')[0];
    setTitle(title.replace(/<[^>]+>/g, '').replace('&nbsp;', ' '));
    handleShow();
  }

  async function handleChange(e) {
    const formData = new FormData();
    formData.append("my-file", e.target.files[0], e.target.files[0].name);

    setImage(formData);
    setFile(URL.createObjectURL(e.target.files[0]));
  }

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
    <div className="new-research">
      {/* <div className="react-notification-alert-container">   
        </div> */}
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
        <Col md="8" className='new-research-component'>
          <div className='new-research-component-header'>
            <h2 className='new-research-text'>New Research</h2>

            { chooseText ?
            <div>
              <div className='buttons'>
                <button
                  onClick={() => setIsPreview(!isPreview)}
                >
                  {
                    isPreview ? 'Edit' : 'Preview'
                  }
                </button>
                <button
                  onClick={() => handlePublish()}
                >
                  Publish
                </button>
              </div>

              <div
                className={isPreview ? 'ckeditor-component-wrapper preview-mode' : 'ckeditor-component-wrapper'}
              >
                <CKEditor
                  initData=""
                  onInstanceReady={() => {
                    console.log("editor is ready");
                  }
                  }
                  onChange={(event) => {
                    setContent(event.editor.getData());
                  }}

                  readOnly={isPreview ? true : false}
                />
              </div >
              <button onClick={handleShowFile}>Back</button>
            </div> :
            <div>
              <div className='buttons'>
                <button
                  onClick={() => handlePublish()}
                >
                  Publish
                </button>
              </div>

              <div>
                <h6>Select the mode you prefere for your research:</h6>
              </div>

              <Row className="choose-file-or-text">
                <Col>
                  <button onClick={handleShowText}>Enter Text</button>
                </Col>

                <Col>
                  <p><strong>OR</strong></p>
                  <img src={file} style={{ maxWidth: "100px", maxHeight: "100px" }} />
                </Col>

                <Col>
                  <input type="file" id="file" className="inputfile" onChange={handleChange} />
                </Col>
              </Row>

              {wait && <b>Please wait few seconds for the transaction to process...</b>}

              {tokenID && (
                <div>
                  <h3><b>NFT minted!</b></h3>
                  <p>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`https://test.bithomp.com/nft/${tokenID}`}
                      style={{ color: 'black' }}
                    >
                    Check your transaction on XRP Ledger here!
                    </a>
                  </p>
                </div>
              )}
            </div>
            }

          </div>
        </Col>
      </Row>
      <TitleConfirmModal
        show={show}
        handleClose={handleClose}
        title={title}
        handleConfirm={handleConfirm}
        setTitle={setTitle}
        authors={authors}
        setAuthors={setAuthors}
        description={description}
        setDescription={setDescription}
      />
    </div>
  )
}

export default NewResearch
