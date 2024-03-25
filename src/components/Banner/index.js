import { Col, Row } from "react-bootstrap";
import FrontierRegistryBlue from '../../assets/img/FrontierRegistryBlue.jpg'
import "./index.scss";

const Banner = () => {

    return (
        <Row className="banner-component">
            <Col lg={6} md={12} sm={12} className="left">
                <section id="text1">

                </section>
                {/* <section id="text2">
                    ...edit me...
                </section> */}
                <section id="text3">
                    FrontierDAO   #DeSci
                </section>
                <section id="text4">
                    Publish your Scientific Research. IP as NFT.
                    Science on the Blockchain.
                </section>
                <h2 className="banner-text">
                    Scientific research published and peer reviewed on-chain. Option to crowdsource funding by minting your research paper/IP as a NFT.
                </h2>
                <button className="explorer">
                    Explore
                </button>
            </Col>
            <Col lg={6} md={12} sm={12} className="right">
                <img src={FrontierRegistryBlue} />
            </Col>
        </Row>
    );
}

export default Banner;