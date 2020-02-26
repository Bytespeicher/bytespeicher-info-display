<template>
    <v-app>
        <v-content>
            <transition name="fade" mode="out-in">
                <router-view />
            </transition>
        </v-content>
    </v-app>
</template>

<script>
export default {
};
</script>

<style lang="scss">
html { overflow: auto !important; }

.container {
    padding: 4px 16px;
}

.no-entries-message {
    position: absolute;
    width: 100%;
    box-sizing: border-box;
    top: 50%;
    left: 0;
    transform: translate(0, -50%);
    text-align: center;
    padding: 0 10%;
}

.fade-enter-active,
.fade-leave-active {
    transition-duration: 0.22s;
    transition-property: opacity;
    transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
    opacity: 0
}
</style>
