import {load as loadReCaptcha} from 'recaptcha-v3'
import _Vue from 'vue'
import {IReCaptchaOptions} from './IReCaptchaOptions'

export function VueReCaptcha(Vue: typeof _Vue, options: IReCaptchaOptions) {
  const plugin = new ReCaptchaVuePlugin()
  let recaptchaLoaded = false

  const loadedWaiters: Array<(resolve: boolean) => void> = []

  Vue.prototype.$recaptchaLoaded = () => new Promise<boolean>((resolve, reject) => {
    if (recaptchaLoaded === true)
      resolve(true)
    else
      loadedWaiters.push(resolve)
  })

  plugin.initializeReCaptcha(options).then((wrapper) => {
    recaptchaLoaded = true
    Vue.prototype.$recaptcha = (action: string): Promise<string> => {
      return wrapper.execute(action)
    }
    loadedWaiters.forEach((v) => v(true))
  })
}

class ReCaptchaVuePlugin {
  public async initializeReCaptcha(options: IReCaptchaOptions) {
    return await loadReCaptcha(options.siteKey, options.loaderOptions)
  }
}

declare module 'vue/types/vue' {
  // tslint:disable-next-line:interface-name
  interface Vue {
    $recaptcha(action: string): Promise<string>

    $recaptchaLoaded(): Promise<boolean>
  }
}
