import usePixelTokens from "../hooks/usePixelTokens";

export default function Balance() {
	const tokens = usePixelTokens();

	return (
		<section
			id="balance"
			className="flex flex-col items-center gap-12 py-12 bg-primary"
		>
			<span className="text-4xl font-bold ">Your Pixels</span>
			{tokens.length ? (
				<div className="grid grid-cols-1 gap-8 lg:grid-cols-6">
					{tokens.map((token, index) => (
						<div
							key={index}
							className="flex flex-col gap-2 p-2 text-center text-white bg-black bg-opacity-75 border-2 border-black"
						>
							<img src={token.image} />
							<strong>{token.name}</strong>
						</div>
					))}
				</div>
			) : (
				<span>You don't have any Pixel yet. Just claim one.</span>
			)}
		</section>
	);
}
