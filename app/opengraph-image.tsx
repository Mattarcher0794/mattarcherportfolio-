import { ImageResponse } from 'next/og'

export const alt = 'Matt Archer · Principal Product Manager'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Bold Merge palette (kept local — this raster is generated, not themed via CSS)
const BG = '#F7EDE4'
const INK = '#241D2E'
const TERRACOTTA = '#B5654A'
const MOSS = '#6B7A4F'
const PEACH = '#DDA688'
const INK_MUTE = '#9C7E62'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: BG,
          padding: '72px 80px',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Decorative blob */}
        <div
          style={{
            position: 'absolute',
            top: 90,
            right: 110,
            width: 220,
            height: 220,
            background: PEACH,
            borderRadius: '58% 42% 63% 37% / 41% 56% 44% 59%',
          }}
        />
        <div
          style={{
            display: 'flex',
            fontSize: 24,
            letterSpacing: 4,
            textTransform: 'uppercase',
            color: TERRACOTTA,
            fontWeight: 700,
          }}
        >
          Principal Product Manager
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              fontSize: 148,
              fontWeight: 800,
              letterSpacing: -4,
              lineHeight: 1,
              color: INK,
            }}
          >
            MATT&nbsp;<span style={{ color: TERRACOTTA }}>ARCHER.</span>
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: 28,
              fontSize: 30,
              color: INK_MUTE,
              maxWidth: 820,
            }}
          >
            Product leadership across B2C and B2B, at scale, from zero-to-one apps to
            enterprise AI.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            fontSize: 24,
            color: MOSS,
            fontWeight: 700,
          }}
        >
          <div
            style={{
              width: 16,
              height: 16,
              background: MOSS,
              borderRadius: '58% 42% 63% 37% / 41% 56% 44% 59%',
            }}
          />
          mattarcher.me
        </div>
      </div>
    ),
    size
  )
}
