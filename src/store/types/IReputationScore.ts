export interface IReputationScore {
  reputationScore: number | null;
  retrieveReputationScore: (args: {
    address: string;
    tokenId: string;
  }) => Promise<number | null>;
}
