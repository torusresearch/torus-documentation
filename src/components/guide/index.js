import React from "react";
import Link from "@docusaurus/Link";
import classNames from "classnames";
import styles from "./styles.module.css";

const Guide = ({ title, description, to, color = "1" }) => (
  <div className={classNames("card", styles.card)}>
    <div className={classNames("card__header", styles.header)}>
      <h3>{title}</h3>
    </div>
    <div className={classNames("card__body", styles.body)}>
      <p>{description}</p>
    </div>
    <div className="card__footer">
      <Link
        className={classNames(
          "button",
          styles.button,
          styles[`button-color-${color}`]
        )}
        to={to}
      >
        Get Started
      </Link>
    </div>
  </div>
);

export default Guide;
