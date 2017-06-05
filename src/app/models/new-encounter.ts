export class NewEncounter {
    id: number;
    date: number;
    colonist_id: number;        
    atype: string;
    action: string;
    constructor(id, colonistId, date, atype, action) {
        this.id = id;
        this.date = date;
        this.colonist_id = colonistId;        
        this.atype = atype;
        this.action = action;
}
}
