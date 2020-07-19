# Vue reCAPTCHA-v3

[![npm](https://img.shields.io/npm/v/vue-recaptcha-v3.svg)](https://www.npmjs.com/package/vue-recaptcha-v3)
[![npm type definitions](https://img.shields.io/npm/types/vue-recaptcha-v3.svg)](https://www.npmjs.com/package/vue-recaptcha-v3)

A simple and easy to use reCAPTCHA (v3 only) library for Vue based on [reCAPTCHA-v3](https://github.com/AurityLab/recaptcha-v3).

## Install

With NPM:

```bash
npm install vue-recaptcha-v3
```

With Yarn:

```bash
yarn add vue-recaptcha-v3
```

## Prerequisites

To use this package you only need a valid site key for your domain, which you can easily get [here](https://www.google.com/recaptcha).

## Usage

### Load with the sitekey at initialization

```javascript
import Vue from 'vue'
import { VueReCaptcha } from 'vue-recaptcha-v3'

// For more options see below
Vue.use(VueReCaptcha, { siteKey: '<site key>' })

new Vue({
  methods: {
    async recaptcha() {
      // (optional) Wait until recaptcha has been loaded.
      await this.$recaptchaLoaded()

      // Execute reCAPTCHA with action "login".
      const token = await this.$recaptcha('login')

      // Do stuff with the received token.
    }
  },
  template: '<button @click="recaptcha">Execute recaptcha</button>'
})
```

### Load ReCaptcha after the plugin has been initialized

```javascript
import Vue from 'vue'
import { VueReCaptcha } from 'vue-recaptcha-v3'
const axios = require('axios')

// Primes the plugin with other values besides the site key
Vue.use(VueReCaptcha, {
  loaderOptions: {
    useRecaptchaNet: true
  }
})
new Vue({
  methods: {
    async recaptcha() {

    // example of a web call to get the siteKey from an api, this is not a real web call
    axios.get('/SiteKey')
      .then(function (response) {
        let siteKey = response.data.siteKey
        //Loads the recaptcha with the key from the api
        this.$loadRecaptchaAfterSetup('<site key>')
      });

      // Waits until this.$loadRecaptchaAfterSetup is called and sets up the captcha with the site key from the api
      await this.$recaptchaLoaded()

      // Execute reCAPTCHA with action "login".
      const token = await this.$recaptcha('login')

      // Do stuff with the received token.
    }
  },
  template: '<button @click="recaptcha">Execute recaptcha</button>'
})
```

## Options

This plugin offers optional options to configure the behavior of some parts.

Available options:

| Name          | Description                                                                                                                                                                                           | Type     | Default value |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------------- |
| siteKey       | The site key for your domain from Google.                                                                                                                                                             | *string* | *none*        |
| loaderOptions | Optional options for the [recaptcha-v3](https://github.com/AurityLab/recaptcha-v3) loader. The available options are described [here](https://github.com/AurityLab/recaptcha-v3/#load-options-usage). | *object* | `null`        |

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

## Advanced usage

Some topics which are not commonly used, but required in some cases.

### Access [reCAPTCHA-v3](https://github.com/AurityLab/recaptcha-v3/#load-options-usage) instance

In some cases it's necessary to interact with the reCAPTCHA-v3 instance, which provides more control over reCAPTCHA.

```javascript
const recaptcha = this.$recaptchaInstance

// Hide reCAPTCHA badge:
recaptcha.hideBadge()

// Show reCAPTCHA badge:
recaptcha.showBadge()
```  
