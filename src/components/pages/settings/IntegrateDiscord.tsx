import React from "react";
import ConnectCommunities from "./ConnectCommunities";
import ConnectedCommunitiesList from "./ConnectedCommunitiesList";

export default function IntegrateDiscord() {
  return (
    <div className="flex flex-col md:flex-row md:space-x-10">
      <ConnectedCommunitiesList />
      <ConnectCommunities />
    </div>
  );
}
