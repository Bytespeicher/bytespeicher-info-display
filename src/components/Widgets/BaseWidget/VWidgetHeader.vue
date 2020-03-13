<template>
    <div class="widget-header body-2 pl-4 pr-2 pt-1 d-flex">
        <div class="flex-grow-1">
            {{ title }}
        </div>
        <div class="widget-actions">
            <v-btn
                icon x-small
                class="mr-1"
                @click="$emit('requestDeletion')"
            >
                <v-icon>mdi-delete</v-icon>
            </v-btn>
            <v-btn
                v-if="!removeSettings"
                icon x-small
                class="mr-1"
                @click="$emit('requestConfigDialog')"
            >
                <v-icon>mdi-cogs</v-icon>
            </v-btn>
            <v-btn
                class="drag-button"
                icon x-small
            >
                <v-icon>mdi-drag-variant</v-icon>
            </v-btn>
        </div>
    </div>
</template>

<script>
export default {
    name: 'VWidgetHeader',
    props: {
        title: {
            type: String,
            default: ''
        },
        removeSettings: {
            type: Boolean,
            default: false
        }
    }
};
</script>

<style lang="scss">
.widget-header {
    > .widget-actions {
        > .drag-button {
            pointer-events: none;
        }
    }
}
</style>
