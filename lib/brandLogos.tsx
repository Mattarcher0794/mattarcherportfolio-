import type { ReactNode } from 'react'

/**
 * Slugify a brand's display name to look up its logo below. Keep the keys in
 * `brandLogos` in sync with what this produces, e.g. "British Airways" ->
 * "british-airways", "McDonalds HQ" -> "mcdonalds-hq".
 */
export function brandSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Inline, single-colour brand logos for the "Good company" grid.
 *
 * Each SVG uses `fill="currentColor"` so it inherits the logo cell's ink colour
 * and flips to the surface colour on the moss hover, matching the rest of the
 * grid. Any brand NOT listed here falls back to its styled text name in
 * Logos.tsx, so the section always renders cleanly while logos are gathered.
 *
 * To add a brand:
 *   1. Get an OFFICIAL monochrome SVG (single colour, ideally the wordmark).
 *   2. Strip any hardcoded `fill`; set `fill="currentColor"` on the path(s).
 *   3. Keep the SVG's own `viewBox`; add a keyed entry using brandSlug(name).
 *
 * The two entries below are Simple Icons symbol-marks (CC0), wired only to prove
 * the pipeline. Replace them with the official wordmarks when supplied.
 */
export const brandLogos: Record<string, ReactNode> = {
  'mcdonalds-hq': (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M17.243 3.006c2.066 0 3.742 8.714 3.742 19.478H24c0-11.588-3.042-20.968-6.766-20.968-2.127 0-4.007 2.81-5.248 7.227-1.241-4.416-3.121-7.227-5.231-7.227C3.031 1.516 0 10.888 0 22.476h3.014c0-10.763 1.658-19.47 3.724-19.47 2.066 0 3.741 8.05 3.741 17.98h2.997c0-9.93 1.684-17.98 3.75-17.98Z"
      />
    </svg>
  ),
  'british-airways': (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M23.489 13.252c-.25.212-.605.444-1.241.767-1.347.72-2.198.983-2.198.983s-1.617-.234-4.207-1.007c0 0 1.306-.378 1.93-.581a40.11 40.11 0 0 0 1.958-.681c1.055-.396 1.73-.761 2.18-1.088.03-.022.058-.046.085-.068 0 0 .32.036.593.113.294.083.604.245.786.386.191.147.28.308.308.358a.681.681 0 0 1 .071.226s.014.085-.003.177a.579.579 0 0 1-.147.313zM24 12.196a.662.662 0 0 0-.08-.157 1.348 1.348 0 0 0-.197-.23 1.685 1.685 0 0 0-.227-.178c-.354-.232-.81-.362-1.215-.416-.627-.083-1.342-.07-1.411-.07-.23-.005-1.722.007-2.105.015-1.702.034-3.787.039-4.333.038-5.636.027-8.089-.094-10.82-.642C1.289 10.094 0 9.658 0 9.658c2.05-.073 14.004-.568 16.186-.627 1.427-.04 2.44-.048 3.253 0 .413.023.802.058 1.287.14a6.2 6.2 0 0 1 1.064.286c.486.18.893.442 1.096.707 0 0 .06.06.14.17.093.126.197.282.234.34.294.447.434.73.484.828.052.102.1.209.145.315.044.104.063.166.076.21.02.064.03.125.035.17Z"
      />
    </svg>
  ),
}
