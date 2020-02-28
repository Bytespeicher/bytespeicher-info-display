<template>
    <v-container fluid>
        <v-btn
            small absolute
            right
            dark fab
            color="blue-grey lighten-2"
            class="widgets-link"
            to="/widgets"
        >
            <v-icon small dense>mdi-pencil</v-icon>
        </v-btn>
        <template v-if="!widgets.length">
            <div class="no-entries-message title blue-grey--text text--darken-4">
                {{ $t('general.no_widgets_found')}}<br/>
                <i18n path="view_dashboard.create_widgets" tag="p">
                    <template v-slot:widget_link>
                        <router-link to="/widgets">
                            {{ $t('view_widgets.title') }}
                        </router-link>
                    </template>
                </i18n>
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

        <v-delete-dialog
            v-model="showDeleteModal" @deletionConfirmed="deleteConfirmation"
        >
            <template v-slot:header>
                {{ $t(`view_widgets.delete_dialog.header`) }}
            </template>
        </v-delete-dialog>

    </v-container>
</template>

<script>
import Widget from '../store/models/Widget';
import VDeleteDialog from '../components/VDeleteDialog.vue';

export default {
    name: 'Dashboard',
    components: {
        VDeleteDialog,
        VWidgetText: () => import(/* webpackChunkName: "VWidgetText" */ '../components/DashboardWidgets/VWidgetText/index.vue') // eslint-disable-line
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
.widgets-link {
    top: 16px;
}
</style>
