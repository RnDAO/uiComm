type SelectedSubChannels = {
  [channelId: string]: {
    [subChannelId: string]: boolean;
  };
};

export default function updateTrueIDs(
  selectedSubChannels: SelectedSubChannels,
  currentTrueIDs: Set<string> = new Set()
): string[] {
  // Iterate over each channel
  Object.keys(selectedSubChannels).forEach((channelId) => {
    const subChannels = selectedSubChannels[channelId];

    // Iterate over each sub-channel
    Object.keys(subChannels).forEach((subChannelId) => {
      if (subChannels[subChannelId]) {
        // If the value is true, add the sub-channel ID to the set
        currentTrueIDs.add(subChannelId);
      } else {
        // If the value is false and the ID is in the set, remove it
        currentTrueIDs.delete(subChannelId);
      }
    });
  });

  // Convert the Set to an Array before returning
  return Array.from(currentTrueIDs);
}
