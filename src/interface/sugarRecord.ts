import { DietType } from "./diet";

export interface SugarRecordType {
    id?: number;
    diet?: DietType;
    time: string;
    level: number;
    timeline: number;
    range: number;
}