<template>
    <v-dialog
        v-model="show"
        persistent
        overlay-opacity="0.7"
        max-width="600px"
    >
        <v-card>
            <v-card-title>
                <span class="headline">
                    {{ $t('widgets.general.form.header.create') }}
                </span>
            </v-card-title>
            <v-form ref="form" v-model="valid">
                <v-card-text class="py-0">
                    <v-container>
                        <v-row dense>
                            <v-col cols="12">
                                <v-select
                                    :items="widgetTypes"
                                    :label="$t('widgets.general.form.type')"
                                    :rules="rules.required"
                                    required
                                    v-model="models.type"
                                />
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer />
                    <v-btn
                        color="grey darken-1" outlined
                        @click="show = false"
                    >
                        {{ $t('general.form.abort') }}
                    </v-btn>
                    <v-btn
                        color="green white--text"
                        :disabled="!valid" @click="save"
                    >
                        {{ $t('general.form.save') }}
                    </v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
    </v-dialog>
</template>

<script>
import Widget from '../../store/models/Widget';

import widgetTypes from '../../static/widgets';

export default {
    name: 'VWidgetsCreateDialog',
    props: {
        value: {
            type: Boolean
        }
    },
    computed: {
        show: {
            get()
            {
                return this.value;
            },
            set(value)
            {
                this.$emit('input', value);
            }
        }
    },
    data()
    {
        return {
            valid: true,
            widgetTypes,
            rules: {
                required: [v => !!v || this.$t('general.form.errors.field_is_required')]
            },
            models: {
                type: 'Text'
            }
        };
    },
    watch: {
        show: {
            handler(value)
            {
                if (!value) { return; }
                this.reset();
            }
        }
    },
    methods:
    {
        reset()
        {
            const {form} = this.$refs;
            if (!form) { return; }
            form.reset();

            this.$nextTick(() =>
            {
                this.models.type = 'Text';
            });
        },
        save()
        {
            const {models} = this;

            const data = {
                firstCreation: true,
                type: models.type
            };

            Widget.insert({data})
                .then(this.clearForm)
                .then(() =>
                {
                    this.reset();
                    this.show = false;
                });
        }
    }
};
</script>
