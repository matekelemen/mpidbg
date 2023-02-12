<script>
    // --- Internal Imports ---
    import EmbeddedTerminal from "./EmbeddedTerminal.vue"


    export default {
        components: {
            EmbeddedTerminal
        }, // components

        props: {
            embeddedTerminalParameters: {
                default: {},
                type: Object
            },
            parameters: {
                default: {},
                type: Object
            } // props.parameters
        } // props
    }; // export default
</script>


<template>
    <div ref="decorator">
        <EmbeddedTerminal :terminalParameters="embeddedTerminalParameters"/>
    </div>
</template>



<style>
</style>
