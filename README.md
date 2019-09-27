# reCAPTCHA-v3

[![npm](https://img.shields.io/npm/v/recaptcha-v3.svg)](https://www.npmjs.com/package/recaptcha-v3)
[![npm type definitions](https://img.shields.io/npm/types/recaptcha-v3.svg)](https://www.npmjs.com/package/recaptcha-v3)
[![Standard](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

A simple and easy to use reCAPTCHA (v3 only) library for the browser. (You may be also interested in [wrapper libraries](#wrapper-libraries))

## Install

With NPM:

```bash
$ npm install recaptcha-v3
```

With Yarn:

```bash
$ yarn add recaptcha-v3
```

## Prerequisites

To use this package you only need a valid site key for your domain, which you can easily get [here](https://www.google.com/recaptcha).

## Usage

With promises:

```javascript
import { load } from 'recaptcha-v3'

load('<site key>').then((recaptcha) => {
  recaptcha.execute('<action>').then((token) => {
      console.log(token) // Will print the token
    })
})
```

With async/await:

```javascript
import { load } from 'recaptcha-v3'

async function asyncFunction() {
  const recaptcha = await load('<site key>')
  const token = await recaptcha.execute('<action>')

  console.log(token) // Will also print the token
}
```

## Loader options

The loader takes care of loading the reCAPTCHA script from Google.
Therefore the loader offers optional options for additional configuration:

| Name                 | Description                                                                                                                                                                                                                                                            | Type      | Default value |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ------------- |
| **useRecaptchaNet**  | Due to limitations in certain countries it's required to use `recaptcha.net` instead of `google.com`.                                                                                                                                                                  | _boolean_ | `false`       |
| **autoHideBadge**    | Will automatically hide the reCAPTCHA badge. Warning: The usage is only allowed if you follow the offical guide for hiding the badge from Google ([see here](https://developers.google.com/recaptcha/docs/faq#id-like-to-hide-the-recaptcha-v3-badge-what-is-allowed)) | _boolean_ | `false`       |
| **renderParameters** | Will add the given parameters to the reCAPTCHA script. The given object will be converted into a query string and will then be added to the URL.                                                                                                                       | Object    | `{}`          |

### Load options usage

To use the options just pass an additional object to the `load(...)` method.
For example:

```javascript
import { load } from 'recaptcha-v3'

load('<site key>', {
  useRecaptchaNet: true,
  autoHideBadge: true
}).then((recaptcha) => {

})
```

## Wrapper libraries

Wrapper libraries are available for:

-   Vue.js plugin ([vue-recaptcha-v3](https://github.com/AurityLab/vue-recaptcha-v3) / [npm](https://www.npmjs.com/package/vue-recaptcha-v3))
