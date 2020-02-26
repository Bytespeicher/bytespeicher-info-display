<template>
    <v-container fluid>
        <v-btn
            small absolute
            right
            dark fab
            color="blue-grey darken-4"
            class="widgets-link"
            to="/widgets"
        >
            <v-icon small dense>mdi-pencil</v-icon>
        </v-btn>
        <template v-if="!widgets.length">
            <i18n
                path="dashboard.no_widgets_found" tag="div"
                class="dashboard-empty-message title blue-grey--text text--darken-4"
            >
                <router-link place="widget_link" to="/widgets">
                    {{ $t('widgets.title') }}
                </router-link>
            </i18n>
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
    .dashboard-empty-message {
        position: absolute;
        width: 100%;
        box-sizing: border-box;
        top: 50%;
        left: 0;
        transform: translate(0, -50%);
        text-align: center;
        padding: 0 10%;
    }

    .widgets-link {
        top: 16px;
    }
</style>
