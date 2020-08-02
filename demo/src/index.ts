import { createApp } from 'vue'
import { VueReCaptcha } from '../../src/ReCaptchaVuePlugin'

const compoent = {
  methods: {
    recaptcha () {
      console.log('recaptcha clicked')
      this.$recaptchaLoaded().then(() => {
        console.log('recaptcha loaded')
        this.$recaptcha('login').then((token: string) => {
          console.log(token) // Will print the token
        })
      })
    }
  },
  template: '<button @click="recaptcha">Execute recaptcha</button>'
}

createApp(compoent)
  .use(VueReCaptcha, { siteKey: '6LfC6HgUAAAAAEtG92bYRzwYkczElxq7WkCoG4Ob' })
  .mount('#inject')
