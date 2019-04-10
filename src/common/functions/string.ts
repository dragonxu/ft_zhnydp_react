export function lowerCaseFirst(str: string) {
    const firstLetter = str[0];
    return str.replace(firstLetter, firstLetter.toLowerCase());
}

export function camelCaseToLine(str: string, line: "-" | "_" = "-") {
    const clsName = lowerCaseFirst(str);
    return clsName.replace(/([A-Z])/g, line + "$1").toLowerCase();
}
