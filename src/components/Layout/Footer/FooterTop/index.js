import { Col, Row } from "react-bootstrap";
import "./index.scss";

const FooterTop = () => {

    return (
        <Row className="footerTop-component">
            <Col lg={6} sm={12} className="left">
                <div className="title">
                    Staying in the loop
                </div>
                <div className="description">
                    Join our mailing list to stay in the loop with the latest published breatkthrough science.
                </div>
                <div className="input">
                    <input type="input" placeholder="Type Here" />
                    <button>Sign up</button>
                </div>
            </Col>
            <Col lg={6} sm={12} className="right">
                <div className="title">
                    Join the Community
                </div>
                <div className="icons">
                </div>
            </Col>
        </Row>
    );
}

export default FooterTop;