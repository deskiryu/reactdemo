export function getEnumKeyByValue(enumObj, value) {
  for (const key of Object.keys(enumObj)) {
    if (enumObj[key] === Number(value)) {
      return key;
    }
  }
  return String(value);
}
