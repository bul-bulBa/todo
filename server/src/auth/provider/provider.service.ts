import { Inject, Injectable } from '@nestjs/common';
import { ProviderOptionsSymbol, type TypeOptions } from './provider.constants';
import { baseOAuthService } from './services/base-oauth.service';

@Injectable()
export class ProviderService {
    constructor(
        @Inject(ProviderOptionsSymbol) private readonly options: TypeOptions
    ) {}

    onModuleInit() {
        for(const provider of this.options.services) {
            provider.baseUrl = this.options.baseUrl
        }
    }

    findByService(service: string): baseOAuthService | null {
        return this.options.services.find(s => s.name === service) ?? null
    }
}
