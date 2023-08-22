/** @type {import('@docusaurus/plugin-content-docs/lib/types').Sidebars} */
module.exports = {
  docs: [
    "README",
    {
      type: "category",
      label: "EVM Wallet",
      items: [
        "wallet/get-started",
        "wallet/what-is-wallet",
        {
          "API Reference": [
            "wallet/api-reference/installation",
            "wallet/api-reference/class",
            "wallet/api-reference/account",
            "wallet/api-reference/display",
            "wallet/api-reference/address-resolver",
            "wallet/api-reference/topup",
            "wallet/api-reference/ethereum-api",
          ],
        },
        {
          "Developing with Torus Wallet": [
            "wallet/developing-with-wallet/ganache",
            "wallet/developing-with-wallet/networklist",
          ],
        },
        {
          Features: [
            "wallet/features/layer2",
            "wallet/features/accountrecovery",
            "wallet/features/purchasecryptocurrency",
            "wallet/features/erc721",
            "wallet/features/exportprivatekey",
            "wallet/features/language",
            "wallet/features/nameresolver",
            "wallet/features/themes",
            "wallet/features/pwa",
            "wallet/features/whitelabeling",
          ],
        },
        {
          FAQ: ["wallet/faq-1/developers", "wallet/faq-1/users"],
        },
        "wallet/integration-guidelines",
        "wallet/changelog",
      ],
    },
    {
      type: "category",
      label: "Solana Wallet",
      items: [
        "solana-wallet/get-started",
        "solana-wallet/what-is-wallet",
        {
          "API Reference": [
            "solana-wallet/api-reference/installation",
            "solana-wallet/api-reference/class",
            "solana-wallet/api-reference/account",
            "solana-wallet/api-reference/display",
            // "solana-wallet/api-reference/address-resolver",
            "solana-wallet/api-reference/topup",
            {
              "Solana API": [
                // "solana-wallet/api-reference/solana/solana-api",
                "solana-wallet/api-reference/solana/send-transaction",
                "solana-wallet/api-reference/solana/sign-transaction",
                "solana-wallet/api-reference/solana/sign-message",
              ],
            },
            "solana-wallet/api-reference/solana-adapter"
          ],
        },
        {
          Features: [
            "solana-wallet/features/accountrecovery",
            "solana-wallet/features/purchasecryptocurrency",
            "solana-wallet/features/exportprivatekey",
            // "solana-wallet/features/language",
            // "solana-wallet/features/nameresolver",
            "solana-wallet/features/themes",
            "solana-wallet/features/pwa",
            // "solana-wallet/features/whitelabeling",
          ],
        },
        // {
        //   FAQ: ["solana-wallet/faq-1/developers", "solana-wallet/faq-1/users"],
        // },
        // "solana-wallet/integration-guidelines",
        // "solana-wallet/changelog",
      ],
    },
    {
      type: "category",
      label: "XRPL Wallet",
      link: { type: "doc", id: "xrpl-wallet/xrpl-wallet" },
      items: [
        "xrpl-wallet/installation",
        "xrpl-wallet/initialization",
        {
          "API Reference": [
            "xrpl-wallet/api-reference/usage",
            "xrpl-wallet/api-reference/display",
            "xrpl-wallet/api-reference/topup",
            {
              "XRPL Blockchain API": [
                "xrpl-wallet/api-reference/xrpl/sign-message",
                "xrpl-wallet/api-reference/xrpl/sign-transaction",
                "xrpl-wallet/api-reference/xrpl/submit-transaction",
              ],
            },
          ],
        },
        {
          Features: [
            "xrpl-wallet/features/accountrecovery",
            "xrpl-wallet/features/purchasecryptocurrency",
            "xrpl-wallet/features/exportprivatekey",
            // "xrpl-wallet/features/language",
            // "xrpl-wallet/features/nameresolver",
            "xrpl-wallet/features/themes",
            "xrpl-wallet/features/pwa",
            // "xrpl-wallet/features/whitelabeling",
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Torus Key Infrastructure",
      items: [
        "key-infrastructure/overview",
        "key-infrastructure/technical-architecture",
        {
          type: "category",
          label: "Role of Torus nodes",
          items: [
            "key-infrastructure/role-of-torus-nodes/overview",
            "key-infrastructure/role-of-torus-nodes/lifecycle",
            "key-infrastructure/role-of-torus-nodes/key-generation-and-resharing",
            "key-infrastructure/role-of-torus-nodes/logins-key-assignments-and-retrievals",
            "key-infrastructure/role-of-torus-nodes/oauth2-vs-proxy-sign-in",
            "key-infrastructure/role-of-torus-nodes/dkg-specification"
          ],
        },
        "key-infrastructure/node-operators",
        "key-infrastructure/audits",
      ],
    },
    {
      type: "category",
      label: "Deprecated",
      items: [
        "deprecated/deprecated",
        {
          type: "category",
          label: "CustomAuth",
          items: [
            "deprecated/customauth/get-started",
            "deprecated/customauth/what-is-customauth",
            "deprecated/customauth/integrating-customauth",
            {
              "API Reference": [
                "deprecated/customauth/api-reference/installation",
                "deprecated/customauth/api-reference/initialization",
                "deprecated/customauth/api-reference/usage",

              ],
            },
            "deprecated/customauth/designing-your-key-management-architecture",
            "deprecated/customauth/verifiers",
            {
              "Setting up Verifiers on Developer Dashboard": [
                "deprecated/customauth/setting-up-verifiers/seting-up-verifiers",
                "deprecated/customauth/setting-up-verifiers/custom-verifier",
              ],
            },
            {
              "Compatiblity and common patterns": [
                "deprecated/customauth/compatibility-and-common-patterns/README",
                "deprecated/customauth/compatibility-and-common-patterns/gasless-meta-transactions",
                "deprecated/customauth/compatibility-and-common-patterns/scalability-layer2-solutions",
                "deprecated/customauth/compatibility-and-common-patterns/password-manager-flow",
                "deprecated/customauth/compatibility-and-common-patterns/tkey",
              ],
            },
            "deprecated/customauth/linking-accounts",
            "deprecated/customauth/redirects-and-service-workers",
            "deprecated/customauth/faq",
          ],
        },
        {
          type: "category",
          label: "OpenLogin",
          items: [
            "deprecated/open-login/get-started",
            "deprecated/open-login/what-is-openlogin",
            {
              "API Reference": [
                "deprecated/open-login/api-reference/installation",
                "deprecated/open-login/api-reference/initialization",
                "deprecated/open-login/api-reference/usage",
              ],
            },
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Legal",
      items: [
        "legal/terms-and-conditions",
        "legal/privacy-policy",
        "legal/cookie-policy",
      ],
    },
    {
      type: "category",
      label: "Contact",
      items: ["contact/bug-bounty"],
    },
  ],
};
