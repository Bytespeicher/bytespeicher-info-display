<template>
    <v-row
        v-if="show"
        dense
        class="dep-item"
    >
        <v-col cols="12">
            <v-card class="px-2 py-1">
                <v-row dense class="dep-item">
                    <v-col class="flex-shrink-0 flex-grow-0">
                        <v-icon v-if="category === 'Bus'" :class="[color]">mdi-bus</v-icon>
                        <v-icon v-else :class="[color]">mdi-tram</v-icon>
                    </v-col>
                    <v-col class="flex-shrink-0 flex-grow-0">
                        {{ line }}
                    </v-col>
                    <v-col>
                        {{ target }} {{ target }}
                    </v-col>
                    <v-col class="flex-shrink-0 flex-grow-0" :class="[color]">
                        {{ remainingMinutes }}min
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
const {setInterval, clearInterval} = global;

export default {
    name: 'VDepItem',
    props: {
        category: {
            type: String,
            required: true
        },
        line: {
            type: String,
            required: true
        },
        target: {
            type: String,
            required: true
        },
        depTime: {
            type: Number,
            required: true
        },
        timeToWalk: {
            type: Number,
            default: 0
        }
    },
    computed: {
        remainingMinutes()
        {
            const {now, depTime} = this;
            const difDate = Math.floor((new Date(depTime) - now) / 1000 / 60);
            return `${(difDate < 1) ? '<1' : difDate}`;
        },
        show()
        {
            const show = (new Date(this.depTime) - this.now) > 0;

            if (!show && this.interval)
            {
                clearInterval(this.interval);
            }

            return show;
        },
        color()
        {
            let color = '';
            const difNum = parseInt(this.remainingMinutes, 10);
            if (!Number.isInteger(difNum) || difNum < (this.timeToWalk))
            {
                color = 'red--text';
            }
            else if (difNum <= (this.timeToWalk + 5))
            {
                color = 'orange--text';
            }
            return color;
        }
    },
    data()
    {
        return {
            now: new Date(),
            interval: null
        };
    },
    mounted()
    {
        this.interval = setInterval(this.setNow, 20000); // 20s
    },
    beforeDestroy()
    {
        if (!this.interval) { return; }
        clearInterval(this.interval);
    },
    methods: {
        setNow()
        {
            this.now = new Date();
        }
    }
};
</script>

<style lang="scss">

</style>
