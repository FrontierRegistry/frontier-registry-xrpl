import { Row } from "react-bootstrap";
import "./index.scss";

const FooterBottom = () => {

    return (
        <div className="footerBottom-component">
            <div className="copyright">
                © 2022 FrontierRegistry
            </div>
            <div className="terms">
                <div className="privacy-policy">Privacy Policy</div>
                <div className="terms-of-service">Terms of service</div>
            </div>
        </div>
    );
}

export default FooterBottom;