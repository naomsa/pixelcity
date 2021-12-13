import { BigNumber } from "@ethersproject/bignumber";
import { useEthers } from "@usedapp/core";
import { useState } from "react";

import ClaimButton from "../components/Claim/ClaimButton";
import ClaimForm from "../components/Claim/ClaimForm";

export default function Claim() {
	const { account } = useEthers();

	const [amount, setAmount] = useState<number>(1);
	const [tip, setTip] = useState<BigNumber>(BigNumber.from(0));

	return (
		<section className="py-12 text-secondary" id="claim">
			<div className="flex flex-col w-1/2 mx-auto lg:w-1/2 ">
				<div className="flex flex-col-reverse items-center gap-4 xl:flex-row">
					<div className="col-span-2 text-center">
						<span className="text-4xl font-bold text-secondary">
							Claim yours!
						</span>
						<p className="mt-4 text-lg text-justify">
							You can claim a pixel city token totally for free on the mainnet.
							To proceed, connect your wallet, select your amount between 1 and
							2 and then click <strong>claim</strong>!
						</p>
					</div>
					<img
						alt="Pixel City #4 image from the Rinkeby's contract"
						className="max-w-xs ml-2"
						src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBpZD0icGl4ZWwiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDE2IDE2Ij48aW1hZ2UgeD0iMCIgeT0iMCIgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiBpbWFnZS1yZW5kZXJpbmc9InBpeGVsYXRlZCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQiIHhsaW5rOmhyZWY9ImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQkFBQUFBUUNBWUFBQUFmOC85aEFBQUFBWE5TUjBJQXJzNGM2UUFBQVZWSlJFRlVPRTlkVTFGMnd6QUlFOGRJOTVYMWdJdFBrdXlBVGI2YUhJTTlKSERjOVNOMkFRc1F3aEEvQTh3TmdJTkhHTnpwZ3QxM1JkRExVNUZEd0hLY0NXTXdCOEhpSkY1L0N2ek9FODJKYjNRRzZzOStlZUFSMzAwQWViOXpBdXZ6aTJZenZsTkJTejVldngvTTEvYUxUUkRlZ1kxMlpKeGpuZldmbi9pMi9ReE1PY3pSWHBmSDZhNHVPekR0d0RwUFRLNktpWHg2RldTUmtwNENpSlpFS050MVMwRHh6ektqQmRWVDdNVlZVOUdFQnZvdFdwcVVKMGVCNVhpN0VtZm03SzdtMWNsbERzUDIvQThRSEhEa1dVanl5OHFIVVJacEluR0lGWWtCSVBSVTFJZGsyaEU4cWV4dGZnVEZKSUJ0dCtOS2dKeDlNRE8wTG1YZWhpM0ZWRU1ndyszMUx2MTJ2VEpMc0orRGtTWmloQXJwT3VBc3N2K1NzTkNrNTg0RGpWbTJaQmhpa05vcXVHL0t4OXIwN2RHU1pGQUg0UGkxWGVrZmVxYnc2ODJ3aS9HNldLenR1dlVkaWJUSzQvcjJCdEw0QitLUXlCZ09iTEN2QUFBQUFFbEZUa1N1UW1DQyIvPjxpbWFnZSB4PSIwIiB5PSIwIiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIGltYWdlLXJlbmRlcmluZz0icGl4ZWxhdGVkIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCIgeGxpbms6aHJlZj0iZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFCQUFBQUFRQkFNQUFBRHQzZUpTQUFBQUFYTlNSMElBcnM0YzZRQUFBREJRVEZSRkFBQUFBQUFCQUFFQUFBRUJBUUFBQVFBQkFRRUFBUUVCL3RRVS90UVYvdFVVL3RVVi85UVUvOVFWLzlVVS85VVZLQnd4QVFBQUFBaDBVazVUQUFBQUFBQUFBQUMzNTFLaEFBQUFtRWxFUVZRSTEyTmdjQzF6VkZFUVltSW9VZ2dRRWxWa0ZXUVFFVlJpY0JOeU1HQndUMkZnWUFzUVltUmdFMkJXWUNoTUVHQndZQWhnY21JeVptQmdGVEp5WkdCZ1lHSVFjQXhrWVFCQlY2YUVSQVpWSmhjR0VRWUZRV2NHb0N5bkdHTUNvd3ZEUllhNGd3d3NpVXlha3hoZS9OcHg4dXk4ZVhNWXpuYmNtUEYyYnZjTWhyNzdMM3RmZDg0K3czRGkzZnIrK3l0L3JRY0Fic3dsaGRhUUlERUFBQUFBU1VWT1JLNUNZSUk9Ii8+PGltYWdlIHg9IjAiIHk9IjAiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgaW1hZ2UtcmVuZGVyaW5nPSJwaXhlbGF0ZWQiIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIiB4bGluazpocmVmPSJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUJBQUFBQVFDQVlBQUFBZjgvOWhBQUFBQVhOU1IwSUFyczRjNlFBQUFWeEpSRUZVT0U5ZFV6RlNBekVNbEJyeXBlUUxSODNWOElSQUcyQnlIQzE4SVNrdjErY0xrQytSUW94MlpkbTVGTEhQbGxhclhWbEZSTjR1czZtWW1LaC9pcGlVSFRjbVlwcGJIcG5Kc080VkdlKy9zeUZQR2NtY1FNRzNYOGVwcXFqaFZqNDJDNERkOTVuVkVNNGdsSEIrbXZ4azNIWmdPMndlSE00Wm5HejNkVWJDYWpwZ3ZmYVBXRXN2cStrSXlHdi9CTEJ4ZXkvRHVnRDh6QUR3NEx2cGdQVXZBRURYejA5SFVDT3d5ZWRMSjN2WHdCbStYc2dneTRFN2V3bFpveGRxNDFmamN5ZDcxeUJFcHZvcEZVOGhYd0RWKzVRWTBVdHpFcWlDTmFsSys2Z3IzU0ZENTFGY2k0M0daRlQzR1VjTEs4UGFRdGhGUUhQZHdzOHdGSlBFY1dKWGhycEJoTTZYN3FCTVd3bWZTN1dZRVZtRkVqdkgwR0FJS0NYK2lka0l6Vmd3clJWTHgwMjFiSzFtQXp5YVR3QlhGK21vN2l3Z0JkWXE4STFKMUdCeEZNb0ZWWnBUZjVRMkgxZSszeVI4bzFNelRNMXJwQlkxOEIrZDVjQWtycjg4NUFBQUFBQkpSVTVFcmtKZ2dnPT0iLz48aW1hZ2UgeD0iMCIgeT0iMCIgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiBpbWFnZS1yZW5kZXJpbmc9InBpeGVsYXRlZCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQiIHhsaW5rOmhyZWY9ImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQkFBQUFBUUNBWUFBQUFmOC85aEFBQUFBWE5TUjBJQXJzNGM2UUFBQVN4SlJFRlVPRTlsa3p0NmcwQU1oS1VDNTRTQk11RmtwaVkzaEVLSlJxT0hIUmY0MjlWemZtbFYvdjFVUkV6aUt5S3FJdVpuNVJtM05MbzU3T0lSYW5udjRYNFh6Z2ltRHp5WUl5emgwVms5VVJkNHVZZWxnanQ1RlROR1JsNlRQSmZLNnJJcnVnSW1EV3ZMR0hCUzUreVVab3BJVU1UbmlRZ3FRRktsT2Noc1hkQWhJYkszU1hld2FZRGRWWFRxOVNtQ3dDdC8xWG9qbWlxaUZoS004VTFuNk81UlRxS3hFeTJseHFpbGNib1VyWUFCUGJGZ25nWU1NdnZBVThzUUEzQ2xOcGFwdDNOS1l1WmVwT0NpWXUrekhmTFFBSUNBUld0amw2Z09HTW1uUnBvUWE1ZkIxSzd0QzYwK3prUHZkY2V3bHZOQTJMVisyOGQ1NUk2T1Y4Qk51OWJkSHVjVHRhNXRGeldUNWVlUSszT1g1WHpLdmVHZno1SUxGZ3dIM1Z5Z2x4VjBwM3ppWSs1L3diL0M5Wm9kMEZibUlnQUFBQUJKUlU1RXJrSmdnZz09Ii8+PHN0eWxlPiNwaXhlbHtzaGFwZS1yZW5kZXJpbmc6IGNyaXNwZWRnZXM7IGltYWdlLXJlbmRlcmluZzogLXdlYmtpdC1jcmlzcC1lZGdlczsgaW1hZ2UtcmVuZGVyaW5nOiAtbW96LWNyaXNwLWVkZ2VzOyBpbWFnZS1yZW5kZXJpbmc6IGNyaXNwLWVkZ2VzOyBpbWFnZS1yZW5kZXJpbmc6IHBpeGVsYXRlZDsgLW1zLWludGVycG9sYXRpb24tbW9kZTogbmVhcmVzdC1uZWlnaGJvcjt9PC9zdHlsZT48L3N2Zz4="
					/>
				</div>
				{account ? (
					<div className="flex flex-col col-span-3 gap-4 mt-8 text-center">
						<ClaimForm
							amount={amount}
							setAmount={setAmount}
							tip={tip}
							setTip={setTip}
						/>
						<ClaimButton amount={amount} tip={tip} />
					</div>
				) : (
					<span>Please connect to metamask</span>
				)}
			</div>
		</section>
	);
}
