export class Report {
  id: string;
  colonist_id: string;
  atype: string;
  action: string;
  constructor(id, colonistId, atype, action) {
    this.id = id;
    this.colonist_id = colonistId;
    this.atype = atype;
    this.action = action;
    };
}