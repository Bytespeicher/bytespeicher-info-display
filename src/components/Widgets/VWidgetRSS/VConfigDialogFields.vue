<template>
    <v-col cols="12" class="py-0">
        <v-row dense>
            <v-col cols="12">
                <v-text-field
                    :label="$t('widgets.vrss.form.rssUrl')"
                    :rules="rules.required"
                    required
                    v-model="models.rssUrl"
                />
            </v-col>
        </v-row>
    </v-col>
</template>

<script>
export default {
    name: 'VConfigDialogFields',
    props: {
        rssUrl: {
            type: String,
            default: ''
        }
    },
    data()
    {
        return {
            models: {
                rssUrl: ''
            },
            rules: {
                required: [v => !!v || this.$t('general.form.errors.field_is_required')]
            }
        };
    },
    methods: {
        reset()
        {
            this.models.rssUrl = this.rssUrl;
        },
        save()
        {
            this.$emit('save', {rssUrl: this.models.rssUrl});
        }
    }
};
</script>
