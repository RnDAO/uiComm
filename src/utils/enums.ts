export enum PlatformStatus {
  InProgress = 'inProgress',
  Completed = 'completed',
  Error = 'error',
}

export enum IntegrationPlatform {
  Discord = 'Discord',
  Twitter = 'Twitter',
  Discourse = 'Discourse',
  Telegram = 'Telegram',
  Snapshot = 'Snapshot',
}

export enum StatusCode {
  DISCORD_AUTHORIZATION_SUCCESSFUL_FIRST_TIME = '1001',
  REPEATED_DISCORD_AUTHORIZATION_ATTEMPT = '1002',
  DISCORD_AUTHORIZATION_FROM_SETTINGS = '1003',
  DISCORD_AUTHORIZATION_FAILURE = '1004',
}
