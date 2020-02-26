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

            <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                    <v-btn
                        v-on="on"
                        absolute small
                        bottom right
                        dark color="blue darken-1"
                        fab
                    >
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>
                </template>
                <span>{{ $t('widgets.create_widget') }}</span>
            </v-tooltip>
        </v-app-bar>
        <v-container fluid>
            <template v-if="!widgets.length">
                <div class="no-entries-message title blue-grey--text text--darken-4">
                    {{ $t('general.no_widgets_found')}}
                    <v-row justify="center" class="mt-6">
                        <v-col cols="3">
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on }">
                                    <v-card
                                        v-on="on"
                                        hover class="add-card d-flex justify-center align-center"
                                    >
                                        <v-icon large>mdi-plus</v-icon>
                                    </v-card>
                                </template>
                                <span>{{ $t('widgets.create_widget') }}</span>
                            </v-tooltip>
                        </v-col>
                    </v-row>
                </div>
            </template>
        </v-container>
    </div>
</template>

<script>
import Widget from '../store/models/Widget';

export default {
    name: 'Widgets',
    computed: {
        widgets()
        {
            return Widget.all();
        }
    }
};
</script>

<style lang="scss">
.add-card {
    height: 164px;

    > .v-icon {
        font-size: 72px;
    }
}
</style>
