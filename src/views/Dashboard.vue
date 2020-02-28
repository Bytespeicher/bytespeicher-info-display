<template>
    <v-container fluid>
        <v-tooltip top>
            <template v-slot:activator="{ on }">
                <v-btn
                    v-on="on"
                    x-small absolute
                    dark fab
                    color="blue-grey lighten-3"
                    class="creation-fab"
                    @click="showCreateDialog = true"
                >
                    <v-icon small dense>mdi-plus</v-icon>
                </v-btn>
            </template>
            <span>{{ $t('view_dashboard.create_widget') }}</span>
        </v-tooltip>
        <template v-if="!widgets.length">
            <div class="no-entries-message title blue-grey--text text--darken-4">
                {{ $t('view_dashboard.no_widgets_found')}}<br/>
                <v-row justify="center" class="mt-6">
                    <v-col cols="3">
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <v-card
                                    v-on="on" @click="showCreateDialog = true"
                                    hover class="add-card d-flex justify-center align-center"
                                >
                                    <v-icon large>mdi-plus</v-icon>
                                </v-card>
                            </template>
                            <span>{{ $t('view_dashboard.create_widget') }}</span>
                        </v-tooltip>
                    </v-col>
                </v-row>
            </div>
        </template>
        <template v-else>
            <v-row>
                <v-col
                    v-for="(widget) in widgets"
                    :key="widget.id"
                    :cols="widget.cols"
                    :offset="widget.offset"
                >
                    <component
                        :is="`VWidget${widget.type}`"
                        :id="widget.id"
                        @requestDeletion="openDeleteDialog(widget.id)"
                    />
                </v-col>
            </v-row>
        </template>

        <v-widgets-create-edit-dialog
            v-model="showCreateDialog"
        />

        <v-delete-dialog
            v-model="showDeleteModal" @deletionConfirmed="deleteConfirmation"
        >
            <template v-slot:header>
                {{ $t(`widgets.general.headers.delete_dialog`) }}
            </template>
        </v-delete-dialog>

    </v-container>
</template>

<script>
import Widget from '../store/models/Widget';
import VWidgetsCreateEditDialog from '../components/DashboardWidgets/VWidgetsCreateEditDialog.vue';
import VDeleteDialog from '../components/VDeleteDialog.vue';

export default {
    name: 'Dashboard',
    components: {
        VDeleteDialog,
        VWidgetsCreateEditDialog,
        VWidgetText: () => import(/* webpackChunkName: "VWidgetText" */ '../components/DashboardWidgets/VWidgetText/index.vue'), // eslint-disable-line
        VWidgetRSS: () => import(/* webpackChunkName: "VWidgetText" */ '../components/DashboardWidgets/VWidgetRSS/index.vue') // eslint-disable-line
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
            showDeleteModal: false,
            showCreateDialog: false,
            selectedWidgetId: null
        };
    },
    methods: {
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
.creation-fab {
    bottom: 6px;
    right: 4px;
}

.add-card {
    height: 164px;
    > .v-icon {
        font-size: 72px;
    }
}
</style>
