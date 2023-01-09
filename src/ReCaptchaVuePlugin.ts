import { load as loadReCaptcha, ReCaptchaInstance } from 'recaptcha-v3'
import { App, Ref, ref, inject, InjectionKey } from 'vue'
import { IReCaptchaOptions } from './IReCaptchaOptions'

const VueReCaptchaInjectKey: InjectionKey<IReCaptchaComposition> = Symbol('VueReCaptchaInjectKey')

interface IGlobalConfig {
  loadedWaiters: Array<({resolve: (resolve: boolean) => void, reject: (reject: Error) => void})>
  error: Error | null
}
const globalConfig: IGlobalConfig = {
  loadedWaiters: [],
  error: null
}

export const VueReCaptcha = {
  install (app: App, options: IReCaptchaOptions) {
    const isLoaded = ref(false)
    const instance: Ref<ReCaptchaInstance | undefined> = ref(undefined)

    app.config.globalProperties.$recaptchaLoaded = recaptchaLoaded(isLoaded)

    const thenAction: any = (wrapper: ReCaptchaInstance) => {
      isLoaded.value = true
      instance.value = wrapper

      app.config.globalProperties.$recaptcha = recaptcha(instance)
      app.config.globalProperties.$recaptchaInstance = instance

      globalConfig.loadedWaiters.forEach((v) => v.resolve(true))
    }

    const catchAction: any = (error: any) => {
      globalConfig.error = error
      globalConfig.loadedWaiters.forEach((v) => v.reject(error))
    }

    /**
     * Credit goes to https://github.com/fatfingers23 and his push request https://github.com/AurityLab/vue-recaptcha-v3/pull/161
     */
    if (options?.siteKey != null) {
      initializeReCaptcha(options).then((wrapper) => {
        thenAction(wrapper)
      }).catch((error) => {
        catchAction(error)
      })
    } else {
      app.config.globalProperties.$captchaOptions = options
      app.config.globalProperties.$loadRecaptchaAfterSetup = async (siteKey: string): Promise<any> => {
        let optionsAsync = app.config.globalProperties.$captchaOptions
        if (typeof siteKey !== 'undefined' && typeof optionsAsync === 'undefined') {
          optionsAsync = {}
        }
        optionsAsync.siteKey = siteKey
        await initializeReCaptcha(optionsAsync).then((wrapper) => {
          thenAction(wrapper)
        }).catch((error) => {
          catchAction(error)
        })
      }
    }

    app.provide(VueReCaptchaInjectKey, {
      instance,
      isLoaded,
      executeRecaptcha: recaptcha(instance),
      recaptchaLoaded: recaptchaLoaded(isLoaded)
    })
  }
}

export function useReCaptcha (): IReCaptchaComposition | undefined {
  return inject(VueReCaptchaInjectKey)
}

async function initializeReCaptcha (options: IReCaptchaOptions): Promise<ReCaptchaInstance> {
  return await loadReCaptcha(options.siteKey, options.loaderOptions)
}

function recaptchaLoaded (isLoaded: Ref<boolean>) {
  // eslint-disable-next-line @typescript-eslint/promise-function-async
  return () => new Promise<boolean>((resolve, reject) => {
    if (globalConfig.error !== null) {
      return reject(globalConfig.error)
    }
    if (isLoaded.value) {
      return resolve(true)
    }
    globalConfig.loadedWaiters.push({ resolve, reject })
  })
}

function recaptcha (instance: Ref<ReCaptchaInstance | undefined>) {
  return async (action: string): Promise<string | undefined> => {
    return await instance.value?.execute(action)
  }
}

export interface IReCaptchaComposition {
  isLoaded: Ref<boolean>
  instance: Ref<ReCaptchaInstance | undefined>
  executeRecaptcha: (action: string) => Promise<string>
  recaptchaLoaded: () => Promise<boolean>
}
