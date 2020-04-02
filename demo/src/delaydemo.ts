import Vue from 'vue'
import { VueReCaptcha } from '../../src/ReCaptchaVuePlugin'

Vue.use(VueReCaptcha, { })

new Vue({
  methods: {
    async recaptcha () {
      console.log('recaptcha clicked')

      this.$recaptchaLoaded().then(() => {
        console.log('recaptcha loaded')
        this.$recaptcha('login').then((token: string) => {
          console.log(token) // Will print the token
        })
      })
      await this.delay(1000)
      this.$loadRecaptchaAfterSetup('6LfC6HgUAAAAAEtG92bYRzwYkczElxq7WkCoG4Ob')
    },
    async delay (ms: number) {
      return new Promise(resolve => setTimeout(resolve, ms))
    }
  },
  template: '<button @click="recaptcha">Execute with delay recaptcha</button>'
}).$mount('#delaydemo')
