<script>
import Widget from '../../store/models/Widget';

export default {
    name: 'BaseWidget',
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
