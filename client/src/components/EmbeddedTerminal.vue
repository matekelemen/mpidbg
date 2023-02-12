<script>
    // --- Internal Imports ---
    import {Terminal} from "xterm/lib/xterm";


    const mainPort = 6060;


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


    export default {
        data() {
            return {
                terminal: null
            } // return object
        }, // data()

        props: {
            terminalParameters: {
                default: {
                    cursorBlink: false
                }, // default
                type: Object
            }, // terminalParameters
            socket: {
                default: undefined,
                type: WebSocket
            } // socket
        }, // props

        mounted() {
            // Open a new socket if none was passed
            let s = this.socket === undefined ? getNewSocket(getNewPort(null)) : this.socket;
            this.terminal = getNewTerminal(this.$refs.terminal,
                                           this.terminalParameters);
            attachTerminalToSocket(this.terminal, s);
        } // mounted()
    }; // export default
</script>



<template>
    <div ref="terminal"></div>
</template>



<style>
</style>
