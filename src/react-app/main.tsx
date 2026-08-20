import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import CommsTeam from "./CommsTeam.tsx";

const Page = window.location.pathname === "/comms-team" ? CommsTeam : App;

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Page />
	</StrictMode>,
);
