import React from "react";
import FontAwsomeicon from "@fortawesome/react-fontawesome";
import faCompass from "@fortawesome/fontawesome-free-solid/faCompass";
import faPhone from "@fortawesome/fontawesome-free-solid/faPhone";
import faClock from "@fortawesome/fontawesome-free-solid/faClock";
import faEnvelope from "@fortawesome/fontawesome-free-solid/faEnvelope";

class Footer extends React.Component {
  render() {
    return (
      <footer className="bck_b_dark">
        <div className="container">
          <div className="logo">Waves</div>
          <div className="wrapper">
            <div className="left">
              <h2>Contact Information</h2>
              <div className="business_nfo">
                <div className="tag">
                  <FontAwsomeicon icon={faCompass} className="icon" />
                  <div className="nfo">
                    <div>Address</div>
                    <div>Sector 22 Gurgaon</div>
                  </div>
                </div>
                <div className="tag">
                  <FontAwsomeicon icon={faPhone} className="icon" />
                  <div className="nfo">
                    <div>Phone</div>
                    <div>+91-801212-1212</div>
                  </div>
                </div>
                <div className="tag">
                  <FontAwsomeicon icon={faClock} className="icon" />
                  <div className="nfo">
                    <div>Working Hours</div>
                    <div>Mon/Sun- 8am to 9pm</div>
                  </div>
                </div>
                <div className="tag">
                  <FontAwsomeicon icon={faEnvelope} className="icon" />
                  <div className="nfo">
                    <div>Email</div>
                    <div>something@nothing.com</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="left">
              <h2>Be the first one</h2>
              <div>Get All the information about waves</div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
