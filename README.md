# Vue reCAPTCHA-v3
![npm](https://img.shields.io/npm/v/vue-recaptcha-v3.svg) 
![npm type definitions](https://img.shields.io/npm/types/vue-recaptcha-v3.svg)

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

vue.use(VueReCaptcha, { siteKey: '<site key>' })

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
