import { load as loadReCaptcha, ReCaptchaInstance } from 'recaptcha-v3'
import _Vue from 'vue'
import { IReCaptchaOptions } from './IReCaptchaOptions'

export function VueReCaptcha (Vue: typeof _Vue, options: IReCaptchaOptions): void {
  const plugin = new ReCaptchaVuePlugin()
  let recaptchaLoaded = false
  let recaptchaError: Error | null = null

  const loadedWaiters: Array<({resolve: (resolve: boolean) => void, reject: (reject: Error) => void})> = []

  // eslint-disable-next-line @typescript-eslint/promise-function-async
  Vue.prototype.$recaptchaLoaded = () => new Promise<boolean>((resolve, reject) => {
    if (recaptchaError !== null) {
      return reject(recaptchaError)
    }
    if (recaptchaLoaded) {
      return resolve(true)
    }
    loadedWaiters.push({ resolve, reject })
  })

  plugin.initializeReCaptcha(options).then((wrapper) => {
    Vue.prototype.$recaptcha = async (action: string): Promise<string> => {
      return await wrapper.execute(action)
    }

    Vue.prototype.$recaptchaInstance = wrapper
    recaptchaLoaded = true
    loadedWaiters.forEach((v) => v.resolve(true))
  }).catch((error) => {
    recaptchaError = error
    loadedWaiters.forEach((v) => v.reject(error))
  })
}

class ReCaptchaVuePlugin {
  public async initializeReCaptcha (options: IReCaptchaOptions): Promise<ReCaptchaInstance> {
    return await loadReCaptcha(options.siteKey, options.loaderOptions)
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $recaptcha: (action: string) => Promise<string>
    $recaptchaLoaded: () => Promise<boolean>
    $recaptchaInstance: ReCaptchaInstance
  }
}
