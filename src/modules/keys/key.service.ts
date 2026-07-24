// Responsibilities:
// 1. Read OIDC_PRIVATE_KEY_PATH from env (default ./keys/private.pem)
// 2. Fail fast with clear error if file missing:
//    "Run: bash key-gen.sh"
// 3. Load private PEM into node-jose KeyStore
// 4. Expose getKeystore(), getJwks(), getSigningKey(kid)
// 5. Optionally read OIDC_JWKS_PATH for public JWKS cache
import fs from 'fs'
import path from 'path'
import * as jose from 'node-jose'
import { config } from 'dotenv'
import ApiError from '../../common/utils/api-error.js'

config();
let keystore: jose.JWK.KeyStore | null = null;
let jwks: any = null;

export const KeyService = async () => {
    if (!keystore) {
        const privateKeyPath = process.env.OIDC_PRIVATE_KEY_PATH || './keys/private.pem';
        const resolvedPath = path.resolve(privateKeyPath);

        if (!fs.existsSync(resolvedPath)) {
            throw ApiError.badRequest(`Private key file not found at ${resolvedPath}\nRun: bash key-gen.sh`);
        }

        try {
            const store = jose.JWK.createKeyStore();
            const privateKeyPem = fs.readFileSync(resolvedPath, 'utf8');

            await store.add(privateKeyPem, 'pem');
            keystore = store;

            const jwksPath = process.env.OIDC_JWKS_PATH || './keys/jwks.json';
            const resolvedJwksPath = path.resolve(jwksPath);

            if (fs.existsSync(resolvedJwksPath)) {
                jwks = JSON.parse(fs.readFileSync(resolvedJwksPath, 'utf8'));
            }
        } catch (error) {
            throw ApiError.badRequest(`Failed to load private key: ${(error as Error).message}`);
        }
    }

    return { getKeyStore, getJwks, getSigningKey };
}

export const getKeyStore = (): jose.JWK.KeyStore => {
    if (!keystore) {
        throw ApiError.badRequest('KeyStore not initialized. Call KeyService() first.');
    }
    return keystore;
};

export const getJwks = (): any => {
    if (!keystore) {
        throw ApiError.badRequest('KeyStore not initialized. Call KeyService() first.');
    }
    return jwks || keystore.toJSON();
};

export const getSigningKey = (kid?: string): jose.JWK.Key => {
    if (!keystore) {
        throw ApiError.badRequest('KeyStore not initialized. Call KeyService() first.');
    }

    const keys = keystore.all();
    if (keys.length === 0) {
        throw ApiError.notFound('No keys available in KeyStore');
    }

    if (kid) {
        const key = keystore.get(kid);
        if (!key) {
            throw ApiError.unauthorized(`Key with ID ${kid} not found`);
        }
        return key;
    }

    const firstKey = keys[0];
    if (!firstKey) {
        throw ApiError.notFound('No keys available in KeyStore');
    }
    return firstKey;
}