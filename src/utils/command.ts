import { CommandPayload } from './interface';

export default function (message: string) {
  const args = message.split(' ');
  const command: CommandPayload = {
    prefix: args[0],
    service: args[1],
    action: args[2],
    targetUser: args[3] ? args[3] : ''
  };

  return command;
}