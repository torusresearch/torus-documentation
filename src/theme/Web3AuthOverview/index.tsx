import React from "react";
import Link from "@docusaurus/Link";
import classNames from "classnames";
import styles from "./styles.module.css";

export default function Web3AuthOverview() {
  return (
    <div className={styles.container}>
      <div className={classNames(styles.cardQuickStart, styles.cardQsWeb3)}>
        <div className={styles.content}>
          <p className={styles.headline}>Torus Overview</p>
          <p className={styles.description}>
A non-custodial, distributed and open source key management network. Similar to how Auth0, Cognito or Firebase
provides auth infrastructure in Web2, the Torus Network powers auth and key management solutions like Web3Auth for Web3.
          </p>

          <div className={styles.btnContainer}>
            {/* <Link to="https://docs.web3auth.io">
              <button className={styles.ctaBtn}>Integrate via Web3Auth</button>
            </Link> */}
            <Link to="/guides#wallets">
              <button className={classNames(styles.ctaBtn, styles.ctaBtnWhite)}>
                Integrate via Web3Auth
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
