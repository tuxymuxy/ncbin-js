# Paste server written in node.js

This is a paste server written in Express.js and Node.js. I wrote it because I needed a paste server that I can use to paste data using Netcat. I looked into _Termbin_ and _Fiche_; they are really good, but I prefer Node.js, so I created this.

## Client-side usage

Self-explanatory examples:

```bash
echo Hello, World! | nc your.servers.ip 6881
```

```bash
cat file.txt | nc your.servers.ip 6881
```

In case you installed the server on your local machine:

```bash
cat /proc/cpuinfo | nc localhost 6881
```

You will get an url to your paste as a response, e.g.:

```bash
http://127.0.0.1:3000/muYhQ0
```

## Server-side usage

> If you want to run the server on ports other than:
> or you want to use any other directory for the data directory, then you should edit the **config.json** file. That is the configuration file of the application.

The default configuration looks like this:

```json
{
	"brand": "Tuxy",
	"webPort": 3000,
	"ncPort": 6881,
	"dataDir": "data",
	"idLength": 6,
	"url": "127.0.0.1",
	"storageSize": 256
}
```

> You should edit this configuration, and customize it for your needs.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/TuxyMuxy/ncbin-js
   ```

2. Install the required libraries:

   ```bash
   npm i body-parser express net randomstring socket.io
   ```

3. Run the server:

   ```bash
   node index.js
   ```

## Requirements

If you want to use this server, and the client, you should have node.js, and netcat installed on your computer. You probably already have netcat - try typing `nc` or `netcat` into your terminal!

### :heavy_check_mark: **TODO**

- [x] Add netcat server
- [x] Add informational messages
- [ ] Add posting via curl
- [ ] Add debug functionality
- [ ] Add ssl/https
