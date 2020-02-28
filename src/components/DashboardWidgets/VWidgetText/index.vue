<template>
    <v-card height="300px">
        <div class="body-2 px-4 pt-1 d-flex">
            <div class="flex-grow-1">
                {{ title }}
            </div>
            <div class="widget-actions">
                <v-btn
                    icon x-small
                    class="mr-1"
                    @click="$emit('requestDeletion')"
                >
                    <v-icon>mdi-delete</v-icon>
                </v-btn>
                <v-btn
                    icon x-small
                    @click="showConfigDialog = true"
                >
                    <v-icon>mdi-cogs</v-icon>
                </v-btn>
            </div>
        </div>
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
