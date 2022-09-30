export default function (prefix: string, client: any) {
  client.user.setPresence({
    activities: [{
      name: `"${prefix} help" for help`
    }],
    status: 'online'
  });
}
