import {load as loadReCaptcha} from 'recaptcha-v3'
import _Vue from 'vue'
import {PluginFunction, PluginObject} from 'vue'
import {ReCaptchaExecute} from './functions/ReCaptchaExecute'
import {IReCaptchaOptions} from './IReCaptchaOptions'

export class ReCaptchaVuePlugin implements PluginObject<IReCaptchaOptions> {
  public install: PluginFunction<IReCaptchaOptions>

  public constructor() {
    this.install = this.buildInstallMethod()
  }

  private buildInstallMethod(): PluginFunction<IReCaptchaOptions> {
    return (Vue: typeof _Vue, options) => {
      this.initializeReCaptcha(options.siteKey).then((reCaptchaWrapper) => {
        Vue.prototype.$recaptcha = new ReCaptchaExecute(reCaptchaWrapper).execute
      })
    }
  }

  private async initializeReCaptcha(siteKey: string) {
    const reCaptchaWrapper = await loadReCaptcha(siteKey)
    return reCaptchaWrapper
  }
}
