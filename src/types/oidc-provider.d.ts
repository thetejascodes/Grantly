declare module 'oidc-provider' {
  export interface Adapter {
    upsert(id: string, payload: Record<string, unknown>, expiresIn?: number): Promise<void>;
    find(id: string): Promise<Record<string, unknown> | undefined>;
    findByUserCode(userCode: string): Promise<Record<string, unknown> | undefined>;
    findByUid(uid: string): Promise<Record<string, unknown> | undefined>;
    destroy(id: string): Promise<void>;
    revokeByGrantId(grantId: string): Promise<void>;
    consume(id: string): Promise<void>;
  }
}
