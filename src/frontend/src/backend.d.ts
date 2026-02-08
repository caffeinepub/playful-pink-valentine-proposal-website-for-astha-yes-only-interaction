import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface AcceptanceRecord {
    note?: string;
    timestamp: Time;
}
export type Time = bigint;
export interface backendInterface {
    getAcceptanceCount(): Promise<bigint>;
    getLatestRecord(): Promise<AcceptanceRecord>;
    recordAcceptance(note: string | null): Promise<void>;
}
