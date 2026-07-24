#!/usr/bin/env bash
set -euo pipefail

KEYS_DIR="${KEYS_DIR:-./keys}"
PRIVATE_KEY="$KEYS_DIR/private.pem"
PUBLIC_KEY="$KEYS_DIR/public.pem"
JWKS_FILE="$KEYS_DIR/jwks.json"

mkdir -p "$KEYS_DIR"

if [[ -f "$PRIVATE_KEY" ]]; then
  echo "Private key already exists at $PRIVATE_KEY"
  echo "Delete it first if you want to rotate keys."
  exit 1
fi

echo "Generating RSA-2048 private key..."
openssl genrsa -out "$PRIVATE_KEY" 2048
chmod 600 "$PRIVATE_KEY"

echo "Extracting public key..."
openssl rsa -in "$PRIVATE_KEY" -pubout -out "$PUBLIC_KEY"

echo "Building JWKS via node-jose..."
node --input-type=module <<'EOF'
import fs from 'node:fs';
import jose from 'node-jose';

const privatePem = fs.readFileSync(process.env.PRIVATE_KEY ?? './keys/private.pem', 'utf8');
const jwksPath = process.env.JWKS_FILE ?? './keys/jwks.json';

const keystore = jose.JWK.createKeyStore();
const key = await keystore.add(privatePem, 'pem', {
  alg: 'RS256',
  use: 'sig',
  kid: `oidc-rs256-${Date.now()}`,
});

const jwks = { keys: [key.toJSON(false)] }; // public JWK only
fs.writeFileSync(jwksPath, JSON.stringify(jwks, null, 2));
console.log(`Wrote ${jwksPath} with kid=${key.kid}`);
EOF

echo "Done. Keys written to $KEYS_DIR"
echo "Add keys/private.pem to .gitignore — never commit it."