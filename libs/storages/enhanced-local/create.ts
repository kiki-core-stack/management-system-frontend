import {
    deserialize,
    serialize,
} from 'superjson';

enum EnhancedLocalStorageValueEncodingType {
    Json = '0',
    String = '1',
}

const customValueHeader = '​⁠';
const customValueHeaderLength = customValueHeader.length + 1;

export function createEnhancedLocalStorage() {
    return {
        getItem<T>(key: string) {
            const rawValue = window.localStorage.getItem(key);
            return rawValue ? decodeStorageValue(rawValue) as T : null;
        },
        hasItem: (key: string) => window.localStorage.getItem(key) !== null,
        removeItem: (key: string) => window.localStorage.removeItem(key),
        setItem: (key: string, value: any) => window.localStorage.setItem(key, encodeToStorageValue(value)),
    };
}

function encodeToStorageValue(value: any) {
    if (typeof value === 'string') return toCustomValue(EnhancedLocalStorageValueEncodingType.String, value);
    return toCustomValue(EnhancedLocalStorageValueEncodingType.Json, JSON.stringify(serialize(value)));
}

function decodeStorageValue(data: string) {
    if (!isCustomFormat(data)) return data;
    const payload = data.substring(customValueHeaderLength);
    const type = data.charAt(customValueHeader.length);
    switch (type) {
        case EnhancedLocalStorageValueEncodingType.Json:
            try {
                return deserialize(JSON.parse(payload.toString()));
            } catch {
                throw new Error('[EnhancedLocalStorage] Failed to parse JSON payload.');
            }
        case EnhancedLocalStorageValueEncodingType.String: return payload;
        default:
            throw new Error(`[EnhancedLocalStorage] Unknown encoding type: ${type}.`);
    }
}

function isCustomFormat(data: string) {
    return (
        data.length >= customValueHeaderLength
        && data[0] === customValueHeader[0]
        && data[1] === customValueHeader[1]
    );
}

function toCustomValue(type: EnhancedLocalStorageValueEncodingType, payload: string) {
    return `${customValueHeader}${type}${payload}`;
}
