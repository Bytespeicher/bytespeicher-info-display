<template>
    <v-col cols="12" class="py-0">
        <v-row dense>
            <v-col cols="12">
                <v-autocomplete
                    :items="vmtStations"
                    label="Station"
                    :rules="rules.required"
                    v-model="models.station"
                />
            </v-col>
            <v-col cols="12">
                <v-text-field
                    :label="$t('widgets.vvmt.form.time_to_walk')"
                    :rules="rules.requiredNumber"
                    required
                    v-model="models.timeToWalk"
                    type="number"
                    :suffix="$t('general.minutes')"
                    min="1"
                />
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
        },
        timeToWalk: {
            type: Number,
            default: 10
        }
    },
    data()
    {
        return {
            models: {
                station: '',
                timeToWalk: 10
            },
            rules: {
                required: [
                    v => !!v || this.$t('general.form.errors.field_is_required')
                ],
                requiredNumber: [
                    v => !!v || this.$t('general.form.errors.field_is_required'),
                    v =>
                        Number.isInteger(v) ||
                        Number.isInteger(parseInt(v, 10)) ||
                        this.$t('general.form.errors.field_has_to_be_integer')
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
            this.models.timeToWalk = this.timeToWalk;
        },
        save()
        {
            const {station, timeToWalk} = this.models;

            this.$emit('save', {
                config: {
                    station,
                    title: this.vmtStations.find(item => item.value === station).text,
                    timeToWalk: parseInt(timeToWalk, 10)
                }
            });
        }
    }
};
</script>
