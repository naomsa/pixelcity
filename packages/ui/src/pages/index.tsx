import About from "../containers/About";
import Team from "../containers/Team";
import Claim from "../containers/Claim";
import Balance from "../containers/Balance";

export default function Home() {
	return (
		<>
			<About />
			<Claim />
			<Balance />
			<Team />
		</>
	);
}
