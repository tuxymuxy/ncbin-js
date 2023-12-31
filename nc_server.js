const net = require("net");
const express = require("express");
const fs = require("fs");
const path = require("path");
let config = require("./config.json");
const app = express();
const randomstring = require("randomstring");
app.use(express.json());
if (!fs.existsSync(config.dataDir)) {
	fs.mkdirSync(config.dataDir);
}

app.get("/:postID", (req, res) => {
	const postID = req.params.postID;
	const postFilePath = path.join(config.dataDir, postID);
	fs.readFile(postFilePath, "utf8", (err, data) => {
		if (err) {
			return res.status(404).json({ error: "Post not found" });
		}
		res.send(data);
	});
});
app.get("/", (req, res) => {
	res.send(
		`${config.brand}'s Paste Server
Usage:
   ~$ echo textgoeshere | nc ${config.url} ${config.ncPort}"
       http://${req.hostname}:${config.webPort}/abcdef\n   ~$ cat * | grep ncore | nc ${config.url} ${config.ncPort}"
       http://${req.hostname}:${config.webPort}/ghijkl`
	);
});
const server = net.createServer((socket) => {
	socket.on("data", (data) => {
		const receivedData = data.toString();
		let id = randomstring.generate(config.idLength);

		fs.writeFile(
			path.join(config.dataDir, id),
			receivedData,
			"utf8",
			(err) => {}
		);
		socket.write(`http://${config.url}:${config.webPort}/${id}`);
	});
});
server.listen(config.ncPort, () => {
	console.log(`Netcat server listening on port ${config.ncPort}!`);
});
app.listen(config.webPort, () => {
	console.log(`Webserver listening on port ${config.webPort}!`);
});
function cleanupStorage() {
	const files = fs.readdirSync(config.dataDir);
	files.sort(
		(a, b) =>
			fs.statSync(path.join(config.dataDir, a)).mtime -
			fs.statSync(path.join(config.dataDir, b)).mtime
	);

	let folderSize = 0;

	for (const file of files) {
		const filePath = path.join(config.dataDir, file);
		const stats = fs.statSync(filePath);

		if (stats.isFile()) {
			if (folderSize + stats.size > config.storageSize) {
				fs.unlinkSync(filePath);
				console.log(`Deleted ${file}!`);
			} else {
				folderSize += stats.size;
			}
		}
	}
}
setInterval(cleanupStorage, 60 * 60 * 1000);
cleanupStorage();
