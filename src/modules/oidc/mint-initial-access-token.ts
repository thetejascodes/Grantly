import { initializeOidcProvider } from './oidc.provider.js';

async function main() {
  const provider = await initializeOidcProvider();
  const AdapterInitialAccessToken = (provider as any).InitialAccessToken;

  if (!AdapterInitialAccessToken) {
    throw new Error('InitialAccessToken model not found — confirm features.registration.initialAccessToken is enabled');
  }

  const token = new AdapterInitialAccessToken({});
  const jwt = await token.save();

  console.log('Initial Access Token:');
  console.log(jwt);
  process.exit(0);
}

main().catch((err) => {
  console.error('Failed to mint token:', err);
  process.exit(1);
});