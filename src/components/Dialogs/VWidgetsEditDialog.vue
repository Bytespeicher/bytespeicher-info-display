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
                    {{ $t('widgets.general.form.header.edit') }}
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

export default {
    name: 'VWidgetsEditDialog',
    props: {
        value: {
            type: Boolean
        },
        id: {
            type: String,
            required: true
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
            models: {
                title: '',
                type: ''
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
        save()
        {
            const {models} = this;
            const data = {...models};

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
