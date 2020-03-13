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
                <v-textarea
                    counter
                    :label="$t('widgets.vtext.form.text')"
                    :rules="rules.textRules"
                    v-model="models.text"
                />
            </v-col>
        </v-row>
    </v-col>
</template>

<script>
export default {
    name: 'VConfigDialogFields',
    props: {
        text: {
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
                text: ''
            },
            rules: {
                textRules: [
                    v => !!v || this.$t('general.form.errors.field_is_required'),
                    v => v.length <= 280 ||
                        this.$t('general.form.errors.field_max_length', {size: 280})
                ]
            }
        };
    },
    methods: {
        reset()
        {
            this.models.title = this.title;
            this.models.text = this.text;
        },
        save()
        {
            const {models: config} = this;
            this.$emit('save', {config});
        }
    }
};
</script>
