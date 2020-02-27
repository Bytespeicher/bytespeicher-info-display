<template>
    <v-card>
        <v-row class="widget-listing px-4" align="center">
            <v-col>
                {{ title }}<br/>
                <span class="caption font-weight-light"> {{ type }}</span>
            </v-col>
            <v-col
                class="group-actions flex-grow-0 d-flex"
            >
                <v-btn
                    color="primary" class="px-1 mr-2"
                    @click="$emit('requestEdition')"
                >
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn
                    color="error" class="px-1"
                    @click="$emit('requestDeletion')"
                >
                    <v-icon>mdi-delete</v-icon>
                </v-btn>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
export default {
    name: 'VWidgetListing',
    props: {
        type: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        }
    }
};
</script>
