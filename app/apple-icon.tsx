import { ImageResponse } from 'next/og'

// Apple touch icon (iOS bookmarks / add-to-home-screen). iOS ignores
// transparency, so the blob sits on the site's ivory background.

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

// Bold Merge palette (kept local — this raster is generated, not themed via CSS)
const BG = '#F7EDE4'
const PEACH = '#DDA688'
const INK = '#241D2E'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: BG,
        }}
      >
        <div
          style={{
            width: 132,
            height: 132,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: PEACH,
            borderRadius: '58% 42% 63% 37% / 41% 56% 44% 59%',
            color: INK,
            fontSize: 62,
            fontWeight: 800,
            letterSpacing: -2,
            fontFamily: 'sans-serif',
          }}
        >
          MA
        </div>
      </div>
    ),
    { ...size }
  )
}
