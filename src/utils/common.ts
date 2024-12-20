export const returnArray = (arg: any) => (Array.isArray(arg) ? arg : []);

/**
 * Retrieves the value of a specified cookie.
 * 
 * @param cookieName - The name of the cookie to retrieve.
 * @returns The value of the cookie, or `null` if the cookie does not exist.
 */
 export const getCookieValue = (cookieName: string): string | null => {
    const cookies = document.cookie.split('; ');
    const cookie = cookies.find(row => row.startsWith(`${cookieName}=`));
    return cookie ? decodeURIComponent(cookie.split('=')[1]) : null;
}