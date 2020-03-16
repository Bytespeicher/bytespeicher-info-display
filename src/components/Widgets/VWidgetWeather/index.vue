<template>
    <div class="widget widget-weather" :style="{width, height}">
        <v-card class="widget-card">
            <v-widget-header
                ref="header"
                :title="(config) ? config.title : ''"
                @requestDeletion="$emit('requestDeletion')"
                @requestConfigDialog="showConfigDialog = true"
            />

            <v-card-text v-if="errorMsg" class="text-center title font-weight-regular red--text">
                {{ errorMsg }}
            </v-card-text>

            <v-card-text v-if="config" class="body-1 blue-grey--text text--darken-4">
                wetter supi
            </v-card-text>

            <v-card-text v-else class="text-center">
                {{ $t('widgets.general.error.no_configuration') }}
            </v-card-text>

            <v-widget-loader v-if="loading" />

            <v-widgets-edit-dialog
                v-model="showConfigDialog" :id="id"
            >
                <v-config-dialog-fields v-bind="config" @save="saveHandler"/>
            </v-widgets-edit-dialog>
        </v-card>
    </div>
</template>

<script>
import axios from 'axios';
import BaseWidget from '../BaseWidget/index.vue';
import VConfigDialogFields from './VConfigDialogFields.vue';
import getCorsUrl from '../../../helpers/getCorsUrl';

const weatherapi = 'https://api.openweathermap.org/data/2.5/weather';

export default {
    name: 'VWidgetWeather',
    extends: BaseWidget,
    components: {
        VConfigDialogFields
    },
    computed: {
        height: {
            get()
            {
                return `${this.grid.height * 4}px`;
            }
        },
        width: {
            get()
            {
                return `${this.grid.width * 2}px`;
            }
        }
    },
    watch: {
        config: {
            handler(value, oldValue)
            {
                if (
                    !value ||
                    !value.station ||
                    (oldValue && oldValue.station === value.station)
                ) { return; }

                this.loadWeather();
            },
            deep: true,
            immediate: true
        }
    },
    data()
    {
        return {
            loading: false,
            interval: null
        };
    },
    mounted()
    {
        this.interval = setInterval(this.loadWeather, 12000000); // 20 min
    },
    beforeDestroy()
    {
        clearInterval(this.interval);
    },
    methods: {
        loadWeather()
        {
            const {config} = this;

            if (!config || !config.station || !config.weatherApiKey) { return; }
            this.errorMsg = null;
            this.loading = true;

            const {station, weatherApiKey} = config;

            const url = `${weatherapi}?q=${station}&units=metric&appid=${weatherApiKey}`;

            axios.get(getCorsUrl(url))
                .then(this.axiosResponseHandler)
                .catch(this.axiosErrorHandler);
        },
        axiosResponseHandler(response)
        {
            this.loading = false;
            console.log(response);
        }
    }
};
</script>
