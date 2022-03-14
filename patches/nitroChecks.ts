import { instead } from '@patcher';
import { getByProps } from '@webpack';
import manifest from '../manifest.json';

export default () => {
  const cuee = getByProps('canUseEmojisEverywhere');

  const serverCheck = instead(manifest.name, cuee, 'canUseEmojisEverywhere', () => true);

  const animatedCheck = instead(manifest.name, cuee, 'canUseAnimatedEmojis', () => true);

  return () => {
    serverCheck();
    animatedCheck();
  };
};
