/**
 * Returns enumeration key by search value.
 * @template T - Enumeration.
 * @param {T} enumeration - Enumeration in which to search for key.
 * @param {any} searchValue - Enumeration value to search key for.
 * @returns {null | string} - Key label or null - if key was not found.
 * */
export function getKeyByValue<T extends object>(enumeration: T, searchValue: any): null | keyof T {
	for (const [key, value] of Object.entries(enumeration)) {
		if (value === searchValue) {
			return key as keyof T
		}
	}

	return null
}
