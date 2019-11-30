import { load as loadReCaptcha, ReCaptchaInstance } from 'recaptcha-v3'
import _Vue from 'vue'
import { IReCaptchaOptions } from './IReCaptchaOptions'

export function VueReCaptcha (Vue: typeof _Vue, options: IReCaptchaOptions): void {
  const plugin = new ReCaptchaVuePlugin()
  let recaptchaLoaded = false

  const loadedWaiters: Array<(resolve: boolean) => void> = []

  // eslint-disable-next-line @typescript-eslint/promise-function-async
  Vue.prototype.$recaptchaLoaded = () => new Promise<boolean>((resolve, reject) => {
    if (recaptchaLoaded === true) {
      resolve(true)
    } else {
      loadedWaiters.push(resolve)
    }
  })

  plugin.initializeReCaptcha(options).then((wrapper) => {
    recaptchaLoaded = true
    Vue.prototype.$recaptcha = async (action: string): Promise<string> => {
      return wrapper.execute(action)
    }

    Vue.prototype.$recaptchaInstance = wrapper
    loadedWaiters.forEach((v) => v(true))
  }).catch(console.error)
}

class ReCaptchaVuePlugin {
  public async initializeReCaptcha (options: IReCaptchaOptions): Promise<ReCaptchaInstance> {
    return loadReCaptcha(options.siteKey, options.loaderOptions)
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $recaptcha(action: string): Promise<string>
    $recaptchaLoaded(): Promise<boolean>
    $recaptchaInstance: ReCaptchaInstance
  }
}
