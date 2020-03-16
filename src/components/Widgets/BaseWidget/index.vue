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
            },
            set(title)
            {
                Widget.update({where: this.id, data: {title}});
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
        },
        position: {
            get()
            {
                return this.widget.position;
            },
            set(position)
            {
                Widget.update({where: this.id, data: {position}});
            }
        }
    },
    data()
    {
        return {
            openConfigDialogOnFirstStart: true,
            showConfigDialog: false,
            drag: null,
            errorMsg: null
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

            gsap.set($el, this.position);

            const dragArray = Draggable.create(
                $el,
                {
                    type: 'x,y',
                    bounds: $el.parentNode,
                    trigger: this.$refs.header.$el,
                    liveSnap: {
                        x: (value) =>
                        {
                            const {width} = this.grid;
                            return Math.round(value / width) * width;
                        },
                        y: (value) =>
                        {
                            const {height} = this.grid;
                            return Math.round(value / height) * height;
                        }
                    },
                    onRelease: () =>
                    {
                        const {x, y} = this.drag;
                        this.position = {x, y};
                    }
                }
            );

            this.drag = dragArray[0]; // eslint-disable-line
        },
        saveHandler(data)
        {
            this.showConfigDialog = false;

            if (data.config)
            {
                this.config = data.config;
            }
        },
        errorCodeHandler(code)
        {
            this.errorMsg = this.$t(`widgets.general.error.${code}`);
        },
        axiosErrorHandler(error)
        {
            this.loading = false;
            this.errorCodeHandler(error.response.status);
        }
    }
};
</script>

<style lang="scss">
.widget {
    position: absolute;
    left: 0;
    top: 0;
    padding: 5px;
    box-sizing: border-box;

    .widget-card {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
}
</style>
