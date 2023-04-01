<script>
    // --- Internal Imports ---
    import {Terminal} from "xterm/lib/xterm";
    import {FitAddon} from "xterm-addon-fit/lib/xterm-addon-fit"
    import theme from "../terminalTheme.json";
    import network from "../network.json";
    import {promiseSocket} from "../socketUtilities";


    let defaults = {
        parameters: {
            socket: undefined,
            rankID: 0,
            terminalParameters: {
                cursorBlink: false,
                fontFamily: "noto mono",
                theme: theme
            }
        }
    };


    export function attachTerminalToSocket(terminal, socket)
    {
        socket.send(JSON.stringify({
            type: "resize",
            data: [terminal.rows, terminal.cols]
        }));

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

        watch: {
            parameters (newObject, oldObject) {
                console.log(newObject, oldObject);
            }
        }, // watch

        mounted() {
            let parameters = {...defaults.parameters, ...this.parameters};
            this.socket = parameters.socket;
            this.terminal = makeTerminal(this.$refs.terminal,
                                         parameters.terminalParameters);
            attachTerminalToSocket(this.terminal, this.socket);
        }, // mounted()

        beforeUpdate() {
            if (!!this.socket) {
                detachTerminalFromSocket(this.terminal, this.socket);
            }
        },

        updated() {
            if (!!this.socket) {
                attachTerminalToSocket(this.terminal, this.socket);
            } else {
                promiseSocket(network.address, network.port).then(socket => {
                    this.socket = socket
                    attachTerminalToSocket(this.terminal, this.socket);
                }).catch(exception => {
                    console.log(`Rank ${this.rankID} to create a socket`);
                });
            }
        }
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
        overflow: hidden;
    }
</style>
