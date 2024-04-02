import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Research from "../../components/Research";
import Banner from "../../components/Banner";
import Setup from "../../components/Setup";
import Tutorial from "../../components/Tutorial";
import './index.scss';

const Main = () => {
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
        <div className="main">
            <div className="d-flex justify-content-center">
                <div className="container">
                    <Banner />
                    <Research />
                    <Setup />
                    <Tutorial />
                </div>
            </div>
        </div>
    )
}

export default Main;
