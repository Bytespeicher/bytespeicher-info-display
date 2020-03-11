<template>
    <div class="body-2 px-4 pt-1 d-flex">
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
                icon x-small
                class="mr-1"
                @click="$emit('requestConfigDialog')"
            >
                <v-icon>mdi-cogs</v-icon>
            </v-btn>
            <v-btn
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
        }
    }
};
</script>
