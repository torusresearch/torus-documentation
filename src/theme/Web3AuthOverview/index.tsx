import React from "react";
import Link from "@docusaurus/Link";
import classNames from "classnames";
import styles from "./styles.module.css";

export default function Web3AuthOverview() {
  return (
    <div className={styles.container}>
      <div className={classNames(styles.cardQuickStart, styles.cardQsWeb3)}>
        <div className={styles.content}>
          <p className={styles.headline}>Web3Auth overview</p>
          <p className={styles.description}>
            Web3Auth is a pluggable infrastructure. It provides a seamless user
            login to both mainstream and Web3 users.
          </p>
          <p className={styles.description}>
            Begin your integration under the 'Quick Start' section below.
          </p>

          <div className={styles.btnContainer}>
            <Link to="/guides#wallets">
              <button className={styles.ctaBtn}>Read the docs</button>
            </Link>
            <Link to="/guides#wallets">
              <button className={classNames(styles.ctaBtn, styles.ctaBtnWhite)}>
                Schedule demo
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
