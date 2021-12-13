import NavbarLogo from "../components/Navbar/NavbarLogo";
import NavbarButton from "../components/Navbar/NavbarButton";
import NavbarLinks from "../components/Navbar/NavbarLinks";

export default function Navbar() {
	return (
		<nav className="flex items-center justify-center py-6 text-lg font-bold text-primary">
			<div className="flex flex-col items-center justify-between w-screen max-w-screen-sm gap-2 sm:gap-6 sm:flex-row">
				<NavbarLogo />
				<NavbarLinks />
				<NavbarButton />
			</div>
		</nav>
	);
}
