import { Link } from "react-router-dom";
import "../styles/Home.scss";
const Home = () => {
	return (
		<div className="home">
			<h1 style={{ fontWeight: 400 }}>
				Create And Verify Immutable Certificates & Degrees
			</h1>
			<img src="/art-1.png" alt="certify logo" />
			<div className="info">
				Built on the Celo blockchain, For Security And Trust
				<br />
				<div className="links">
					<Link role="button" to="/create">
						Create
					</Link>
					<Link role="button" to="/verify">
						Verify
					</Link>
					<Link role="button" to="/actions">
						Actions
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Home;
