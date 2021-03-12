import React, { useState } from "react";
import Layout from "@theme/Layout";
import Step from "../../components/step";
import CodeView from "../../components/code-view";
import classNames from "classnames";
import styles from "./styles.module.css";

import DirectAuthIntegrationBuilder from "../../libs/integration-builder-v2/direct-auth";
import TorusWalletIntegrationBuilder from "../../libs/integration-builder-v2/torus-wallet";

import Prism from "prism-react-renderer/prism";
(typeof global !== "undefined" ? global : window).Prism = Prism;
require("prismjs/components/prism-java");
require("prismjs/components/prism-groovy");
require("prismjs/components/prism-swift");

const products = [
  {
    name: "DirectAuth",
    options: {
      blockchain: {
        displayName: "Blockchain",
        choices: ["Ethereum"],
        defaultChoice: "Ethereum",
      },
      framework: {
        displayName: "Language/Framework",
        choices: ["React", "iOS", "Android"],
        defaultChoice: "React",
      },
    },
  },
  {
    name: "Torus Wallet",
    options: {
      blockchain: {
        displayName: "Blockchain",
        choices: ["Ethereum"],
        defaultChoice: "Ethereum",
      },
      framework: {
        displayName: "Language/Framework",
        choices: ["React", "Vue"],
        defaultChoice: "React",
      },
    },
  },
];

function getDefaultOptions(product) {
  return Object.fromEntries(
    Object.entries(product.options).map(([key, value]) => [
      key,
      value.defaultChoice,
    ])
  );
}

function getIntegration(product, options) {
  if (product === "DirectAuth") return DirectAuthIntegrationBuilder(options);
  if (product === "Torus Wallet") return TorusWalletIntegrationBuilder(options);
  throw new Error("Product is not supported.");
}

function getSelectedProductFromURL() {
  const url = new URL(window.location.href);
  const product = url.searchParams.get("product");
  const index = products.findIndex((item) => item.name === product);
  if (index === -1)
    return { index: 0, step: -1, options: getDefaultOptions(products[0]) };

  const options = getDefaultOptions(products[index]);
  for (const opt of Object.keys(products[index].options)) {
    const value = url.searchParams.get(opt);
    if (products[index].options[opt].choices.includes(value))
      options[opt] = value;
  }
  return { index, options, step: -1 };
}

export default function IntegrationBuilderPage() {
  const [selectedProduct, setSelectedProduct] = useState(
    getSelectedProductFromURL()
  );

  const integration = getIntegration(
    products[selectedProduct.index].name,
    selectedProduct.options
  );

  const [selectedTab, setSelectedTab] = useState(0);
  const [highlightRange, setHighlightRange] = useState();
  const selectedSourceFile = integration.sourceFiles[selectedTab];

  const onClickProduct = (index) => {
    if (index === selectedProduct.index) return;
    setHighlightRange();
    setSelectedTab(0);
    setSelectedProduct({
      index,
      step: -1,
      options: getDefaultOptions(products[index]),
    });
  };

  const onChooseOption = (option, choice) => {
    if (selectedProduct.options[option] === choice) return;
    setHighlightRange();
    setSelectedTab(0);
    setSelectedProduct({
      ...selectedProduct,
      step: -1,
      options: {
        ...selectedProduct.options,
        [option]: choice,
      },
    });
  };

  const onClickStep = (step) => {
    if (selectedProduct.step === step) return;

    setSelectedProduct({
      ...selectedProduct,
      step,
    });

    const stepIntegration = integration.steps[step];
    const tab = integration.sourceFiles.findIndex(
      (it) => it.name === stepIntegration.pointer[0]
    );
    setSelectedTab(tab);
    setHighlightRange(stepIntegration.pointer[1]);
  };

  const onClickTab = (index) => {
    setHighlightRange();
    setSelectedTab(index);
  };

  return (
    <Layout title="Integration Builder">
      <div className={styles.header}>
        {/* List of options */}
        {Object.entries(products[selectedProduct.index].options).map(
          ([key, option]) => (
            <div key={key} className={styles.optionContainer}>
              <span className={styles.optionLabel}>{option.displayName}:</span>
              <ul className="pills">
                {option.choices.map((choice) => (
                  <li
                    key={choice}
                    className={classNames("pills__item", styles.optionChoice, {
                      "pills__item--active":
                        selectedProduct.options[key] === choice,
                    })}
                    onClick={onChooseOption.bind(this, key, choice)}
                  >
                    {choice}
                  </li>
                ))}
              </ul>
            </div>
          )
        )}
      </div>
      <div className={styles.content}>
        <div className={styles.body}>
          <div className={styles.leftCol}>
            <div className={styles.leftHeading}>
              <h1>{products[selectedProduct.index].name}</h1>
              {/* List of products */}
              <ul className="pills">
                {products.map((product, index) => (
                  <li
                    key={index}
                    className={classNames("pills__item", {
                      "pills__item--active": selectedProduct.index === index,
                    })}
                    onClick={onClickProduct.bind(this, index)}
                  >
                    {product.name}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              {integration.steps.map((step, index) => (
                <Step
                  key={index}
                  isSelected={index === selectedProduct.step}
                  onClick={onClickStep.bind(this, index)}
                >
                  {step.component}
                </Step>
              ))}
            </div>
          </div>
          <div className={styles.rightCol}>
            <div>
              <ul
                role="tablist"
                aria-orientation="horizontal"
                className="tabs code-view-tabs"
              >
                {integration.sourceFiles.map((it, index) => (
                  <li
                    key={it.name}
                    role="tab"
                    className={classNames("tabs__item", {
                      "tabs__item--active": selectedTab === index,
                    })}
                    onClick={onClickTab.bind(this, index)}
                  >
                    {it.name}
                  </li>
                ))}
              </ul>
              <div>
                <CodeView
                  code={selectedSourceFile.code}
                  language={selectedSourceFile.language}
                  highlight={highlightRange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
