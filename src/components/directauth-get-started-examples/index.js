import React from "react";
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";

export default function DirectAuthGetStartedExamples() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h3>DirectAuth for Web</h3>
        <p>Integrate DirectAuth into your web applications</p>
        <Link className={styles.button} to="/torus-wallet/quick-start">
          Get Started
        </Link>
      </div>
      <div className={styles.card}>
        <h3>DirectAuth for Android/iOS</h3>
        <p>Integrate DirectAuth into your native applications</p>
        <Link className={styles.button} to="/direct-auth/quick-start">
          Get Started
        </Link>
      </div>
    </div>
  );
}
