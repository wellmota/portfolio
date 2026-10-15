import { Config } from '@remotion/cli/config';

// A chrome-headless-shell baixada pelo Remotion (Chromium 157) trava no macOS 26.5;
// o Google Chrome instalado renderiza normalmente.
Config.setBrowserExecutable('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome');
Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);
Config.setPixelFormat('yuv420p');
Config.setCodec('h264');
