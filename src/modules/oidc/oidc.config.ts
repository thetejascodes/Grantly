import { KeyService } from '../keys/index.js';

export async function buildOidcConfig() {
    return {
        jwks: KeyService.getJwks(),
        // or keys: KeyService.getKeystore() depending on oidc-provider v9 API
    };
}