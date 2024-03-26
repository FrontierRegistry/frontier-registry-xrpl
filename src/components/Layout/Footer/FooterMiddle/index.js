import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import logo from '../../../../assets/img/logo.jpg';
import "./index.scss";

const FooterMiddle = () => {
    const navigate = useNavigate();

    return (
        <Row className="footerMiddle-component">
            <Col xl={3} lg={4} md={6} sm={6} xs={6} className="logo-component item">
                <a
                    href="https://www.youtube.com/watch?v=KMYVR8T1BZ8"
                >
                    <img
                        src={logo}
                    />
                </a>
                <div>
                    should read FrontierRegistry
                </div>
                <p>
                    On-Chain Scientific Publishing
                </p>
            </Col>

            <Col xl={3} lg={4} md={6} sm={6} xs={6} className="marketplace item">
                <p className="title">
                    Marketplace
                </p>
                <p>
                    IP /Science/ Engineering minted as NFTs
                </p>
                <p
                    onClick={() => navigate('/my-research')}
                >
                    New Research Published
                </p>
            </Col>

            <Col xl={3} lg={4} md={6} sm={6} xs={6} className="my-account item">
                <p className="title">
                    My Account
                </p>
                <p>
                    profile
                </p>
                <p>
                    Favourite
                </p>
                <p>My collection</p>
                <p>Settings</p>

                <p className="title" style={{ marginTop: '20px' }}>
                    Stats
                </p>
                <p>
                    Rankings
                </p>
                <p>
                    Activities
                </p>
            </Col>

            <Col xl={3} lg={4} md={6} sm={6} xs={6} className="resources item">
                <p className="title">
                    Resources
                </p>
                <p>
                    <a href='https://www.frontierdao.xyz/'>
                        Help center
                    </a>
                </p>
                <p>
                    <a href='https://www.frontierdao.xyz/'>
                        Platform status
                    </a>
                </p>
                <p>
                    <a href='https://www.frontierdao.xyz/'>
                        Partners
                    </a>
                </p>

                <p className="title" style={{ marginTop: '20px' }}>
                    <a href='https://www.frontierdao.xyz/'>
                        FrontierDAO
                    </a>
                </p>
                <p>
                    <a href='https://www.frontierdao.xyz/'>
                        About FrontierRegistry
                    </a>
                </p>
            </Col>
        </Row >
    );
}

export default FooterMiddle;