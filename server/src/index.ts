import server from "./server";

// Server contruction and deployment
// FIXME change console log to show actual working port
const port = process.env.PORT || 4000;
server.listen(port, () => {
	console.log("API Up");
});