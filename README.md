# Vue reCAPTCHA-v3
[![npm](https://img.shields.io/npm/v/vue-recaptcha-v3.svg)](https://www.npmjs.com/package/vue-recaptcha-v3)
[![npm type definitions](https://img.shields.io/npm/types/vue-recaptcha-v3.svg)](https://www.npmjs.com/package/vue-recaptcha-v3)

A simple and easy to use reCAPTCHA (v3 only) library for Vue based on [reCAPTCHA-v3](https://github.com/AurityLab/recaptcha-v3).

## Install
With NPM:
```bash
$ npm install vue-recaptcha-v3
```

With Yarn:
```bash
$ yarn add vue-recaptcha-v3
```
 
## Prerequisites
To use this package you only need a valid site key for your domain, which you can easily get [here](https://www.google.com/recaptcha).

## Usage

```javascript
import Vue from 'vue'
import { VueReCaptcha } from 'vue-recaptcha-v3'

// For more options see below
Vue.use(VueReCaptcha, { siteKey: '<site key>' })

new Vue({
  methods: {
    recaptcha() {
      this.$recaptcha('login').then((token) => {
        console.log(token) // Will print the token
      })
    }
  },
  template: '<button @click="recaptcha">Execute recaptcha</button>'
})
```

## Options
This plugin offers optional options to configure the behavior of some parts.

Available options:

|Name|Description|Type|Default value
|----|-----------|----|-------------
|siteKey|The site key for your domain from Google.|*string*|*none*
|loaderOptions|Optional options for the [recaptcha-v3](https://github.com/AurityLab/recaptcha-v3) loader. The available options are described [here](https://github.com/AurityLab/recaptcha-v3/#usage-1).|*object*|`null`

### Usage
To use the options just pass an object to the `Vue.use(...)` method. For example:
```javascript
import Vue from 'vue'
import { VueReCaptcha } from 'vue-recaptcha-v3'

Vue.use(VueReCaptcha, {
  siteKey: '<site key>',
  loaderOptions: {
    useRecaptchaNet: true
  }
})
```
