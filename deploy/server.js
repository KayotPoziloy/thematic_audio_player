const express = require('express');

const {
	createProxyMiddleware,
	responseInterceptor
} = require('http-proxy-middleware');

const {
	spawn,
	exec
} = require('child_process');

const ngrok_address = 'http://6.tcp.eu.ngrok.io:17752'

const path = require('path');
const fs = require("fs");
const app = express();
let backend_pid = 0;
let frontend_pid = 0;
let date = -1;
let lastUpdate = 0;
let in_depoy = true;

function rester_server(res) {
	in_depoy = true;
	var deploy_t = setTimeout(() => {
		in_depoy = false;
	}, 5 * 60 * 1000);
	if (date == (new Date().getDate())) return res.end();
	if (frontend_pid) {
		res.write(`<var>KILL FRONTEND ${frontend_pid}.</var><br/>`);
		try {
			process.kill(-frontend_pid);
		} catch (e) {}
		frontend_pid = 0;
	}
	if (backend_pid) {
		res.write(`<var>KILL BACKEND ${backend_pid}.</var><br/>`);
		try {
			process.kill(-backend_pid);
		} catch (e) {}
		backend_pid = 0;
	}
	date = new Date().getDate();
	lastUpdate = (+new Date());
	const repoUrl = 'https://github.com/KayotPoziloy/thematic_audio_player.git';
	const cloneDir = path.join(__dirname, 'thematic_audio_player');
	if (!fs.existsSync(cloneDir)) {
		let cmd = `git clone ${repoUrl} ${cloneDir}`;
		res.write(`<var>${cmd}</var><br/>`);
		exec(cmd, (error, stdout, stderr) => {
			if (error) return res.end(`Error executing: <var>${error.message}</var>`);
			if (stderr) return res.end(`Error! stderr: ${stderr}`);
			res.write(`<pre>${stdout}</pre><br/>`);
			res.write(`<var>${cmd}</var> successfully.<br/><br/>`);
			setTimeout(start_backend, 10000);
		});
	} else {
		let cmd = `rm -rf ${cloneDir} && git clone ${repoUrl} ${cloneDir}`;
		res.write(`<var>${cmd}</var><br/>`);
		exec(cmd, {
			maxBuffer: 1024 * 10000
		}, (error, stdout, stderr) => {
			if (error) return res.end(`Error executing: <var>${error.message}</var>`);
			if (stderr) res.write(`stderr: <pre>${stderr}</pre><br/>`);
			res.write(`<pre>${stdout}</pre><br/>`);
			res.write(`<var>${cmd}</var> successfully.<br/><br/>`);
			setTimeout(install_backend, 10000);
		});
	}

	function install_backend() {
		let cmd = `cd ${cloneDir}/backend && npm --loglevel=error ci`;
		res.write(`<var>${cmd}</var><br/>`);
		exec(cmd, (error, stdout, stderr) => {
			if (error) return res.end(`Error executing: <var>${error.message}</var>`);
			if (stderr) return res.end(`Error! stderr: ${stderr}`);
			res.write(`<pre>${stdout}</pre><br/>`);
			res.write(`<var>${cmd}</var> successfully.<br/><br/>`);
			setTimeout(install_front, 200);
		});
	}

	function install_front() {
		let cmd = `cd ${cloneDir}/frontend && npm --loglevel=error ci`;
		res.write(`<var>${cmd}</var><br/>`);
		exec(cmd, (error, stdout, stderr) => {
			if (error) return res.end(`Error executing: <var>${error.message}</var>`);
			if (stderr) return res.end(`Error! stderr: ${stderr}`);
			res.write(`<pre>${stdout}</pre><br/>`);
			res.write(`<var>${cmd}</var> successfully.<br/><br/>`);
			if (backend_pid) {
				res.write(`<var>KILL BACKEND ${backend_pid}.</var><br/>`);
				try {
					process.kill(-backend_pid);
				} catch (e) {}
				backend_pid = 0;
			}
			setTimeout(start_backend, 200);
		});
	}

	function start_backend() {
		var child = spawn("npm", ["run", "start:ci"], {
			stdio: ['ignore', 'pipe', 'pipe'],
			detached: true,
			cwd: cloneDir + '/backend'
		});
		child.stdout.pipe(process.stdout);
		child.stderr.pipe(process.stderr);
		backend_pid = child.pid;
		res.write(`backend started at ${backend_pid}<br/>`);
		if (frontend_pid) {
			res.write(`<var>KILL FRONTEND ${frontend_pid}.</var><br/>`);
			try {
				process.kill(-frontend_pid);
			} catch (e) {}
			frontend_pid = 0;
		}
		setTimeout(start_frontend, 1000);
	}

	function start_frontend() {
		var child = spawn("npm", ["start"], {
			stdio: ['ignore', 'pipe', 'pipe'],
			detached: true,
			cwd: cloneDir + '/frontend'
		});
		child.stdout.pipe(process.stdout);
		child.stderr.pipe(process.stderr);
		frontend_pid = child.pid;
		res.write(`frontend started at ${frontend_pid}<br/>`);
		console.log(`frontend started at ${frontend_pid}<br/>`);
		clearTimeout(deploy_t);
		in_depoy = false;
		res.end();
	}
}

app.use('/api', createProxyMiddleware({
	target: 'http://localhost:4000',
	changeOrigin: true,
	pathRewrite: {
		'^/api': '/api',
	},
	onProxyReq: (proxyReq, req, res) => {},
	onError: (err, req, res) => {
		res.status(500).send('Something went wrong with the proxy.');
	}
}));

app.get('/__update', function f(req, res) {
	res.write(`Waiting...<br/>`);
	if (in_depoy) return setTimeout(() => f(req, res), 1000);
	date = -1;
	rester_server(res);
});

app.get('/get_last_update', (req, res) => {
	res.send(new Date(lastUpdate).toISOString());
});

const proxy = createProxyMiddleware({
	target: 'http://localhost:3000',
	changeOrigin: true,
	selfHandleResponse: true,
	onProxyRes: responseInterceptor(async(responseBuffer, proxyRes, req, res) => {
		if (proxyRes.headers['content-type'] && (proxyRes.headers['content-type'].startsWith('application/javascript') || proxyRes.headers['content-type'].startsWith('text/'))) {
			const response = responseBuffer.toString('utf8');
			return response.replaceAll('http://localhost:4000', ngrok_address);
		}
		return responseBuffer;
	}),
	onError: (err, req, res) => {
		res.status(500).send('Something went wrong with the proxy.');
	}
});

app.use((req, res, next) => {
	proxy(req, res, next);
});

const PORT = 2000;
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);

	function serv() {
		rester_server({
			set: () => {},
			write: (s) => console.log(s.replaceAll('<br/>', '\n')),
			end: (s) => s && console.log(s.replaceAll('<br/>', '\n'))
		});
	}
	serv();
});