export class Report {
  id: number;  
  date: string;
  colonist_id: number;
  atype: string;
  action: string;
  constructor(id, date, colonistId, atype, action) {
    this.date = date;
    this.id = id;
    this.colonist_id = colonistId;
    this.atype = atype;
    this.action = action;
    };
}