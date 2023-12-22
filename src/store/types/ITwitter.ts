export default interface ITwitter {
  isLoading: boolean;
  authorizeTwitter: (discordId: string) => void;
  disconnectTwitter: () => void;
  refreshTwitterMetrics: () => void;
  twitterActivityAccount: () => void;
  twitterAudienceAccount: () => void;
  twitterEngagementAccount: () => void;
  twitterAccount: () => void;
}
