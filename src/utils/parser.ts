import * as z from "zod";

/**
 * Safe parses a json string. 
 * @param json 
 * @param schema 
 * @param fallback 
 * @returns 
 */
export const safeParser = <T>(json: string | null, fallback: T): T => {
    if (!json) return fallback;

    try {
        return JSON.parse(json);
    } catch {
        return fallback;
    }
}

/**
 * Safe parses a json string. The function matches the json string up against the provide zod schema and return the fallback if it fails. 
 * @param json 
 * @param schema 
 * @param fallback 
 * @returns 
 */
export const safeParserZod = <T>(json: string | null, schema: z.ZodType<T>, fallback: T): T => {
    if (!json) return fallback;

    try {
        return schema.parse(JSON.parse(json));
    } catch {
        return fallback;
    }
}