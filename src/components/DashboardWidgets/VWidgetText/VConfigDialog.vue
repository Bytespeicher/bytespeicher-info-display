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
                    {{ $t('widgets.general.config.header') }}
                </span>
            </v-card-title>
            <v-form ref="form" v-model="valid">
                <v-card-text>
                    <v-container>
                        <v-row>

                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer />
                    <v-btn
                        color="grey darken-1" outlined
                        @click="abort"
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
    name: 'VConfigDialog',
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
            valid: true
        };
    },
    methods: {
        abort()
        {
            this.show = false;
        },
        save()
        {

        }
    }
};
</script>
