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
            valid: true
        };
    },
    watch: {
        show: {
            handler(value)
            {
                if (!value) { return; }

                this.$nextTick(() =>
                {
                    if (this.$slots.default)
                    {
                        this.$slots.default[0].componentInstance.reset();
                    }

                    this.$refs.form.validate(true);
                });
            }
        }
    },
    methods:
    {
        save()
        {
            if (this.$slots.default)
            {
                this.$slots.default[0].componentInstance.save();
            }
        }
    }
};
</script>
