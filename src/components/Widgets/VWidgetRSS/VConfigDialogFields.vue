<template>
    <v-col cols="12" class="py-0">
        <v-row dense>
            <v-col cols="12">
                <v-text-field
                    :label="$t('widgets.general.form.title')"
                    v-model="models.title"
                />
            </v-col>

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
        },
        title: {
            type: String,
            default: ''
        }
    },
    data()
    {
        return {
            models: {
                title: '',
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
            this.models.title = this.title;
            this.configModels.rssUrl = this.rssUrl;
        },
        save()
        {
            const {models: config} = this;
            this.$emit('save', {config});
        }
    }
};
</script>
