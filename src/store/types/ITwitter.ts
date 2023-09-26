export default interface ITwitter {
  authorizeTwitter: (token: string) => void;
  disconnectTwitter: () => void;
  refreshTwitterMetrics: (username: string) => void;
  twitterActivityAccount: (twitterId: string) => void;
  twitterAudienceAccount: (twitterId: string) => void;
  twitterEngagementAccount: (twitterId: string) => void;
}
