<template>
    <v-row dense class="rss-item">
        <v-col cols="12">
            <div class="subtitle-1 primary--text rss-item-title">{{ title }}</div>
            <div class="rss-item-description my-1">{{ description | truncate(200) }}</div>
            <div class="caption text--secondary">{{ pubDate }} - {{creator}}</div>
        </v-col>
    </v-row>
</template>

<script>
export default {
    name: 'VRSSItem',
    props: {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        pubDate: {
            type: String,
            required: true
        },
        creator: {
            type: String,
            required: true
        }
    }
};
</script>

<style lang="scss">
.rss-item {
    .rss-item-title,
    .rss-item-description {
        line-height: 1.2rem;
    }
}

</style>
