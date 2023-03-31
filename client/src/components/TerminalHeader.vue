<script>
    export default {
        props: {
            title: {
                default: "Terminal",
                type: String
            }
        }, // props

        data() {
            return {}
        } // data
    }; // export default
</script>


<template>
    <div class="terminal-header">{{ title }}</div>
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