<template>
    <v-card height="200px">
        <div class="body-2 mb-2 px-2 pt-1 d-flex">
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

        <v-config-dialog
            v-model="showConfigDialog"
            :id="id"
        />
    </v-card>
</template>

<script>
import BaseWidget from '../BaseWidget.vue';
import VConfigDialog from './VConfigDialog.vue';

export default {
    name: 'VWidgetText',
    extends: BaseWidget,
    components: {
        VConfigDialog
    }
};
</script>
