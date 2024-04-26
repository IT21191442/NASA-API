import styles from "./styles.module.css";
import Hero from "../Hero";
import FeaturedSections from "../FeaturedSections";

const Main = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	return (
		<div className={styles.main_container}>
		
			<nav className={styles.navbar}>
				<h1>NASA API</h1>
				
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav>
			<Hero />

			<FeaturedSections />
		</div>
	);
};

export default Main;