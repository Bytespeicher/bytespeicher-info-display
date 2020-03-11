import {Model} from '@vuex-orm/core';

export default class Widget extends Model
{
    static entity = 'widget'

    static fields()
    {
        return {
            id: this.uid(),
            firstCreation: this.attr(null),
            type: this.attr(null),
            title: this.attr(null),
            config: this.attr(null),
            position: this.attr({x: 0, y: 0})
        };
    }
}
