export default interface ITwitter {
  authorizeTwitter: (discordId: string) => void;
  disconnectTwitter: () => void;
  refreshTwitterMetrics: () => void;
  twitterActivityAccount: () => void;
  twitterAudienceAccount: () => void;
  twitterEngagementAccount: () => void;
  twitterAccount: () => void;
}
