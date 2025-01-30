import React from "react";
import { LoginButton } from "@telegram-auth/react";

import { conf } from "@/configs";

import TcBoxContainer from "../../components/shared/TcBox/TcBoxContainer";
import TcButton from "../../components/shared/TcButton";
import TcText from "../../components/shared/TcText";
import centricLayout from "../../layouts/centricLayout";
import useAppStore from "../../store/useStore";

function Index() {
  console.log(conf.TELEGRAM_BOT_USERNAME );
  
	const { discordAuthorization } = useAppStore();
	return (
		<div>
			<TcBoxContainer
				bgcolor="white"
				className="rounded py-12 px-4 md:min-h-[37.5rem] md:p-12"
				contentContainerChildren={
					<div className="space-y-8 py-12">
						<TcText
							sx={{ typography: { xs: "h5", md: "h4" } }}
							color="initial"
							fontWeight="bold"
							text="Log in"
						/>
						<div className="block">
							<TcButton
								text="Log in with Discord"
								sx={{ width: "15rem", padding: "0.5rem" }}
								variant="contained"
								onClick={() => discordAuthorization()}
							/>
							<LoginButton
								botUsername={conf.TELEGRAM_BOT_USERNAME as string}
								authCallbackUrl={`${conf.API_BASE_URL}/api/v1/auth/telegram/authorize/callback`}
								buttonSize="large" // "large" | "medium" | "small"
								cornerRadius={5} // 0 - 20
								showAvatar={true} // true | false
								lang="en"
							/>
						</div>
						<TcText
							variant="body1"
							color="initial"
							text="More log-in options Coming soon."
						/>
					</div>
				}
			/>
		</div>
	);
}

Index.pageLayout = centricLayout;

export default Index;
