<template>
    <v-dialog
        v-model="show"
        persistent
        overlay-opacity="0.7"
        max-width="600px"
    >
        <v-card>
            <v-card-title>
                <span v-if="id" class="headline">{{ $t('widgets.form.header.edit') }}</span>
                <span v-else class="headline">{{ $t('widgets.form.header.create') }}</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field :label="$t('widgets.form.title')" required />
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-select
                                :items="widgetsWidths"
                                :label="$t('widgets.form.width')"
                                required
                            ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-select
                                :items="widgetsOffset"
                                :label="$t('widgets.form.offset')"
                                required
                            ></v-select>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="grey darken-1" outlined
                    @click="abort"
                >
                    {{ $t('general.form.abort') }}
                </v-btn>
                <v-btn
                    color="green" dark
                    @click="save"
                >
                    {{ $t('general.form.save') }}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'VWidgetsCreateEditDialog',
    props: {
        value: {
            type: Boolean
        },
        id: {
            type: String,
            default: null
        }
    },
    computed: {
        show: {
            get()
            {
                return this.value;
            },
            set(value)
            {
                this.$emit('input', value);
            }
        }
    },
    data()
    {
        return {
            widgetsWidths: ['4', '5', '6', '7', '8', '9', '10', '11', '12'],
            widgetsOffset: ['0', '1', '2', '3', '4', '5', '6', '7', '8']
        };
    },
    methods:
    {
        abort()
        {
            this.show = false;
        },
        save()
        {

        }
    }
};
</script>
