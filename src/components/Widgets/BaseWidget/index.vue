<script>
import gsap from 'gsap';
import Draggable from 'gsap/Draggable';
import {mapGetters} from 'vuex';

import Widget from '../../../store/models/Widget';
import VWidgetsEditDialog from '../../Dialogs/VWidgetsEditDialog.vue';
import VWidgetHeader from './VWidgetHeader.vue';
import VWidgetLoader from './VWidgetLoader.vue';

gsap.registerPlugin(Draggable);

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
        ...mapGetters({
            grid: 'settings/gridSize'
        }),
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
            openConfigDialogOnFirstStart: true,
            showConfigDialog: false
        };
    },
    mounted()
    {
        this.$nextTick(this.createDragInstance);

        if (!this.openConfigDialogOnFirstStart || !this.widget.firstCreation) { return; }
        Widget.update({where: this.id, data: {firstCreation: false}});

        this.showConfigDialog = true;
    },
    methods: {
        createDragInstance()
        {
            const {$el} = this;

            Draggable.create(
                $el,
                {
                    type: 'x,y',
                    bounds: $el.parentNode,
                    trigger: this.$refs.header.$el
                }
            );
        }
    }
};
</script>

<style lang="scss">
.widget {
    position: absolute;
    left: 0;
    top: 0;
    overflow: hidden;
}
</style>
