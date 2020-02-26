<template>
    <div>
        <v-app-bar
            color="blue-grey darken-2"
            dark
        >
            <v-btn
                text icon
                color="white" to="/"
            >
                <v-icon>mdi-arrow-left</v-icon>
            </v-btn>

            <v-toolbar-title class="pl-2">{{ $t('widgets.title') }}</v-toolbar-title>
        </v-app-bar>
        <v-container fluid>

        </v-container>
    </div>
</template>

<script>
export default {
    name: 'Widgets'
};
</script>

