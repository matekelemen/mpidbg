<script>
    let defaults = {
        parameters: {
            width: "50px",
            height: "100vh",
            background: "#333",
            ranks: [],
            rankBackground: "#444",
            rankHoverBackground: "#555",
        } // parameters
    };

    function makePropsWithDefaults(instance) {
        var output = {};
        for (const [key, defaultValue] of Object.entries(defaults)) {
            var getter = () => {
                if ("parameters" in instance && key in instance.parameters) {
                    return instance.parameters[key];
                } else {
                    return defaultValue;
                }
            };
            Object.defineProperty(output, key, getter);
        }
        return output;
    }

    export default {
        props: defaults,

        data() {
            return {...defaults.parameters};
        }, // data

        computed: makePropsWithDefaults(this),
    }; // export default
</script>


<template>
    <div class="dock">
        <li v-for="rank of parameters.ranks" :key="rank.rankID">
            <div class="rank-widget">{{ rank.rankID }}</div>
        </li>
    </div>
</template>


<style scoped>
    .dock {
        position: fixed;
        width: v-bind(width);
        height: v-bind(height);
        background: v-bind(background);
        left: 0;
        margin: 0 0 0 0;
    }

    .rank-widget {
        position: relative;
        width: v-bind(width);
        height: v-bind(width);
        background: v-bind(rankBackground);
    }

    .rank-widget:hover {
        background: v-bind(rankHoverBackground);
    }
</style>
