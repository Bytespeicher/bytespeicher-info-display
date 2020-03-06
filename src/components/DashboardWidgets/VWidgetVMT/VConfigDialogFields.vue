<template>
    <v-col cols="12" class="py-0">
        <v-row dense>
            <v-col cols="12">
                <v-autocomplete
                    :items="vmtStations"
                    label="Station"
                    :rules="rules.required"
                    v-model="models.station"
                ></v-autocomplete>
            </v-col>
        </v-row>
    </v-col>
</template>

<script>
import axios from 'axios';
import getCorsUrl from '../../../helpers/getCorsUrl';

let vmtStations = null;

export default {
    name: 'VConfigDialogFields',
    props: {
        station: {
            type: String,
            default: ''
        }
    },
    data()
    {
        return {
            models: {
                station: ''
            },
            rules: {
                required: [
                    v => !!v || this.$t('general.form.errors.field_is_required')
                ]
            },
            vmtStations
        };
    },
    mounted()
    {
        if (vmtStations) { return; }
        axios
            .get(getCorsUrl('https://evag-live.wla-backend.de/stations/latest.json'))
            .then((response) =>
            {
                const data = response.data.map(item =>
                    ({
                        text: `${item.name} (${item.parent})`,
                        value: item.id
                    }));
                vmtStations = data;
                this.vmtStations = data;
            });
    },
    methods: {
        reset()
        {
            this.models.station = this.station;
        },
        save()
        {
            this.$emit('save', {station: this.models.station});
        }
    }
};
</script>
