<script>
import Widget from '../../../store/models/Widget';
import VWidgetsEditDialog from '../../Dialogs/VWidgetsEditDialog.vue';
import VWidgetHeader from './VWidgetHeader.vue';
import VWidgetLoader from './VWidgetLoader.vue';

export default {
    name: 'BaseWidget',
    components: {
        VWidgetsEditDialog,
        VWidgetHeader,
        VWidgetLoader
    },
    props: {
        id: {
            type: String,
            required: true
        }
    },
    computed: {
        widget: {
            get()
            {
                return Widget.find(this.id);
            }
        },
        title: {
            get()
            {
                return this.widget.title;
            }
        },
        config: {
            get()
            {
                return this.widget.config;
            },
            set(config)
            {
                Widget.update({where: this.id, data: {config}});
            }
        }
    },
    data()
    {
        return {
            showConfigDialog: false
        };
    },
    mounted()
    {
        if (!this.widget.firstCreation) { return; }
        Widget.update({where: this.id, data: {firstCreation: false}});

        this.showConfigDialog = true;
    }
};
</script>

<style lang="scss">
.widget {
    overflow: hidden;
}
</style>
