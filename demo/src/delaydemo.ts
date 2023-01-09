import { createApp } from 'vue'
import { VueReCaptcha } from '../../src/ReCaptchaVuePlugin'

const component = {
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
      return await new Promise(resolve => setTimeout(resolve, ms))
    }
  },
  template: '<button @click="recaptcha">Execute with delay recaptcha</button>'
}

createApp(component)
  .use(VueReCaptcha)
  .mount('#delaydemo')
