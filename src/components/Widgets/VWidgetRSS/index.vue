<template>
    <div class="widget widget-rss" :style="{width, height}">
        <v-card class="widget-card">
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
                <template v-if="errorMsg">
                    <span class="res--text">{{ errorMsg }}</span>
                </template>
                <template v-if="feedEntries">
                    <VRSSItem
                        v-for="(entry, index) in feedEntries"
                        :key="index"
                        :title="entry.title"
                        :description="entry.contentSnippet"
                        :pub-date="entry.pubDate"
                        :creator="entry.creator"
                    />
                </template>
            </v-card-text>

            <v-widget-loader v-if="loading" />

            <v-widgets-edit-dialog
                v-model="showConfigDialog" :id="id"
            >
                <v-config-dialog-fields v-bind="config" @save="config = $event"/>
            </v-widgets-edit-dialog>
        </v-card>
    </div>
</template>

<script>
import Parser from 'rss-parser';
import BaseWidget from '../BaseWidget/index.vue';
import VConfigDialogFields from './VConfigDialogFields.vue';
import VRSSItem from './VRSSItem.vue';
import getCorsUrl from '../../../helpers/getCorsUrl';

const {setInterval, clearInterval} = global;

const parser = new Parser();

export default {
    name: 'VWidgetRSS',
    extends: BaseWidget,
    components: {
        VConfigDialogFields,
        VRSSItem
    },
    watch: {
        config: {
            handler(value, oldValue)
            {
                if (
                    !value ||
                    !value.rssUrl ||
                    (oldValue && oldValue.rssUrl === value.rssUrl)
                ) { return; }

                this.loadRss();
            },
            deep: true,
            immediate: true
        }
    },
    computed: {
        height: {
            get()
            {
                return `${this.grid.height * 6}px`;
            }
        },
        width: {
            get()
            {
                return `${this.grid.width * 2}px`;
            }
        }
    },
    data()
    {
        return {
            errorMsg: null,
            feedEntries: null,
            loading: false,
            interval: null
        };
    },
    mounted()
    {
        this.interval = setInterval(this.loadRss, 3600000); // 60 min
    },
    beforeDestroy()
    {
        clearInterval(this.interval);
    },
    methods: {
        loadRss()
        {
            const {config} = this;

            if (!config || !config.rssUrl) { return; }
            this.errorMsg = null;
            this.loading = true;
            parser.parseURL(getCorsUrl(config.rssUrl), this.rssCallback);
        },
        rssCallback(err, rss)
        {
            this.loading = false;

            if (err)
            {
                this.errorMsg = err;
                return;
            }

            this.errorMsg = null;
            this.feedEntries = rss.items.map((item) =>
            {
                const date = new Date(item.pubDate);
                item.pubDate = date.toLocaleDateString('de-DE', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'
                });
                return item;
            });
        }
    }
};
</script>
