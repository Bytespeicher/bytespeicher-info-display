<template>
    <v-card height="300px" class="widget widget-text">
        <v-widget-header
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

        <v-widgets-create-edit-dialog
            v-model="showConfigDialog" :id="id"
        >
            <v-config-dialog-fields v-bind="config" @save="config = $event"/>
        </v-widgets-create-edit-dialog>
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
    }
};
</script>
