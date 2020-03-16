<template>
    <v-col cols="12" class="py-0">
        <v-row dense>
            <v-col cols="12">
                <v-text-field
                    :label="$t('widgets.vweather.form.city')"
                    :rules="rules.required"
                    required
                    v-model="models.station"
                />
            </v-col>
            <v-col cols="12">
                <v-text-field
                    :label="$t('widgets.vweather.form.api_key')"
                    :rules="rules.required"
                    required
                    v-model="models.weatherApiKey"
                />
            </v-col>
        </v-row>
    </v-col>
</template>

<script>
// import axios from 'axios';
// import getCorsUrl from '../../../helpers/getCorsUrl';

// let vmtStations = null;

export default {
    name: 'VConfigDialogFields',
    props: {
        station: {
            type: String,
            default: ''
        },
        weatherApiKey: {
            type: String,
            default: ''
        }
    },
    data()
    {
        return {
            models: {
                station: '',
                weatherApiKey: 10
            },
            rules: {
                required: [
                    v => !!v || this.$t('general.form.errors.field_is_required')
                ]
            }
        };
    },
    mounted()
    {

    },
    methods: {
        reset()
        {
            this.models.station = this.station;
            this.models.weatherApiKey = this.weatherApiKey;
        },
        save()
        {
            const {station, weatherApiKey} = this.models;

            this.$emit('save', {
                config: {
                    station,
                    title: station,
                    weatherApiKey
                }
            });
        }
    }
};
</script>
