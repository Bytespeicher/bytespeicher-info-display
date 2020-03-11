<template>
    <v-card
        :height="height" :width="width"
        class="widget widget-text"
    >
        <v-widget-header
            ref="header"
            :title="title"
            @requestDeletion="$emit('requestDeletion')"
            @requestConfigDialog="showConfigDialog = true"
        />

        <v-card-text v-if="!config" class="text-center">
            {{ $t('widgets.general.error.no_configuration') }}
        </v-card-text>

        <v-card-text v-else class="body-1 blue-grey--text text--darken-4">
            {{ config.text }}
        </v-card-text>

        <v-widgets-edit-dialog
            v-model="showConfigDialog" :id="id"
        >
            <v-config-dialog-fields v-bind="config" @save="config = $event"/>
        </v-widgets-edit-dialog>
    </v-card>
</template>

<script>
import BaseWidget from '../BaseWidget/index.vue';
import VConfigDialogFields from './VConfigDialogFields.vue';

export default {
    name: 'VWidgetText',
    extends: BaseWidget,
    components: {
        VConfigDialogFields
    },
    computed: {
        height: {
            get()
            {
                return `${this.grid.height * 3}px`;
            }
        },
        width: {
            get()
            {
                return `${this.grid.width * 2}px`;
            }
        }
    }
};
</script>
