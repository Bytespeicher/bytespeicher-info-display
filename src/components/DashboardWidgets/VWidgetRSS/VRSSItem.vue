<template>
    <v-row dense>
        <v-col cols="12">
            <div class="subtitle-1">{{ title }}</div>
            <div class="caption">{{ pubDate }}</div>
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
        pubDate: {
            type: String,
            required: true
        }
    }
};
</script>
