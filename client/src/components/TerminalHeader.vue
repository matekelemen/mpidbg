<script>
    let defaults = {
        parameters: {
            title: "Terminal"
        }
    }; // defaults

    export default {
        props: defaults,

        data() {
            return {}
        }, // data

        mounted() {
            console.log(`TerminalHeader: ${JSON.stringify(this.parameters, 0, 2)}`);
        }
    }; // export default
</script>


<template>
    <div class="terminal-header">{{ parameters.title }}</div>
</template>


<style>
    .terminal-header {
        position: relative;
        height: 30px;
        line-height: 30px;
        padding: 0 20px;
        text-align: center;
        background: #333;
        color: #bbb;
        border-radius: 3px 3px 0 0;
        cursor: move;
    }

    .terminal-header:hover {
        opacity: 0.75;
    }
</style>
