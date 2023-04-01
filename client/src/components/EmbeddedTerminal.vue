<script>
    // --- Internal Imports ---
    import {Terminal} from "xterm/lib/xterm";
    import {FitAddon} from "xterm-addon-fit/lib/xterm-addon-fit"
    import theme from "../terminalTheme.json";


    let defaults = {
        parameters: {
            port: 9001,
            terminalParameters: {
                cursorBlink: false,
                theme: theme
            }
        }
    };


    export function getNewPort(mainSocket)
    {
        return defaults.parameters.port;
    }


    export function makeSocket(port)
    {
        return new WebSocket(`ws://localhost:${port}`);
    }


    export function attachTerminalToSocket(terminal, socket)
    {
        socket.onopen = () => {
            socket.send(JSON.stringify({
                type: "resize",
                data: [terminal.rows, terminal.cols]
            }));
        }; // socket.onopen

        socket.onmessage = (event) => {
            terminal.write(event.data);
        }; // socket.onmessage

        socket.onclose = () => {
            terminal.dispose();
        }; // socket.onclose

        terminal.onData(data => {
            socket.send(JSON.stringify({
                type: "input",
                data: data
            }));
        }); // terminal.onData
    }


    export function detachTerminalFromSocket(terminal, socket)
    {
        socket.onopen = () => {};
        socket.onmessage = (event) => {};
        socket.onclose = () => {};
        terminal.onData(data => {});
    }


    export function makeTerminal(element, parameters)
    {
        let terminal = new Terminal(parameters);
        let fitAddon = new FitAddon();
        terminal.loadAddon(fitAddon);
        terminal.open(element);
        fitAddon.fit();
        return terminal;
    }


    export function spawnNewTerminal(elementID,
                                     port,
                                     terminalParameters)
    {
        const socket = makeSocket(port);
        let terminal = makeTerminal(elementID, terminalParameters);
        attachTerminalToSocket(terminal, socket);
        return terminal;
    }


    export default {
        props: defaults,

        data() {
            return {
                socket: null,
                terminal: null
            } // return object
        }, // data()

        mounted() {
            let parameters = {...defaults.parameters, ...this.parameters};
            console.log(`EmbeddedTerminal: ${JSON.stringify(parameters, 0, 2)}`)
            this.socket = makeSocket(getNewPort(null));
            this.terminal = makeTerminal(this.$refs.terminal,
                                         parameters.terminalParameters);
            attachTerminalToSocket(this.terminal, this.socket);
        } // mounted()
    }; // export default
</script>



<template>
    <div class="terminal" ref="terminal"></div>
</template>



<style scoped>
    .terminal {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        margin: 0 auto;
        padding: 0;
        bottom: 0;
        left: 0;
    }
</style>
