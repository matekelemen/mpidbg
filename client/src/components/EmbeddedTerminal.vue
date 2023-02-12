<script>
    // --- Internal Imports ---
    import {getNewTerminal, attachTerminalToSocket, getNewSocket, getNewPort} from "../terminal.js";


    const mainPort = 6060;


    export default {
        data() {
            return {
                terminal: null
            } // return object
        }, // data()

        props: {
            socket: WebSocket
        }, // props

        mounted() {
            // Open a new socket if none was passed
            let s = this.socket === undefined ? getNewSocket(getNewPort(null)) : this.socket;
            this.terminal = getNewTerminal(this.$refs.terminal,
                                           {
                                               cursorBlink: false
                                           });
            attachTerminalToSocket(this.terminal, s);
        } // mounted()
    }; // export default
</script>



<template>
    <p ref="terminal"></p>
</template>

