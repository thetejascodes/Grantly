import type { Adapter } from 'oidc-provider';
import { db } from '../../../common/db/index.js';
import { oidcPayloads } from '../../../common/db/schema.js';
import { eq,and } from 'drizzle-orm';
import ApiError from '../../../common/utils/api-error.js';

type OidcPayload = Record<string, unknown>;

export class DrizzleAdapter implements Adapter {
    constructor(private readonly type: string) { }

    private buildRecord(id: string, payload: OidcPayload, expiresIn?: number) {
        const grantId = typeof payload.grantId === 'string' ? payload.grantId : null;
        const userCode = typeof payload.userCode === 'string' ? payload.userCode : null;
        const uid = typeof payload.uid === 'string' ? payload.uid : null;
        return {
            id,
            type: this.type as never,
            payload,
            grantId: grantId,
            userCode: userCode,
            uid: uid,
            expiresAt: typeof expiresIn === 'number' && expiresIn > 0 ? new Date(Date.now() + expiresIn * 1000) : null,
        };
    }

    async upsert(id: string, payload: OidcPayload, expiresIn?: number): Promise<void> {
        const values = this.buildRecord(id, payload, expiresIn);
        await db.insert(oidcPayloads).values(values).onConflictDoUpdate({
            target: [oidcPayloads.id, oidcPayloads.type],
            set: {
                payload: values.payload,
                grantId: values.grantId,
                userCode: values.userCode,
                uid: values.uid,
                expiresAt: values.expiresAt,
            }
        })
    }

    async find(id: string): Promise<OidcPayload | undefined> {
        const [row] = await db.select().from(oidcPayloads).where(and(eq(oidcPayloads.id,id), eq(oidcPayloads.type, this.type as never))).limit(1);
        if(!row){
           return undefined;
        }
        if(row.expiresAt && row.expiresAt.getTime() < Date.now()){
            await this.destroy(id);
            return undefined;
        }
        return row.payload as OidcPayload;
    }

    async findByUserCode(userCode: string): Promise<OidcPayload | undefined> {
    const [row] = await db.select().from(oidcPayloads).where(and(eq(oidcPayloads.userCode,userCode), eq(oidcPayloads.type, this.type as never))).limit(1);
    if(!row){
        return undefined;
    }
    if(row.expiresAt && row.expiresAt.getTime() < Date.now()){
        await this.destroy(row.id)
        return undefined;
    }
    return row.payload as OidcPayload;
}

async findByUid(uid: string): Promise<OidcPayload | undefined> {
    const [row] = await db.select().from(oidcPayloads).where(and(eq(oidcPayloads.uid,uid), eq(oidcPayloads.type, this.type as never))).limit(1);
    if(!row){
        return undefined;
    }
    if(row.expiresAt && row.expiresAt.getTime() < Date.now()){
        await this.destroy(row.id);
        return undefined;
    }
    return row.payload as OidcPayload;
}

    async destroy(id: string): Promise<void> {
        await db.delete(oidcPayloads).where(and(eq(oidcPayloads.id,id),eq(oidcPayloads.type,this.type as never)));
    }

    async revokeByGrantId(grantId: string): Promise<void> {
        await db.delete(oidcPayloads).where(eq(oidcPayloads.grantId,grantId));
    }

    async consume(id: string): Promise<void> {
        const [row] = await db.select().from(oidcPayloads).where(and(eq(oidcPayloads.id,id),eq(oidcPayloads.type, this.type as never))).limit(1);
        if(!row){
            return;
        }
        const payload = {
            ...(row.payload as OidcPayload),
            consumed:true,
            consumedAt: new Date().toISOString(),
        };
        await db.update(oidcPayloads).set({payload}).where(and(eq(oidcPayloads.id,id),eq(oidcPayloads.type,this.type as never)));
    }
}

