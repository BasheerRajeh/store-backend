/* eslint-disable security/detect-object-injection */
import { useMediaQuery } from 'react-responsive'

/**
 * ScreenSizes is an enumeration of predefined screen size values in rems.
 * These values can be used in responsive web design to define breakpoints
 * for different screen sizes, making it easier to create responsive layouts.
 */
const ScreenSizes = Object.freeze({
    /**
     * Extra small screen size (XS) at 20rem.
     */
    XS: '20rem',

    /**
     * Small screen size (SM) at 24rem.
     */
    SM: '24rem',

    /**
     * Medium screen size (MD) at 28rem.
     */
    MD: '28rem',

    /**
     * Large screen size (LG) at 32rem.
     */
    LG: '32rem',

    /**
     * Extra large screen size (XL) at 36rem.
     */
    XL: '36rem',

    /**
     * Extra large screen size (XL2) at 42rem.
     */
    XL2: '42rem',

    /**
     * Extra large screen size (XL3) at 48rem.
     */
    XL3: '48rem',

    /**
     * Extra large screen size (XL4) at 56rem.
     */
    XL4: '56rem',

    /**
     * Extra large screen size (XL5) at 64rem.
     */
    XL5: '64rem',

    /**
     * Extra large screen size (XL6) at 72rem.
     */
    XL6: '72rem',

    /**
     * Extra large screen size (XL7) at 80rem.
     */
    XL7: '80rem',
} as const)

/**
 * `useResponsive` is a custom React hook that facilitates responsive web design by
 * simplifying the creation of media query hooks based on screen size ranges.
 *
 * @param {'UP' | 'DOWN' | 'BETWEEN'} query - Specifies the type of media query:
 *   - 'UP': Matches screens with a minimum width of the specified size.
 *   - 'DOWN': Matches screens with a maximum width of the specified size or the entire viewport if `end` is null.
 *   - 'BETWEEN': Matches screens within the range of `start` and `end`.
 * @param {keyof typeof ScreenSizes} start - The starting screen size key to define the lower boundary of the media query.
 * @param {keyof typeof ScreenSizes | null} [end=null] - The ending screen size key to define the upper boundary of the media query for 'BETWEEN' queries. It can be null for 'UP' and 'DOWN' queries.
 *
 * @returns {boolean} - A boolean value indicating whether the current viewport matches the specified media query.
 *
 * @example
 * const isSmallScreen = useResponsive('DOWN', 'XS');
 * // This will return true if the screen width is less than or equal to the 'XS' screen size.
 *
 * const isMediumScreen = useResponsive('BETWEEN', 'SM', 'MD');
 * // This will return true if the screen width falls between the 'SM' and 'MD' screen sizes (inclusive).
 *
 * @see ScreenSizes - An object that defines predefined screen size keys and their respective CSS values in rems.
 * @see useMediaQuery - The underlying hook used to check media queries based on the generated `buildQuery`.
 */
export default function useResponsive(
    query: 'UP' | 'DOWN' | 'BETWEEN',
    start: keyof typeof ScreenSizes,
    end: keyof typeof ScreenSizes | null = null,
) {
    let buildQuery = '(max-width: 100vw)'

    buildQuery =
        query === 'BETWEEN'
            ? `(min-width: ${ScreenSizes[start]}) and (max-width: ${
                  end ? ScreenSizes[end] : '100vw'
              })`
            : buildQuery
    buildQuery =
        query === 'UP' ? `(min-width: ${ScreenSizes[start]})` : buildQuery
    buildQuery =
        query === 'DOWN'
            ? `(max-width: ${end ? ScreenSizes[end] : '100vw'})`
            : buildQuery

    return useMediaQuery({ query: buildQuery })
}
