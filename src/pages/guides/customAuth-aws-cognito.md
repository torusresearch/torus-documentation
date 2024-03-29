---
title: How to Integrate Torus CustomAuth and AWS Cognito Hosted UI
image: "/contents/TorusxAWSCognito.png"
description: Learn to use Torus CustomAuth with AWS Cognito Hosted UI.
order: 13
---

import Tabs from "@theme/Tabs";

import TabItem from "@theme/TabItem";

## Introduction

This tutorial will guide you on how to integrate CustomAuth with AWS cognito service hosted ui.

We will be authenticating users with google idp using aws cognito. However you can can enable other providers from aws cognito console based on your requirements.

You can find
[the source code of this is example on Github](https://github.com/torusresearch/customauth/tree/master/examples/vue-app).

## Configuring Cognito user pool in aws cognito.

- Go to your aws account and open aws cognito service.

- Create a new user pool by following this aws guide: `https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pool-as-user-directory.html`

- Note down your `user pool id` and `region` after creating new pool.

- Add a new app client to the user pool from `App clients` tab under your pool settings.

- Note down the `clientId` for this app client.

- Add a domain to your app's hosted ui in from `App integeration's domain name` section

- Update app client settings for the new app client under `App client settings` tab to set desired oauth flows
and redirect endpoints.

## Configuring google login provider in aws cognito
- Go to `identity providers` tab under federation tab and select google. It will require you to enter your google's app client id and secret which you can obtain here: `https://console.cloud.google.com/apis/dashboard`

- While configuring your google app oauth client for web, make sure to enter your cognito hosted ui
domain in the `Authorized Javascript Origins` list and `<AWS_COGNITO_HOSTED_UI_DOMAIN>/oauth2/idpresponse` end point in the Authorized redirect URIs list.

- Go back to your aws console and enter your google app client id and secret key.

- Now your google login provider is configured, you can enable it in your `App client settings` in aws console.

- Now go to your hosted app domain , it should show you hosted ui with google login button.

- Now lets move to configure torus customAuth.

## Register your Torus CustomAuth application

In order to use Torus Custom SDK, you'll need to create a project in
[Developer Dashboard](https://developer.tor.us).

Do the following steps in order to create your custom verifier:-

1. Login in to developer dashboard, go to `Custom Auth` tab.

2. Click on  create verifier button.

3. Enter your custom verifier information as follows:-

    - Enter your unique verifier identifier, it will represent your application on torus network. You will need to use this value later while initializing your sdk.

    - Select network option:-
      - `'Testnet'`:- Select testnet for development mode. Your verifier will be deployed on ropsten testnet and torus test network.
      - `'Mainnet'`:- Select mainnet for production mode. Your verifier will be deployed on ethereum mainnet and torus main network.
    - Select Verifier type as: "Custom"

    - Enter JWT Verifier ID as : "email". You can also use "sub" as your jwt verifier id but if you are using multiple login providers then your users will get diffrent private keys accross diffrent login providers even if they use same email address as they will be assigned different ids by aws cognito. You can set this field based on your application needs provided that it should be a unique identifier for user.

    - Your JWK endpoint endpoint for aws cognito will look like this - `https://cognito-idp.{region}.amazonaws.com/{userPoolId}/.well-known/jwks.json` , get values of `region` and `userPoolId` from your aws cognito console.

    - Enter JWT validation fields:-
      - `iss`: It shoudl be `https://cognito-idp.{region}.amazonaws.com/{userPoolId}, replace region and userPoolId that we noted earlier while creating cognito user pool.

      - `aud`: It should be your client id that your noted earlier while creatin app client in aws cognito console.

    - Save you verifier and it will be deployed in 5-10 minutes.


## Let's get started with code by installing depedency using npm

[TorusDirectWebSDK](https://www.npmjs.com/package/@toruslabs/customauth)
[JWTDecode](https://www.npmjs.com/package/jwt-decode)

```shell
npm i @toruslabs/customauth --save
```


## Login with Aws cognito hosted ui

In order to login with aws cognito hosted ui, we just have to initialize torus `customauth` and call triggerLogin function as given in code snippet below.

```js
 import TorusSdk, { UX_MODE } from "@toruslabs/customauth";
 ...
 ...
  async mounted() {
    const torusdirectsdk = new TorusSdk({
      baseUrl: window.location.origin,
      redirectPathName: "auth",
      enableLogging: true,
      uxMode: UX_MODE.REDIRECT,
      network: "testnet",
  });
  this.torusdirectsdk = torusdirectsdk;
  await torusdirectsdk.init({ skipSw: true });
 }
 ...
 ...
 async login() {
    if (!this.torusdirectsdk) return;
    return this.torusdirectsdk.triggerLogin({
      typeOfLogin: "jwt",
      verifier: "demo-cognito-example", // verifier name , which we just created above from developer dashboard
      clientId: "78i338ev9lkgjst3mfeuih9tsh", // aws cognito app client id
      jwtParams: {
        domain: "https://torus-test.auth.ap-southeast-1.amazoncognito.com/oauth2/", // your aws cognito hosted ui domain
        user_info_endpoint: "userInfo" // aws cognito user info api path (optional)
      },
    });
  },
```

## Handling login result:-

In login code snippet, note that we are using redirect `uxMode` while initializing which means that user will
be redirect to `redirectPathName` which is `auth` page in this example along with privateKey. You can get the result
on auth page with a simple function call which is shown in code snippet below. However you can also use `POPUP` uxmode to get
privateKey as a response to triggerLogin function.


- On auth page just calling `getRedirectResult` function will return the login result along with user's private key.

```js
  const torusdirectsdk = new TorusSdk({
    baseUrl: location.origin,
    redirectPathName: "auth",
    enableLogging: true,
    uxMode: "redirect",
    network: "testnet",
  });
  const loginResult = await torusdirectsdk.getRedirectResult();
```


## Using Private Key with web3 provider:

- You can use this private key to use with `@web3auth/ethereum-provider` which is an EIP1993 compatible wallet provider and this provider can we used to directly invoke blockchain functions using rpc calls or using the provider with web3 js library.

> Prerequisites:
```
npm i --save @web3auth/ethereum-provider
```

- After installing above package you can generate a provider from private key as given below:-


```ts
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import type { SafeEventEmitterProvider } from "@web3auth/base";

const provider = await EthereumPrivateKeyProvider.getProviderInstance({
  chainConfig: {
    rpcTarget: "https://polygon-rpc.com",
    chainId: "0x89", // hex chain id
    networkName: "matic",
    ticker: "matic",
    tickerName: "matic",
  },
  privKey: "4c0883a69102937d6231471b5dbb6204fe5129617082792ae468d01a3f362318",
});

```

> Sample Chain Config

```json=

  chainConfig: {
    rpcTarget: "https://polygon-rpc.com", // your rpc node endpoint of any evm compatible chain
    chainId: "0x89", // Note: chainId should be in hex format
    networkName: "Polygon Mainnet",
    ticker: "matic",
    tickerName: "matic",
  }
```

- Once you have a provider you can inject that provider in to web3 library and invoke any function using web3 like sending transactions, signing messages etc.

For ex:

```ts
import type { SafeEventEmitterProvider } from "@web3auth/base";

# Signing a message
const signEthMessage = async (provider: SafeEventEmitterProvider): Promise<string> => {
  const web3 = new Web3(provider as any);
  const accounts = await web3.eth.getAccounts();
  // hex message
  const message = "0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad";
  const signature = await web3.eth.sign(message, accounts[0]);
  return signature;
};

# Fetching latest block from chain
const fetchLatestBlock = async (provider: SafeEventEmitterProvider): Promise<any> => {
  const web3 = new Web3(provider as any);
  const block = await web3.eth.getBlock("latest");
  return block;
};
```
## Conclusion

You can use the above private key which is returned as response of `getRedirectResult` in your web3 SDK.
