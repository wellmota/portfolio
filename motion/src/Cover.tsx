import React from 'react';
import { AbsoluteFill, Img, staticFile } from 'remotion';
import { VARIANTS, cuidame } from './theme';
import { Kicker, Display, Body } from './components/Type';
import { Phone } from './components/Phone';

// Capa do case (2400x2000) com os prints reais, no lugar do mockup anterior.
export const Cover: React.FC = () => {
  const v = { ...VARIANTS.editorial, bezel: 'device' as const };
  return (
    <AbsoluteFill style={{ background: 'radial-gradient(120% 90% at 70% 40%, #1b2d21 0%, #101c15 55%, #0a0f0b 100%)' }}>
      <div style={{ position: 'absolute', left: 180, top: 0, bottom: 0, width: 800, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div style={{ width: 14, height: 14, borderRadius: 7, background: cuidame.gold }} />
          <Kicker v={v} style={{ color: cuidame.gold, fontSize: 28 }}>
            Case study · App mobile
          </Kicker>
        </div>
        <div style={{ marginTop: 34 }}>
          <Display v={v} size={196}>
            CuidaMe
          </Display>
        </div>
        <div style={{ marginTop: 44, maxWidth: 640 }}>
          <Body v={v} size={48} muted style={{ color: '#c9ccc4' }}>
            O prontuário compartilhado da família, redesenhado.
          </Body>
        </div>
        <div style={{ marginTop: 90, display: 'flex', alignItems: 'center', gap: 26 }}>
          <Img src={staticFile('brand/altevita-symbol.png')} style={{ width: 96, height: 96 }} />
          <div>
            <Body v={v} size={38} style={{ fontWeight: 700 }}>
              CuidaMe
            </Body>
            <Kicker v={v} style={{ marginTop: 8, fontSize: 20 }}>
              Altevita · Gestor de Saúde
            </Kicker>
          </div>
        </div>
      </div>
      <div style={{ position: 'absolute', left: 1120, top: 360, transform: 'rotate(-8deg)' }}>
        <Phone src="02-home.png" height={1500} v={v} />
      </div>
      <div style={{ position: 'absolute', left: 1560, top: 170, transform: 'rotate(6deg)' }}>
        <Phone src="09-gastos.png" height={1500} v={v} />
      </div>
    </AbsoluteFill>
  );
};
