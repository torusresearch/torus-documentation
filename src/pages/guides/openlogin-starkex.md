---
title: How to use Openlogin with StarkEx.
image: "/contents/torus-starkex.png"
description: Learn to use OpenLogin to integrate with StarkEx
order: 14
---

import Tabs from "@theme/Tabs";

import TabItem from "@theme/TabItem";

## Introduction

This tutorial will guide you with steps to integerate Openlogin
authentication with StarkEx in a react app.

At the end of this guide you should be able to:-
- Authenticate user with openlogin.
- Derive starknet friendly keys from user's openlogin private key.
- Mint, Deposit, and Withdraw transaction.

You can find
[the source code of this is example on Github](https://github.com/torusresearch/OpenLoginSdk/blob/master/examples/starkex-react-example).

## Register your OpenLogin application

In order to use OpenLogin SDK, you'll need to create a project in
[Developer Dashboard](https://developer.tor.us) and get your client ID.

> App registration is not required for localhost development.

## Let's get started with code by installing depedencies using npm

To start with using openlogin with starkex, you need to install
[Openlogin](https://www.npmjs.com/package/@toruslabs/openlogin),
[Openlogin-Starkkey](https://www.npmjs.com/package/@toruslabs/openlogin-starkkey),
[StarkEx.js](https://www.npmjs.com/package/@starkware-industries/starkex-js)

```shell
npm install --save @toruslabs/openlogin
npm install --save @toruslabs/openlogin-starkkey
npm install --save @starkware-industries/starkex-js

```

## Create and initialize openlogin instance

Start with creating a instance of openlogin class and initialize it using
`openlogin.init()` when application is mounted. After initialization it checks
if sdk has private key then user is already logged in.

We are using two options while creating openlogin class instance:-

- `clientId`: clientId is a public id which is used to to identify your app. You
  can generate your client id from
  [developer dashboard](http://developer.tor.us/). For localhost you can use any
  static random string as client id.

- `network`: network can be `testnet` or `mainnet`.

```js
useEffect(() => {
  setLoading(true)
  const sdkInstance = new OpenLogin({
    clientId: "YOUR_PROJECT_ID",
    network: "testnet"
  });
  async function initializeOpenlogin() {
    await sdkInstance.init();
    if (sdkInstance.privKey) {
      // qpp has access ot private key now
      ...
      ...
    }
    setSdk(sdkInstance);
    setLoading(false)
  }
  initializeOpenlogin();
}, []);
```

## Login

Once the sdk is initialized , then `openlogin.login` should be called when user
clicks on login button.

```js
async function handleLogin() {
    // privKey will be returned here only in case of popup mode or in case user is already logged in.
    // for redirect mode login, private key will be returned as `openlogin.privKey` after openlogin
    // is initialized using `init` function on successfully login redirect.
    const privKey = await openlogin.login({
        loginProvider: "google",
        redirectUrl: `${window.origin}`,
    });
    return privKey
}
```

Above code snippet will start the login flow for the user and redirect/popups openlogin authentication ui
for user based on the ux mode specified.

Openlogin sdk provides two UX modes (ie POPUP and REDIRECT) for login flow. You can use either depends on your
application UX by setting up `uxMode` option in login function, default is
`redirect`.

> Note: in above function, privKey will be returned here only in case of popup ux mode or in case user is already logged in. For redirect mode login, private key will be returned as `openlogin.privKey` after openlogin is initialized using `init` function which should be  called redirect url page mount.


In redirect mode user will be redirected completely out of app and will be
redirected back to `redirectUrl` after successful authentication, application
will have access to private key as `openlogin.privKey` after initializing
`openlogin` instance.

We recommend to use redirect mode because some browsers might block popup in some cases.

In PopUp mode, openlogin authentication window will open as a popup and app will
get private key when `openlogin.login` promise will resolve.

This example is compatible with both redirect and popup ux modes.

In the given code snippet, `openlogin.login` function is getting called along
with two options:-

- `loginProvider`: It specifies the login method which will be used to
  authenticate user. You can checkout
  [API Reference](/open-login/api-reference/usage) to know
  about all supported and custom login provider values.

- `redirectUrl`: User will be redirected to redirectUrl after login.

Checkout [API Reference](/open-login/api-reference/usage) for
other options available to pass in openlogin constructor and login function.


## Use the openlogin private key to derive starknet key pair

After login, application will have access to the user's private key from`openlogin.privKey` instance variable.
We cannot use this key with starknet ec curve specific signing functions,so we need to derive starknet compatible keys from `openlogin.privKey`.


```js
    import { grindKey, starkEc } from "@toruslabs/openlogin-starkkey";;
    ...
    ...
    const getStarkAccount = (): elliptic.KeyPair => {
      const starkEcOrder = starkEc.n;
      const account = starkEc.keyFromPrivate(grindKey(openlogin.privKey, starkEcOrder), "hex");
      return account;
    };

```

Now we have a starknet compatible key pair. We can generate starkKey from this and use on StarkEx transactions.

```js
  ...
  const getStarkKey = (): string => {
    const account = getStarkAccount();
    return account.getPrivate("hex");
  };
```

## Mint, Deposit, and Withdraw requests using StarkEx.

Here are some of the interactions which you can do using StarkEx. You can find the full documentation of StarkEx API gateway here https://starkware.co/StarkExRESTAPI/gateway.html and using StakEx-JS here https://github.com/starkware-libs/starkex-js.

```js
  import StarkExAPI from "@starkware-industries/starkex-js/dist/browser";

  const starkExAPI = new StarkExAPI({
    endpoint: "https://gw.playground-v2.starkex.co",
  });

  const onMintRequest = async () => {
    const txId = await starkExAPI.gateway.getFirstUnusedTxId();
    const starkKey = getStarkKey();
    const request = {
      txId,
      vaultId: 1654615998,
      amount: "6",
      tokenId: "0x400de4b5a92118719c78df48f4ff31e78de58575487ce1eaf19922ad9b8a714",
      starkKey: `0x${starkKey}`,
    };
    const response = await starkExAPI.gateway.mint(request);
    console.log("---response", response);
    printToConsole({ response });
  };

  const onDepositRequest = async () => {
    const txId = await starkExAPI.gateway.getFirstUnusedTxId();
    const starkKey = getStarkKey();
    const request = {
      txId,
      amount: 8,
      starkKey: `0x${starkKey}`,
      tokenId: "0x3ef811e040c4bc9f9eee715441cee470f5d5aff69b9cd9aca7884f5a442a890",
      vaultId: 1924014660,
    };
    const response = await starkExAPI.gateway.deposit(request);
    console.log("---response", response);
    printToConsole({ response });
  };

  const onWithdrawalRequest = async () => {
    const txId = await starkExAPI.gateway.getFirstUnusedTxId();
    const starkKey = getStarkKey();
    const request = {
      txId,
      amount: 8,
      starkKey: `0x${starkKey}`,
      tokenId: "0x2dd48fd7a024204f7c1bd874da5e709d4713d60c8a70639eb1167b367a9c378",
      vaultId: 612008755,
    };
    const response = await starkExAPI.gateway.withdrawal(request);
    console.log("---response", response);
    printToConsole({ response });
  };
```

## Logging out user

In order to logout user you needs to call logout function available on sdk
instance. Logout function will clears the sdk state and removes any access to
private key on frontend. You can pass various other options in logout function
like `fastLogin` , `redirectUrl` etc. To know more about that checkout
[API Reference](/open-login/api-reference/usage)

```js
const handleLogout = async () => {
  setLoading(true);
  await openlogin.logout();
  setLoading(false);
};
```

### DONE!!

> You can checkout example of this example app
> here.[the source code of this is example on Github](https://github.com/torusresearch/OpenLoginSdk/blob/master/examples/starkex-react-example).
> You can found a working demo application here:- https://openlogin-starkex.surge.sh
