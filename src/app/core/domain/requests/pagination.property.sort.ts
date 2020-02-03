/**
 * Created by Lauta on 10/2/2017.
 */

export class PaginationPropertySort {

    public static readonly DIRECTION_ASC = 'ASC';
    public static readonly DIRECTION_DESC = 'DESC';

    public direction: string;
    public property: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }

}
