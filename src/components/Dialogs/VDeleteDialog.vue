<template>
    <v-dialog
        v-model="show"
        width="500"
        overlay-opacity="0.7"
        persistent
    >
        <v-card color="color-card" ref="form">
            <v-card-title class="headline delete-dialog-heading">
                <slot name="header" />
            </v-card-title>

            <v-card-text>
                <slot name="text">{{ $t('general.form.deletionWarning') }}</slot>
            </v-card-text>

            <v-card-actions>
                <v-btn
                    text @click="show = false"
                    :disabled="!enabled"
                    large class="px-6"
                >
                    {{ $t('general.form.abort') }}
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                    color="error" light
                    @click="deleteAction" :disabled="!enabled"
                    large class="px-6"
                >
                    {{ $t('general.form.delete') }}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'VDeleteDialog',
    props: {
        value: {
            type: Boolean
        },
        enabled: {
            type: Boolean,
            default: true
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
            allowClicks: true
        };
    },
    methods: {
        deleteAction()
        {
            this.$emit('deletionConfirmed');
        }
    }
};
</script>

<style lang="scss">
.delete-dialog-heading {
    word-break: normal;
}
</style>
