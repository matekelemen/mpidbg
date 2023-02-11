import {Terminal} from "xterm/lib/xterm";


const mainPort = 6060;


function getNewPort(mainSocket)
{
    return mainPort;
}


function getNewSocket(port)
{
    return new WebSocket(`ws://localhost:${port}`);
}


function attachTerminalToSocket(terminal, socket)
{
    socket.onopen = () => {
        socket.send("");
    }; // socket.onopen

    socket.onmessage = (event) => {
        terminal.write(event.data);
    }; // socket.onmessage

    socket.onclose = () => {
        terminal.dispose();
    }; // socket.onclose

    terminal.onData(data => {
        socket.send(data);
    }); // terminal.onData
}


function detachTerminalFromSocket(terminal, socket)
{
    socket.onopen = () => {};
    socket.onmessage = (event) => {};
    socket.onclose = () => {};
    terminal.onData(data => {});
}


function getNewTerminal(element_id,
                        properties)
{
    let terminal = new Terminal(properties);
    terminal.open(document.getElementById(element_id));
    return terminal;
}


function spawnNewTerminal(element_id,
                          port,
                          terminal_properties)
{
    const socket = getNewSocket(port);
    let terminal = getNewTerminal(element_id, terminal_properties);
    attachTerminalToSocket(terminal, socket);
    return terminal;
}


spawnNewTerminal(
    "terminal",
    getNewPort(null),
    {
        cursorBlink: false
    }
);
