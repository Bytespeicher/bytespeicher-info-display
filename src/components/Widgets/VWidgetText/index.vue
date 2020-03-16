<template>
    <div class="widget widget-text" :style="{width, height}">
        <v-card class="widget-card">
            <v-widget-header
                ref="header"
                :title="(config) ? config.title : ''"
                @requestDeletion="$emit('requestDeletion')"
                @requestConfigDialog="showConfigDialog = true"
            />

            <v-card-text v-if="config" class="body-1 blue-grey--text text--darken-4">
                {{ config.text }}
            </v-card-text>

            <v-card-text v-else class="text-center">
                {{ $t('widgets.general.error.no_configuration') }}
            </v-card-text>

            <v-widgets-edit-dialog
                v-model="showConfigDialog" :id="id"
            >
                <v-config-dialog-fields v-bind="config" @save="saveHandler"/>
            </v-widgets-edit-dialog>
        </v-card>
    </div>
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
