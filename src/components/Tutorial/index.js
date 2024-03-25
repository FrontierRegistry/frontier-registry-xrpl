import { Col, Row } from "react-bootstrap";
import Image1 from '../../assets/img/resource1.jpeg';
import "./index.scss";

const Tutorial = () => {
    const tutorials = [
        {
            title: 'Keeping yourself safe when buying NFTsSpace...',
            banner: Image1,
        },
        {
            title: 'The beginner’s guide to creating & selling digital art... ',
            banner: Image1,
        },
        {
            title: '7 reasons to sell your NFTsSpace exploration',
            banner: Image1,
        },
        {
            title: 'Good example to start blockchain...',
            banner: Image1,
        },
    ];

    return (
        <Row className="tutorial-component">
            <div className="header">
                Resources for getting started
            </div>
            <Row className="tutorials">
                {
                    tutorials.map((item, key) => (
                        <Col sm={3} key={key} className='item-wrapper'>
                            <div className="item">
                                <div className="banner">
                                    <img src={item.banner} />
                                </div>
                                <div className="title">
                                    {item.title.slice(0, 40) + "..."}
                                </div>
                            </div>
                        </Col>
                    ))
                }
            </Row>
        </Row>
    );
}

export default Tutorial;