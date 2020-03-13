<template>
    <div class="widget widget-time" :style="{width, height}">
        <v-card class="widget-card">
            <v-widget-header
                ref="header"
                remove-settings
                @requestDeletion="$emit('requestDeletion')"
            />

            <v-card-text class="blue-grey--text text--darken-4 text-center pt-7">
                <span class="display-3">{{ time }}</span><br/>
                <span class="headline">{{ date }}</span>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
import BaseWidget from '../BaseWidget/index.vue';

const {setInterval, clearInterval} = global;

export default {
    name: 'VWidgetTime',
    extends: BaseWidget,
    computed: {
        height: {
            get()
            {
                return `${this.grid.height * 2}px`;
            }
        },
        width: {
            get()
            {
                return `${this.grid.width * 2}px`;
            }
        }
    },
    data()
    {
        return {
            time: '',
            date: '',
            interval: null,
            openConfigDialogOnFirstStart: false
        };
    },
    mounted()
    {
        this.setTime();
        this.interval = setInterval(this.setTime, 12000); // 12 seconds
    },
    beforeDestroy()
    {
        clearInterval(this.interval);
    },
    methods: {
        setTime()
        {
            const date = new Date();

            const dateString = date.toLocaleDateString('de-DE', {
                weekday: 'long',
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            });

            this.time = dateString.slice(-5);
            this.date = dateString.slice(0, -7);
        }
    }
};
</script>
