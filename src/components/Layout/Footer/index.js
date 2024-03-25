import React from "react";
import FooterTop from "./FooterTop";
import FooterMiddle from "./FooterMiddle";
import FooterBottom from "./FooterBottom";
import './index.scss';

const Footer = () => {

    return (
        <>
            <div className="footer">
                <FooterTop />
                <FooterMiddle />
                <FooterBottom />
            </div>
        </>
    )
}
export default Footer;