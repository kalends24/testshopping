<template>
    <div class="toast">
        <div v-show="show">
            {{message}}
        </div>
    </div>
</template>

<script>
    export default {
        name: "Toast",
        props: {
            message: {
                type: String,
                default: ''
            }
        },
        show: {
            type: Boolean,
            default: false
        }
    }
</script>

<style scoped>
    .toast {
        font-size: 16px;
        position: fixed;
        z-index: 1000;
        top: 50%;
        left: 50%;
        margin: auto;
        padding: 8px 15px;
        transform: translate(-50%, -50%);
        color: white;
        background-color: rgba(0, 0, 0, 0.75);
    }
</style>