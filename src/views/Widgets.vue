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
                        dark color="primary"
                        fab
                        @click="openCreateEditDialog = true"
                    >
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>
                </template>
                <span>{{ $t('widgets.create_widget') }}</span>
            </v-tooltip>
        </v-app-bar>
        <v-container>
            <template v-if="!widgets.length">
                <div class="no-entries-message title blue-grey--text text--darken-4">
                    {{ $t('general.no_widgets_found')}}
                    <v-row justify="center" class="mt-6">
                        <v-col cols="3">
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on }">
                                    <v-card
                                        v-on="on" @click="openCreateEditDialog = true"
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
            <v-row v-else justify="center">
                <v-col
                    cols="12"
                    xl="5"
                    lg="8"
                    md="10"
                >
                    <v-widget-listing
                        v-for="(widget) in widgets"
                        :key="widget.id"
                        :title="widget.title"
                        :type="widget.type"
                        @requestEdition="openEditDialog(widget.id)"
                        @requestDeletion="openDeleteDialog(widget.id)"
                    />
                </v-col>
            </v-row>
        </v-container>

        <v-widgets-create-edit-dialog
            v-model="openCreateEditDialog"
            :id="selectedWidgetId"
        />

        <v-delete-dialog
            v-model="showDeleteModal" @deletionConfirmed="deleteConfirmation"
        >
            <template v-slot:header>
                {{ $t(`widgets.delete_dialog.header`) }}
            </template>
        </v-delete-dialog>
    </div>
</template>

<script>
import Widget from '../store/models/Widget';

import VWidgetsCreateEditDialog from '../components/ViewWidgets/VWidgetsCreateEditDialog.vue';
import VWidgetListing from '../components/ViewWidgets/VWidgetListing.vue';
import VDeleteDialog from '../components/VDeleteDialog.vue';

export default {
    name: 'Widgets',
    components: {
        VWidgetsCreateEditDialog,
        VDeleteDialog,
        VWidgetListing
    },
    computed: {
        widgets()
        {
            return Widget.all();
        }
    },
    data()
    {
        return {
            openCreateEditDialog: false,
            showDeleteModal: false,
            selectedWidgetId: null
        };
    },
    watch: {
        openCreateEditDialog(value)
        {
            if (value) { return; }
            this.selectedWidgetId = null;
        }
    },
    methods: {
        openEditDialog(widgetId)
        {
            this.selectedWidgetId = widgetId;
            this.openCreateEditDialog = true;
        },
        openDeleteDialog(widgetId)
        {
            this.showDeleteModal = true;
            this.selectedWidgetId = widgetId;
        },
        deleteConfirmation()
        {
            const id = this.selectedWidgetId;
            this.selectedWidgetId = null;
            Widget.delete(id).then(() =>
            {
                this.showDeleteModal = false;
            });
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
