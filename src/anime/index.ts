const { SATOU_API } = process.env;
const axios = require('axios').default;
import { CommandPayload } from '../utils/interface';
import Serialize from '../utils/serialize';

export default function (command: CommandPayload, message: any) {
  const actions = Serialize(command.service);
  const verb = command.action != undefined ? actions.action[command.action as keyof typeof command] : '';

  axios.get(`${SATOU_API}${command.action}`)
  .then((response: any) => {
    if(!verb) {
      message.reply(`Action **${command.action}** not found.`);
    } else {
      message.reply(`${message.author} ${verb} ${command.targetUser}\n\n${response.data.url}`);
    }
  })
  .catch((error: Error) => {
    console.error('Error: ', error);
  })
}
