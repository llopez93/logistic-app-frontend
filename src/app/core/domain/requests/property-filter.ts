export enum PropertyFilterOp {
    EQUAL,
    NOT_EQUAL,
    GREATER,
    GREATER_EQUAL,
    LESS,
    LESS_EQUAL,
    LIKE,
    NULL,
    NOT_NULL
}

export class PropertyFilter {

    public static readonly WILDCARD = '%';

    private _property: string;
    private _op: PropertyFilterOp;
    private _value: any;

    public constructor(value: Object = {}) {
        Object.assign(this, value);
    }

    get property(): string {
        return this._property;
    }

    set property(value: string) {
        this._property = value;
    }

    get op(): PropertyFilterOp {
        return this._op;
    }

    set op(value: PropertyFilterOp) {
        this._op = value;
    }

    get value(): any {
        return this._value;
    }

    set value(value: any) {
        this._value = value;
    }

    public eval(context: Object): boolean {
        if (!context.hasOwnProperty(this.property)) {
            return false;
        }
        switch (this.op) {
            case PropertyFilterOp.EQUAL:
                return context[this.property] == this.value;
            case PropertyFilterOp.NOT_EQUAL:
                return context[this.property] != this.value;
            case PropertyFilterOp.GREATER:
                return context[this.property] > this.value;
            case PropertyFilterOp.GREATER_EQUAL:
                return context[this.property] >= this.value;
            case PropertyFilterOp.LESS:
                return context[this.property] < this.value;
            case PropertyFilterOp.LESS_EQUAL:
                return context[this.property] <= this.value;
            case PropertyFilterOp.LIKE:
                const v = (this.value as string).trim().toLowerCase();
                const p = (context[this.property] as string).trim().toLowerCase();
                if (v.startsWith(PropertyFilter.WILDCARD) && v.endsWith(PropertyFilter.WILDCARD)) {
                    return p.includes(v.slice(1, v.length - 1));
                }else if (v.startsWith(PropertyFilter.WILDCARD)) {
                    return p.endsWith(v.slice(1));
                }else if (v.endsWith(PropertyFilter.WILDCARD)) {
                    return p.startsWith(v.slice(0, v.length - 1));
                }else {
                    return p === v;
                }
            case PropertyFilterOp.NULL:
                return context[this.property] == null;
            case PropertyFilterOp.NOT_NULL:
                return context[this.property] != null;
            default:
                return false;
        }
    }
}


