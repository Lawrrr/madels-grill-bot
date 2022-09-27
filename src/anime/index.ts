const { SATOU_API } = process.env;
const axios = require('axios').default;
import { CommandPayload } from '../utils/interface';

export default function (command: CommandPayload, message: any) {
  axios.get(`${SATOU_API}${command.action}`)
  .then((response: any) => {
    message.reply(`${response.data.url} \n${message.author}`);
  })
  .catch((error: Error) => {
    console.error('Error: ', error);
  })
}
