import { Col, Row } from "react-bootstrap";
import {
    AccountBalanceWallet,
    Science,
    Computer,
    Campaign
} from '@mui/icons-material';
import "./index.scss";

const Setup = () => {
    const setupSequences = [
        {
            title: 'Set up your wallet',
            icon: <AccountBalanceWallet />,
            description: 'Once you’ve set up your wallet of choice, connect it to FrontierRegistery by clicking the wallet \
            icon in the top right corner.Learn about the wallets we support.',
            color: 'rgb(24, 103, 182)',
        },
        {
            title: 'Publish Your Research',
            icon: <Science />,
            description: 'Click My Research and set up your collection of published papers. You as the author and IP \
            holder retain all copyright. Personalize by adding a description, profile & banner images.',
            color: 'rgb(43, 204, 228)',
        },
        {
            title: 'On-chain Peer Review',
            icon: <Computer />,
            description: 'Request on-chain peer reviews from your colleagues and community.  Tipping feature optional. \
            (Reviewers who like your work can leave a tip or readers who appreciate the review can tip the reviewer.)',
            color: 'rgb(24, 103, 182)',
        },
        {
            title: 'IP NFT = Mint as NFT',
            icon: <Campaign />,
            description: 'Mint as NFT.  (optional) When your research paper/ scientific or engineering IP is minted as a NFT \
            and posted for sale, this faciliates crowdfunding your further research. It also locks in your research IP on-chain \
            in an immutable, transparent and traceable way.',
            color: 'rgb(43, 204, 228)',
        }
    ];

    return (
        <div className="setup-component">
            <div className="header">
                Easy set up. Less than 5 minutes.
            </div>
            <Row className="setups">
                {
                    setupSequences.map((item, key) => (
                        <Col xl={3} lg={4} md={6} key={key} className='item-wrapper'>
                            <div className="item">
                                <div className="icon" style={{ color: item.color }}>
                                    {item.icon}
                                </div>
                                <div className="title">
                                    {item.title}
                                </div>
                                <div className="description">
                                    {item.description}
                                </div>
                            </div>
                        </Col>
                    ))
                }
            </Row>
        </div>
    );
}

export default Setup;