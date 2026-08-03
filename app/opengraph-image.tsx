import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Top-Notch Garage Doors — Professional Garage Door Services in the Piedmont Triad';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #1B3A5C 0%, #0f2540 60%, #0a1a2e 100%)',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
        }}
      >
        {/* Subtle grid pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Red accent bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background: '#C41E24',
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 20,
          }}
        >
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              color: 'white',
              letterSpacing: '4px',
              textTransform: 'uppercase' as const,
              textAlign: 'center' as const,
              lineHeight: 1.1,
              display: 'flex',
            }}
          >
            TOP-NOTCH
          </div>
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              color: '#C41E24',
              letterSpacing: '4px',
              textTransform: 'uppercase' as const,
              display: 'flex',
            }}
          >
            GARAGE DOORS
          </div>

          {/* Divider */}
          <div
            style={{
              width: 80,
              height: 3,
              background: '#C9A94E',
              marginTop: 8,
              marginBottom: 8,
              display: 'flex',
            }}
          />

          <div
            style={{
              fontSize: 22,
              color: 'rgba(255,255,255,0.7)',
              letterSpacing: '3px',
              textTransform: 'uppercase' as const,
              display: 'flex',
            }}
          >
            Piedmont Triad, North Carolina
          </div>

          <div
            style={{
              fontSize: 16,
              color: 'rgba(255,255,255,0.4)',
              letterSpacing: '2px',
              textTransform: 'uppercase' as const,
              marginTop: 4,
              display: 'flex',
            }}
          >
            Repair &bull; Installation &bull; Maintenance &bull; Screen Doors
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 4,
            background: '#C9A94E',
          }}
        />
      </div>
    ),
    { ...size },
  );
}
