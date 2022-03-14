import { getByProps } from '@webpack';

const { getCustomEmojiById } = getByProps('getCustomEmojiById');
const { getLastSelectedGuildId } = getByProps('getLastSelectedGuildId');

function extractNonUsableEmojis(messageString: string, size: number) {
  const emojiStrings = messageString.matchAll(/<a?:(\w+):(\d+)>/gi);
  const emojiUrls = [];
  for (const emojiString of emojiStrings) {
    const emoji = getCustomEmojiById(emojiString[2]);
    // eslint-disable-next-line eqeqeq
    if (emoji.guildId != getLastSelectedGuildId() || emoji.animated || isInDms()) {
      messageString = messageString.replace(emojiString[0], '');
      emojiUrls.push(`${emoji.url.split('?')[0]}?size=${size}&quality=lossless`);
    }
  }
  return { content: messageString.trim(), emojis: emojiUrls };
}

//returns true if the home button is selected
function isInDms() {
  return document
    .querySelector('[data-list-item-id="guildsnav___home"]')
    .classList.contains('selected-bZ3Lue');
}

function getEmojiLinks(size: number, msgArg: { content: string; invalidEmojis: string[] }) {
  const processedData = extractNonUsableEmojis(msgArg.content, size);

  msgArg.content = processedData.content;
  if (processedData.emojis.length > 0) msgArg.content += `\n${processedData.emojis.join('\n')}`;

  msgArg.invalidEmojis = [];

  return msgArg;
}

export default getEmojiLinks;
