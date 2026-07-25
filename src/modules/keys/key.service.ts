import fs from 'fs';
import path from 'path';
import jose from 'node-jose';
import { config } from 'dotenv';
import ApiError from '../../common/utils/api-error.js';

config();

let keystore: jose.JWK.KeyStore | null = null;
let jwks: any = null;
let initPromise: Promise<void> | null = null;

async function loadKeys(): Promise<void> {
    const privateKeyPath = process.env.OIDC_PRIVATE_KEY_PATH || './keys/private.pem';
    const resolvedPath = path.resolve(privateKeyPath);

    if (!fs.existsSync(resolvedPath)) {
        throw ApiError.internal(`Private key file not found at ${resolvedPath}\nRun: bash key-gen.sh`);
    }

    try {
        const store = jose.JWK.createKeyStore();
        const privateKeyPem = fs.readFileSync(resolvedPath, 'utf8');

        await store.add(privateKeyPem, 'pem');
        keystore = store;
    } catch (error) {
        throw ApiError.internal(`Failed to load private key: ${(error as Error).message}`);
    }

    const jwksPath = process.env.OIDC_JWKS_PATH || './keys/jwks.json';
    const resolvedJwksPath = path.resolve(jwksPath);

    if (fs.existsSync(resolvedJwksPath)) {
        try {
            jwks = JSON.parse(fs.readFileSync(resolvedJwksPath, 'utf8'));
        } catch (error) {
            throw ApiError.internal(`Failed to parse JWKS cache at ${resolvedJwksPath}: ${(error as Error).message}`);
        }
    }
}

function requireKeystore(): jose.JWK.KeyStore {
    if (!keystore) {
        throw ApiError.internal('KeyStore not initialized. Call KeyService.init() first.');
    }
    return keystore;
}

export const KeyService = {
    async init(): Promise<void> {
        if (keystore) return;
        if (!initPromise) {
            initPromise = loadKeys();
        }
        await initPromise;
    },

    getKeystore(): jose.JWK.KeyStore {
        return requireKeystore();
    },

    getJwks(): any {
        requireKeystore();
        return jwks || keystore!.toJSON(true);
    },

    getSigningKey(kid?: string): jose.JWK.Key {
        const store = requireKeystore();
        const keys = store.all();

        if (keys.length === 0) {
            throw ApiError.internal('No keys available in KeyStore');
        }

        if (kid) {
            const key = store.get(kid);
            if (!key) {
                throw ApiError.internal(`Key with ID ${kid} not found in KeyStore`);
            }
            return key;
        }

        const firstKey = keys[0];
        if (!firstKey) {
            throw ApiError.internal('No keys available in KeyStore');
        }
        return firstKey;
    },
};