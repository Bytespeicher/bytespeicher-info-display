<template>
    <v-card height="140px" class="widget widget-text">
        <v-widget-header
            :title="title"
            @requestDeletion="$emit('requestDeletion')"
            @requestConfigDialog="showConfigDialog = true"
        />

        <v-card-text class="display-3 blue-grey--text text--darken-4 text-center pt-6">
            {{ time }}
        </v-card-text>

        <v-widgets-create-edit-dialog
            v-model="showConfigDialog" :id="id"
        />
    </v-card>
</template>

<script>
import BaseWidget from '../BaseWidget/index.vue';

const {setInterval, clearInterval} = global;

export default {
    name: 'VWidgetTime',
    extends: BaseWidget,
    data()
    {
        return {
            time: '',
            interval: null
        };
    },
    mounted()
    {
        this.setTime();
        this.interval = setInterval(this.setTime, 1000);
    },
    beforeDestroy()
    {
        clearInterval(this.interval);
    },
    methods: {
        setTime()
        {
            const date = new Date();
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const hString = `${(hours < 10) ? '0' : ''}${hours}`;
            const mString = `${(minutes < 10) ? '0' : ''}${minutes}`;
            this.time = `${hString}:${mString}`;
        }
    }
};
</script>
