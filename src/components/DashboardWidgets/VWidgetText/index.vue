<template>
    <v-card height="200px">
        <div class="body-2 mb-2 px-2 pt-1 d-flex">
            <div class="flex-grow-1">
                {{ title }}
            </div>
            <div class="widget-actions">
                <v-btn
                    icon x-small
                >
                    <v-icon>mdi-cogs</v-icon>
                </v-btn>
            </div>
        </div>
        <v-card-text v-if="!config" class="text-center">
            {{ $t('widgets.general.error.no_configuration') }}
        </v-card-text>
    </v-card>
</template>

<script>
import BaseWidget from '../BaseWidget.vue';

export default {
    name: 'VWidgetText',
    extends: BaseWidget
};
</script>
