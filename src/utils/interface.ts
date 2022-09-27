export interface CommandPayload {
  prefix: string,
  service: string,
  action?: string,
  targetUser?: string,
}
