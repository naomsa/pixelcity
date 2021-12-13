import { useState } from "react";
import { shortenAddress, useEthers } from "@usedapp/core";

export default function NavbarButton() {
	const { account, activateBrowserWallet, deactivate } = useEthers();

	const [walletError, setWalletError] = useState<boolean>(false);

	const activate = () => {
		// Start by removing errors.
		setWalletError(false);

		activateBrowserWallet(() => {
			// When connection failed:
			deactivate();
			setWalletError(true);
		});
	};

	return (
		<button onClick={account ? () => deactivate() : () => activate()}>
			{account
				? shortenAddress(account)
				: walletError
				? "Invalid Network"
				: "Connect"}
		</button>
	);
}
