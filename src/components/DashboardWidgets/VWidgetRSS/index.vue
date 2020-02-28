<template>
    <v-card height="300px" class="widget-rss">
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
            <template v-if="errorMsg">
                <span class="res--text">{{ errorMsg }}</span>
            </template>
            <template v-if="loading">
                <v-row align="center" justify="center">
                    <v-progress-circular
                        v-if="loading"
                        class="mt-12"
                        indeterminate
                        color="primary"
                    />
                </v-row>
            </template>
            <template v-if="feedEntries">
                <VRSSItem
                    v-for="(entry, index) in feedEntries"
                    :key="index"
                    :title="entry.title"
                    :pub-date="entry.pubDate"
                />
            </template>
        </v-card-text>

        <v-widgets-create-edit-dialog
            v-model="showConfigDialog" :id="id"
        >
            <v-config-dialog-fields v-bind="config" @save="config = $event"/>
        </v-widgets-create-edit-dialog>
    </v-card>
</template>

<script>
import Parser from 'rss-parser';
import BaseWidget from '../BaseWidget/index.vue';
import VConfigDialogFields from './VConfigDialogFields.vue';
import VRSSItem from './VRSSItem.vue';

const parser = new Parser();
const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';

export default {
    name: 'VWidgetRSS',
    extends: BaseWidget,
    components: {
        VConfigDialogFields,
        VRSSItem
    },
    watch: {
        config: {
            handler(value)
            {
                if (!value || !value.rssUrl) { return; }
                this.errorMsg = null;
                this.feedEntries = null;
                this.loading = true;
                parser.parseURL(CORS_PROXY + value.rssUrl, this.rssCallback);
            },
            deep: true,
            immediate: true
        }
    },
    data()
    {
        return {
            errorMsg: null,
            feedEntries: null,
            loading: false
        };
    },
    methods: {
        rssCallback(err, rss)
        {
            this.loading = false;

            if (err)
            {
                this.errorMsg = err;
                return;
            }

            this.errorMsg = null;
            this.feedEntries = rss.items;
        }
    }
};
</script>

<style lang="scss">
.widget-rss {
    overflow: hidden;
}
</style>
