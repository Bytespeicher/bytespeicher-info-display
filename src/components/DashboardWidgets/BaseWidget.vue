<script>
export default {
    name: 'BaseWidget',
    props: {
        title: {
            type: String,
            required: true
        },
        config: {
            type: Object,
            default: null
        }
    }
};
</script>
