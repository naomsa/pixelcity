import Link from "next/link";

export default function NavbarLinks() {
	return (
		<div className="flex gap-6">
			<Link href="#claim">
				<a>Claim</a>
			</Link>
			<Link href="#about">
				<a>About</a>
			</Link>
		</div>
	);
}
