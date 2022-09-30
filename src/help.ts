import Serialize from './utils/serialize';

const getKeys = (keys: Object) => {
  return Object.keys(keys);
};

export default function (message: any) {
  const anime = Serialize('anime');
  const animeKeys = getKeys(anime.action);

  message.channel.send(
`These are my supported commands:

**?madel help** - Displays help
**?madel anime <action>** - Displays anime gif

**Anime Actions**\n\`${animeKeys.join(', ')}\`
`
  )
}