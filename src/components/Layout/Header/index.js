import React, { useState, useEffect } from "react"
import {
    Navbar as BsNavbar,
    NavItem,
    Nav,
    Container,
    NavDropdown,
    Modal,
    Spinner,
    Button,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useWeb3Modal } from '../../../services/Web3ModalContext'
import logo from '../../../assets/img/logo.jpg';
import './index.scss';

const Header = () => {
    const [show, setShow] = useState(false);
    const { connect, disconnect, isConnected, isLoading, address, error, user } =
        useWeb3Modal()

    const handleConnect = async () => {
        if (!isConnected) {
            await connect()
        } else {
            setShow(true);
        }
    }

    const handleLogout = () => {
        setShow(false);
        disconnect()
    }

    useEffect(() => {
        if (error) {
            alert(String(error))
        }
    }, [error])

    return (
        <BsNavbar collapseOnSelect className='header' expand='lg' variant='light'>
            <Container className='custom-navbar-container' fluid>
                <BsNavbar.Brand>
                    <Link
                        className='d-flex align-items-center navbar-brand mr-0'
                        to='/'
                    >
                        <div className='logo'><img src={logo}></img></div>
                    </Link>
                </BsNavbar.Brand>

                {/* <div className="search">
                    <i className="fa fa-search"></i>
                    <input type="text" placeholder="Search Items and collections"></input>
                </div> */}

                <BsNavbar.Toggle aria-controls='responsive-navbar-nav' />
                <BsNavbar.Collapse id='responsive-navbar-nav' className='nav-menu-wrap'>
                    <Nav role='navigation' className='ml-auto'>
                        <Link to='/' aria-current='page' className='custom-link-button custom-nav-link'>
                            Home
                        </Link>
                        {/* <Link to='/new-research' aria-current='page' className='custom-link-button custom-nav-link'>
                            Mint IP
                        </Link> */}
                        {/* <NavDropdown
                            title="Mint IP"
                            className="funding-nav-dropdown"
                        >
                            <NavDropdown.Item><Link to='#'>Option 1</Link></NavDropdown.Item>
                            <NavDropdown.Item><Link to='#'>Option 2</Link></NavDropdown.Item>
                        </NavDropdown> */}
                        <Link to='/new-research' aria-current='page' className='custom-link-button custom-nav-link'>
                            New Research
                        </Link>
                        <Link to='/my-research' aria-current='page' className='custom-link-button custom-nav-link'>
                            My Research
                        </Link>
                        {/* <Link to='#' aria-current='page' className='custom-link-button custom-nav-link'>
                            #DeSci
                        </Link>
                        <Link to='#' aria-current='page' className='custom-link-button custom-nav-link'>
                            Resources
                        </Link>
                        <Link to='#' aria-current='page' className='custom-link-button custom-nav-link'>
                            Publish
                        </Link> */}
                        <Link
                            className='custom-logo d-flex align-items-center navbar-brand mr-0'
                            to='#'
                            onClick={() => handleConnect()}
                        >
                            <Button
                                style={{
                                    borderRadius: '50px',
                                    minWidth: '180px'
                                }}
                            >
                                {
                                    isConnected && user ? user.sub : 'Login'
                                }
                            </Button>
                        </Link>
                    </Nav>
                </BsNavbar.Collapse>
            </Container>
            <Modal
                show={show}
                onHide={() => setShow(false)}
                backdrop="static"
                keyboard={false}
                className='disconnect-modal'
            >
                <Modal.Body>
                    <div className="logout-label">Are you going to continue?</div>
                    <button onClick={() => handleLogout()}>Log out</button>
                </Modal.Body>
            </Modal>
        </BsNavbar>
    );
};

export default Header;