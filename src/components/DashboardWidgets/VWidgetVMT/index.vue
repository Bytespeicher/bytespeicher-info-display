<template>
    <v-card height="300px">
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
                    @click="showConfigDialog = true"
                >
                    <v-icon>mdi-cogs</v-icon>
                </v-btn>
            </div>
        </div>
        <v-card-text v-if="!config" class="text-center">
            {{ $t('widgets.general.error.no_configuration') }}
        </v-card-text>
        <v-card-text v-else class="body-1 blue-grey--text text--darken-4">
            los gehts
        </v-card-text>

        <v-progress-linear
            v-if="loading"
            class="progress-linear-bottom"
            indeterminate
            color="primary"
        />

        <v-widgets-create-edit-dialog
            v-model="showConfigDialog" :id="id"
        >
            <v-config-dialog-fields v-bind="config" @save="config = $event"/>
        </v-widgets-create-edit-dialog>
    </v-card>
</template>

<script>
import axios from 'axios';
import BaseWidget from '../BaseWidget/index.vue';
import VConfigDialogFields from './VConfigDialogFields.vue';
import getCorsUrl from '../../../helpers/getCorsUrl';

const stationApi = 'https://evag-live.wla-backend.de/node/v1/departures/';

export default {
    name: 'VWidgetEvag',
    extends: BaseWidget,
    components: {
        VConfigDialogFields
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
        this.interval = setInterval(this.loadDepartures, 300000); // 5 min
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
            console.log(response);
        }
    }
};
</script>
