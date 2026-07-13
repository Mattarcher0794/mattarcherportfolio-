import { ImageResponse } from 'next/og'

// Browser-tab favicon: the "MA" blob monogram on a transparent canvas, so only
// the organic blob shows in the tab (no square tile). Generated as a PNG via
// next/og — same technique as opengraph-image.tsx.

export const size = { width: 256, height: 256 }
export const contentType = 'image/png'

// Bold Merge palette (kept local — this raster is generated, not themed via CSS)
const PEACH = '#DDA688'
const INK = '#241D2E'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'transparent',
        }}
      >
        <div
          style={{
            width: 224,
            height: 224,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: PEACH,
            borderRadius: '58% 42% 63% 37% / 41% 56% 44% 59%',
            color: INK,
            fontSize: 104,
            fontWeight: 800,
            letterSpacing: -4,
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
