import { load as loadReCaptcha, ReCaptchaInstance } from 'recaptcha-v3'
import _Vue from 'vue'
import { IReCaptchaOptions } from './IReCaptchaOptions'

export function VueReCaptcha (Vue: typeof _Vue, options: IReCaptchaOptions): void {
  const plugin = new ReCaptchaVuePlugin()
  let recaptchaLoaded = false
  let recaptchaError: Error = null

  const loadedWaiters: Array<({resolve: (resolve: boolean) => void, reject: (reject: Error) => void})> = []

  // eslint-disable-next-line @typescript-eslint/promise-function-async
  Vue.prototype.$recaptchaLoaded = () => new Promise<boolean>((resolve, reject) => {
    if (recaptchaError !== null) {
      return reject(recaptchaError)
    }
    if (recaptchaLoaded === true) {
      return resolve(true)
    }
    loadedWaiters.push({ resolve, reject })
  })

  const thenAction: any = (wrapper: ReCaptchaInstance) => {
    recaptchaLoaded = true
    Vue.prototype.$recaptcha = async (action: string): Promise<string> => {
      return wrapper.execute(action)
    }
    Vue.prototype.$recaptchaInstance = wrapper
    loadedWaiters.forEach((v) => v.resolve(true))
  }

  const catchAction: any = (error: any) => {
    recaptchaError = error
    loadedWaiters.forEach((v) => v.reject(error))
  }
  if (options.siteKey != null) {
    plugin.initializeReCaptcha(options).then((wrapper) => {
      thenAction(wrapper)
    }).catch((error) => {
      catchAction(error)
    })
  } else {
    Vue.prototype.$captchaOptions = options
    Vue.prototype.$loadRecaptchaAfterSetup = async (siteKey: string): Promise<any> => {
      const options = Vue.prototype.$captchaOptions
      options.siteKey = siteKey
      await plugin.initializeReCaptcha(options).then((wrapper) => {
        thenAction(wrapper)
      }).catch((error) => {
        catchAction(error)
      })
    }
  }
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
    $loadRecaptchaAfterSetup(siteKey: string): Promise<any>
  }
}
