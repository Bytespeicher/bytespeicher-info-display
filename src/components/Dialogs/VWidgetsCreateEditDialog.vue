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
                    {{ $t(`widgets.general.form.header.${id === null ? 'create' : 'edit'}`) }}
                </span>
            </v-card-title>
            <v-form ref="form" v-model="valid">
                <v-card-text class="py-0">
                    <v-container>
                        <v-row dense>
                            <v-col cols="12">
                                <v-text-field
                                    :label="$t('widgets.general.form.title')"
                                    v-model="models.title"
                                />
                            </v-col>
                            <v-col v-if="!id" cols="12">
                                <v-select
                                    :items="widgetTypes"
                                    :label="$t('widgets.general.form.type')"
                                    :rules="rules.required"
                                    required
                                    v-model="models.type"
                                />
                            </v-col>
                            <v-col cols="6">
                                <v-select
                                    :items="widgetsWidths"
                                    :label="$t('widgets.general.form.width')"
                                    :rules="rules.required"
                                    required
                                    v-model="models.cols"
                                />
                            </v-col>
                            <v-col cols="6">
                                <v-select
                                    :items="widgetsOffset"
                                    :label="$t('widgets.general.form.offset')"
                                    :rules="rules.required"
                                    required
                                    v-model="models.offset"
                                />
                            </v-col>

                            <slot />
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
    name: 'VWidgetsCreateEditDialog',
    props: {
        value: {
            type: Boolean
        },
        id: {
            type: String,
            default: null
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
            widgetsWidths: ['3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
            widgetsOffset: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
            models: {
                title: '',
                type: 'Text',
                cols: '4',
                offset: '0'
            },
            rules: {
                required: [v => !!v || this.$t('general.form.errors.field_is_required')]
            }
        };
    },
    watch: {
        show: {
            handler(value)
            {
                if (!value) { return; }
                if (!this.id)
                {
                    this.reset();
                    return;
                }

                const widget = Widget.find(this.id);
                this.models.title = widget.title;
                this.models.type = widget.type;
                this.models.cols = widget.cols;
                this.models.offset = widget.offset;

                this.$nextTick(() =>
                {
                    this.$refs.form.validate(true);

                    if (this.$slots.default)
                    {
                        this.$slots.default[0].componentInstance.reset();
                    }
                });
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
                this.models.title = '';
                this.models.type = 'Text';
                this.models.cols = '4';
                this.models.offset = '0';
            });
        },
        save()
        {
            const {models} = this;
            const data = {...models};
            if (!this.id)
            {
                Widget.insert({data})
                    .then(this.clearForm)
                    .then(() =>
                    {
                        this.reset();
                        this.show = false;
                    });
                return;
            }

            if (this.$slots.default)
            {
                this.$slots.default[0].componentInstance.save();
            }

            Widget.update({where: this.id, data})
                .then(() =>
                {
                    this.show = false;
                });
        }
    }
};
</script>
