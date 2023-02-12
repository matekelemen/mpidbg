import {Terminal} from "xterm/lib/xterm";


export const mainPort = 6060;


export function getNewPort(mainSocket)
{
    return mainPort;
}


export function getNewSocket(port)
{
    console.log("getNewSocket called with port ", port);
    return new WebSocket(`ws://localhost:${port}`);
}


export function attachTerminalToSocket(terminal, socket)
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


export function detachTerminalFromSocket(terminal, socket)
{
    socket.onopen = () => {};
    socket.onmessage = (event) => {};
    socket.onclose = () => {};
    terminal.onData(data => {});
}


export function getNewTerminal(element,
                               properties)
{
    let terminal = new Terminal(properties);
    //terminal.open(document.getElementById(element_id));
    terminal.open(element);
    return terminal;
}


export function spawnNewTerminal(element_id,
                                 port,
                                 terminal_properties)
{
    const socket = getNewSocket(port);
    let terminal = getNewTerminal(element_id, terminal_properties);
    attachTerminalToSocket(terminal, socket);
    return terminal;
}


//spawnNewTerminal(
//    "terminal",
//    getNewPort(null),
//    {
//        cursorBlink: false
//    }
//);
