type AnyObject = Record<string, unknown>;

type JsonValue =
    | string
    | number
    | boolean
    | null
    | undefined
    | JsonValue[]
    | { [key: string]: JsonValue };

/**
 * Replaces all undefined values with null in an object 
 * @returns the sanitized object
 */
export const sanitizeObject = <T extends AnyObject>(
    obj: T
): { [K in keyof T]: T[K] | null } => {
    return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [
            key,
            value === undefined ? null : value,
        ])
    ) as { [K in keyof T]: T[K] | null };
};


/**
* Replaces all undefined values with null in an object with nested values 
* @returns the sanitized object
*/
export const sanitizeDeep = <T extends JsonValue>(value: T): T => {
    if (Array.isArray(value)) {
        return value.map(sanitizeDeep) as T;
    }

    if (value && typeof value === "object") {
        return Object.fromEntries(
            Object.entries(value).map(([key, val]) => [
                key,
                val === undefined ? null : sanitizeDeep(val),
            ])
        ) as T;
    }

    return value === undefined ? (null as T) : value;
};