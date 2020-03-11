<template>
    <v-card
        :height="height" :width="width"
        class="widget widget-vmt"
    >
        <v-widget-header
            ref="header"
            :title="title"
            @requestDeletion="$emit('requestDeletion')"
            @requestConfigDialog="showConfigDialog = true"
        />

        <v-card-text v-if="!config" class="text-center">
            {{ $t('widgets.general.error.no_configuration') }}
        </v-card-text>

        <v-card-text v-else class="body-1 blue-grey--text text--darken-4">
            <VDepItem
                v-for="(entry, index) in stationEntries"
                :key="index"
                v-bind="entry"
                :time-to-walk="config.timeToWalk"
            />
        </v-card-text>

        <v-widget-loader v-if="loading" />

        <v-widgets-edit-dialog
            v-model="showConfigDialog" :id="id"
        >
            <v-config-dialog-fields v-bind="config" @save="config = $event"/>
        </v-widgets-edit-dialog>
    </v-card>
</template>

<script>
import axios from 'axios';
import BaseWidget from '../BaseWidget/index.vue';
import VConfigDialogFields from './VConfigDialogFields.vue';
import VDepItem from './VDepItem.vue';
import getCorsUrl from '../../../helpers/getCorsUrl';

const stationApi = 'https://evag-live.wla-backend.de/node/v1/departures/';

export default {
    name: 'VWidgetEvag',
    extends: BaseWidget,
    components: {
        VConfigDialogFields,
        VDepItem
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
                return `${this.grid.width * 3}px`;
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

                this.loadDepartures();
            },
            deep: true,
            immediate: true
        }
    },
    data()
    {
        return {
            errorMsg: null,
            stationEntries: null,
            loading: false,
            interval: null
        };
    },
    mounted()
    {
        this.interval = setInterval(this.loadDepartures, 12000000); // 20 min
    },
    beforeDestroy()
    {
        clearInterval(this.interval);
    },
    methods: {
        loadDepartures()
        {
            const {config} = this;

            if (!config || !config.station) { return; }
            this.errorMsg = null;
            this.loading = true;

            axios.get(getCorsUrl(stationApi + config.station))
                .then(this.axiosResponseHandler);
        },
        axiosResponseHandler(response)
        {
            this.loading = false;
            this.stationEntries = response.data.departures.slice(0, 40).map(item =>
                ({
                    category: item.category,
                    line: item.line,
                    target: item.targetLocation,
                    depTime: item.timestamp_rt * 1000 // milliseconds are missing but required in js
                }));
        }
    }
};
</script>
