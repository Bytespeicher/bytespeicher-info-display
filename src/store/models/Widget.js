import {Model} from '@vuex-orm/core';

let increment = 0;

export default class Widget extends Model
{
    static entity = 'widget'

    static fields()
    {
        return {
            id: this.uid(() => `${new Date().getTime()}_${increment++}`),
            firstCreation: this.attr(null),
            type: this.attr(null),
            config: this.attr(null),
            position: this.attr({x: 0, y: 0})
        };
    }
}
