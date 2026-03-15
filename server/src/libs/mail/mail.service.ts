import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { render } from '@react-email/components';
import { Resend } from 'resend'
import { ConfirmationTemplate } from './templates/confirmation.email';
import { TwoFactorAuthTemplate } from './templates/two-factor.email';
import { ResetPasswordTemplate } from './templates/reset.password';

@Injectable()
export class MailService {
    private readonly resend: Resend

    constructor(private readonly config: ConfigService) {
        this.resend = new Resend(this.config.getOrThrow<string>('MAIL_API_KEY'))
    }

    async sendConfirmationEmail(email: string, token: string) {
        const domain = this.config.getOrThrow('ALLOWED_ORIGIN')
        const html = await render(ConfirmationTemplate({domain, token}))

        return this.sendEmail(email, 'Email confirmation', html)
    }

    async sendTwoFactorCode(email, code) {
        const html = await render(TwoFactorAuthTemplate({code}))

        return this.sendEmail(email, 'Two factor code', html)
    }

    async sendPasswordReset(email, token) {
        const domain = this.config.getOrThrow<string>('ALLOWED_ORIGIN')
        const html = await render(ResetPasswordTemplate({domain, token}))

        return this.sendEmail(email, 'Reset password', html)
    }

    async sendEmail(to: string, subject: string, html: string) {
        return this.resend.emails.send({
            from: this.config.getOrThrow('MAIL_FROM'),
            to,
            subject,
            html
        })
    }

}
