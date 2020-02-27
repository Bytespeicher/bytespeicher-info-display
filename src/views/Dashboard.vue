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
                <i18n path="dashboard.create_widgets" tag="p">
                    <template v-slot:widget_link>
                        <router-link to="/widgets">
                            {{ $t('widgets.title') }}
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
                        :is="widget.type"
                        v-bind="widget.config"
                    />
                </v-col>
            </v-row>
        </template>

    </v-container>
</template>

<script>
import Widget from '../store/models/Widget';

export default {
    name: 'Dashboard',
    computed: {
        widgets()
        {
            return Widget.all();
        }
    }
};
</script>

<style lang="scss">
.widgets-link {
    top: 16px;
}
</style>
