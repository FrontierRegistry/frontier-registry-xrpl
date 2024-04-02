import { SettingsOutlined } from '@mui/icons-material';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const TitleConfirmModal = ({ show, handleClose, title, handleConfirm, setTitle, authors, setAuthors, description, setDescription}) => {

    return (
        <>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Please enter the title of your research:</Form.Label>
                            <Form.Control
                                autoFocus
                                value={title}
                                onChange={(e) => {
                                    if (e.target.value.length <= 30) {
                                        setTitle(e.target.value)
                                    }
                                  }
                                }
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Please enter a short description of your research:</Form.Label>
                            <Form.Control
                                value={description}
                                onChange={(e) => {
                                    if (e.target.value.length <= 150) {
                                        setDescription(e.target.value)
                                    }
                                  }
                                }
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                            <Form.Label>Please enter the name(s) of the author(s):</Form.Label>
                            <Form.Control
                                value={authors}
                                onChange={(e) => {
                                    if (e.target.value.length <= 58) {
                                        setAuthors(e.target.value)
                                    }
                                  }
                                }
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleConfirm}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default TitleConfirmModal;