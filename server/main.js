var os = require("os");
var pty = require("node-pty");
var WebSocket = require("ws");
const { env } = require("process");


const mainPort = 6060;


function getShell()
{
    return os.platform() === "win32" ? "powershell.exe" : "zsh";
}


function getNewWebSocketServer(parameters)
{
    const server = new WebSocket.Server(parameters);

    server.on("connection", socket => {
        console.log(`New session on port ${parameters.port}`);

        let ptyProcess = pty.spawn(getShell(), [], {
            name: "xterm-color",
            cwd: process.env.cwd,
            env: process.env
        });

        socket.on("message", message => {
            ptyProcess.write(message);
        }); // socket.onMessage

        socket.on("close", () => {
            console.log(`Closed session on port ${parameters.port}`);
        }); // socket.onClose

        socket.on("error", error => {
            console.log(`Error on port ${parameters.port}: ${error}`);
        }); // socket.onError

        ptyProcess.onData(function (data) {
            socket.send(data);
        }); // pty.onData

        ptyProcess.onExit(exitMessage => {
            console.log("Terminal exited with code " + exitMessage.exitCode);
            socket.close();
        }); // pty.onExit
    }); // server.onConnection

    return server;
}


const server = getNewWebSocketServer({
    port: mainPort
});
