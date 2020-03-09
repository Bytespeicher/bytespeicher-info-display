<script>
import Widget from '../../../store/models/Widget';
import VWidgetsCreateEditDialog from '../VWidgetsCreateEditDialog.vue';

export default {
    name: 'BaseWidget',
    components: {
        VWidgetsCreateEditDialog
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
    }
};
</script>

<style lang="scss">
.widget {
    overflow: hidden;
}
</style>
