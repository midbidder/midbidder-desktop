
/** Useful for resolving valid (!) typescript warnings. */
export function keyInObject(key: string, obj: object): boolean {
    return key in obj;
}