export function copy<T>(obj: T): T {
    const json: string = JSON.stringify(obj);
    return JSON.parse(json) as T;
}

export function mixed<T, U>(objA: T, objB: U): T & U {
    const a = copy(objA);
    const b = copy(objB);
    const union: T & U = a as any;
    for (const attr in b) {
        if (b.hasOwnProperty(attr)) {
            (union as any)[attr] = b[attr];
        }
    }
    return union;
}

export function mixedSameType<T>(objA: T, objB: T): T {
    const a = copy(objA);
    const b = copy(objB);
    const union = a;
    for (const attr in b) {
        if (typeof b[attr] === "object" && a[attr]) {
            union[attr] = mixed(a[attr], b[attr]);
        } else {
            union[attr] = b[attr];
        }
    }
    return union;
}
