import {ReCaptchaWrapper} from 'recaptcha-v3/dist/ReCaptchaWrapper'
import {IReCaptchaExecute} from './IReCaptchaExecute'

export class ReCaptchaExecute implements IReCaptchaExecute {
  private recaptcha: ReCaptchaWrapper

  public constructor(recaptcha: ReCaptchaWrapper) {
    this.recaptcha = recaptcha
  }

  public execute(action: string): Promise<string> {
    return this.recaptcha.execute(action)
  }
}
