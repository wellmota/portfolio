import React from 'react';
import { Composition, Folder, Still } from 'remotion';
import { CuidaMe, type CuidaMeProps } from './CuidaMe';
import { Storyboard } from './Storyboard';
import { Cover } from './Cover';
import { Shot, type ShotProps } from './Shot';
import { FPS, HEIGHT, WIDTH, type Variant } from './theme';
import { totalFrames } from './timeline';
import { TEASER_FRAMES, TutoryTeaser } from './tutory/TutoryTeaser';
import { FPS as TFPS, H as TH, W as TW } from './tutory/theme';

const variants: Variant[] = ['editorial', 'product', 'kinetic'];
const cap = (s: string) => s[0].toUpperCase() + s.slice(1);

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="Tutory">
        <Composition id="Tutory-Teaser" component={TutoryTeaser} durationInFrames={TEASER_FRAMES} fps={TFPS} width={TW} height={TH} />
      </Folder>
      <Folder name="CuidaMe">
        {variants.map((variant) => (
          <Composition
            key={variant}
            id={`CuidaMe-${cap(variant)}`}
            component={CuidaMe}
            durationInFrames={totalFrames(variant)}
            fps={FPS}
            width={WIDTH}
            height={HEIGHT}
            defaultProps={{ variant } satisfies CuidaMeProps}
          />
        ))}
      </Folder>
      <Folder name="Storyboards">
        {variants.map((variant) => (
          <Still key={variant} id={`Storyboard-${cap(variant)}`} component={Storyboard} width={WIDTH} height={HEIGHT} defaultProps={{ variant }} />
        ))}
      </Folder>
      <Still id="Cover" component={Cover} width={2400} height={2000} />
      <Folder name="Shots">
        <Still id="Shot-PT" component={Shot} width={1920} height={1200} defaultProps={{ lang: 'pt' } satisfies ShotProps} />
        <Still id="Shot-EN" component={Shot} width={1920} height={1200} defaultProps={{ lang: 'en' } satisfies ShotProps} />
      </Folder>
    </>
  );
};
