import {Model} from '@vuex-orm/core';

export default class Widget extends Model
{
    static entity = 'widget'

    static fields()
    {
        return {
            id: this.increment(),
            cols: this.attr(null),
            offset: this.attr(null),
            type: this.attr(null),
            config: this.attr(null)
        };
    }
}
