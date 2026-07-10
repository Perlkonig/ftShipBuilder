export const readJsonStorage = <T>(key: string, fallback: T): T => {
    try {
        const raw = localStorage.getItem(key);
        if (raw === null) {
            return fallback;
        }
        return JSON.parse(raw) as T;
    } catch {
        return fallback;
    }
};

export const writeJsonStorage = (key: string, value: unknown): void => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch {
        // Unavailable or quota exceeded — ignore
    }
};
