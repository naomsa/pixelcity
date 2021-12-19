export default function Footer() {
	return (
		<footer className="flex flex-col items-center justify-center p-2 text-sm lg:flex-row lg:gap-4">
			<div className="text-gray-300">
				<strong className="inline">Pixel City ©️ Creative Commons</strong>
				<span className="hidden sm:inline"> - 2021</span>
			</div>
			<span className="text-xs text-gray-400">Made by aliens, for Orcs</span>
		</footer>
	);
}
