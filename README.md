# Vue reCAPTCHA-v3
[![npm](https://img.shields.io/npm/v/vue-recaptcha-v3.svg)](https://www.npmjs.com/package/vue-recaptcha-v3)
[![npm type definitions](https://img.shields.io/npm/types/vue-recaptcha-v3.svg)](https://www.npmjs.com/package/vue-recaptcha-v3)

A simple and easy to use reCAPTCHA (v3 only) library for Vue based on [reCAPTCHA-v3](https://github.com/AurityLab/recaptcha-v3).

**The latest version of this package supports Vue 3!** [See here for Vue 2 usage](https://github.com/AurityLab/vue-recaptcha-v3/tree/vue-v2.x). 

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

### Vue 3 Composition

```js
import { createApp } from 'vue'
import { VueReCaptcha, useRecaptcha } from 'vue-recaptcha-v3'

const component = {
  setup() {
    const { executeRecaptcha, recaptchaLoaded } = useRecaptcha()

    const recaptcha = async () => {
      // (optional) Wait until recaptcha has been loaded.
      await recaptchaLoaded()

      // Execute reCAPTCHA with action "login".
      const token = await executeRecaptcha('login')

      // Do stuff with the received token.
    }

    return {
      recaptcha
    }
  },
  template: '<button @click="recaptcha">Execute recaptcha</button>'
}

createApp(component)
  .use(VueReCaptcha, { siteKey: '<site key>' })
```

### TypeScript + Vue 3
To get type suggestions for instance variables (this is not needed for composition API), create a new file called `shims-vue-recaptcha-v3.d.ts` and put the following inside it:
```ts
import { ReCaptchaInstance } from 'recaptcha-v3'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $recaptcha: (action: string) => Promise<string>
    $recaptchaLoaded: () => Promise<boolean>
    $recaptchaInstance: ReCaptchaInstance
  }
}
```

## Options
This plugin offers optional options to configure the behavior of some parts.

Available options:

|Name|Description|Type|Default value
|----|-----------|----|-------------
|siteKey|The site key for your domain from Google.|*string*|*none*
|loaderOptions|Optional options for the [recaptcha-v3](https://github.com/AurityLab/recaptcha-v3) loader. The available options are described [here](https://github.com/AurityLab/recaptcha-v3/#load-options-usage).|*object*|`null`

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
