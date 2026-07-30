import 'dotenv/config';
import { loadEnv } from './common/config/env.js';
import { KeyService } from './modules/keys/key.service.js';
import { bootstrapIdentityProviders } from './modules/identity-providers/index.js';
import { initializeOidcProvider } from './modules/oidc/oidc.provider.js';
import { registerOidcRoutes } from './modules/oidc/oidc.routes.js';
import { scheduleCleanupJob } from './common/jobs/schedule-cleanup.js';
import app from './app.js';

const port = Number(process.env.PORT);

const startServer = async () => {
    const env = loadEnv();
    await KeyService.init();
    bootstrapIdentityProviders();
    await initializeOidcProvider();
    await registerOidcRoutes();
    scheduleCleanupJob();
    app.listen(port, () => {
        console.log(`🚀 Server is running on port ${port}`);
    });
};

startServer().catch((err)=>{
    console.error("Failed to start server", err)   
    process.exit(1)
})