import { before } from '@patcher';
import { getByProps } from '@webpack';
import getEmojiLinks from '../getLinks';
import manifest from '../manifest.json';

const regex = /<a?:(\w+):(\d+)>/i;

export default () => {
  const sendMessagePatch = before(
    manifest.name,
    getByProps('sendMessage'),
    'sendMessage',
    (_, args) => {
      if (args[1].content.match(regex)) {
        args[1] = getEmojiLinks(64, args[1]);
        return args;
      }
    },
  );

  const sendMessageAttachmentPatch = before(
    manifest.name,
    getByProps('uploadFiles'),
    'uploadFiles',
    (_, args) => {
      if (args[3].content.match(regex)) {
        args[3] = getEmojiLinks(64, args[3]);
        return args;
      }
    },
  );

  return () => {
    sendMessagePatch();
    sendMessageAttachmentPatch();
  };
};
