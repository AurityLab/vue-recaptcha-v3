import {load as loadReCaptcha} from 'recaptcha-v3'
import _Vue from 'vue'
import {IReCaptchaOptions} from './IReCaptchaOptions'

export function VueReCaptcha(Vue: typeof _Vue, options: IReCaptchaOptions) {
  const plugin = new ReCaptchaVuePlugin()

  plugin.initializeReCaptcha(options.siteKey).then((wrapper) => {
    console.log(wrapper)

    Vue.prototype.$recaptcha = (action: string) => {
      return wrapper.execute(action)
    }
  })
}

class ReCaptchaVuePlugin {
  public async initializeReCaptcha(siteKey: string) {
    const reCaptchaWrapper = await loadReCaptcha(siteKey)
    return reCaptchaWrapper
  }
}
