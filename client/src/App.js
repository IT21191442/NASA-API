
import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Signup";
import Login from "./components/Login";
import MarsRover from "./components/MarsRover";
import APOD from "./components/APOD";
import CME from "./components/CME";

function App() {
	const user = localStorage.getItem("token");

	return (
		<Routes>
			{user && <Route path="/" exact element={<Main />} />}
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/apod" exact element={<APOD />} />
			<Route path="/cme" exact element={<CME />} />
			<Route path="/marseRover" exact element={<MarsRover />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
		</Routes>
	);
}

export default App;
