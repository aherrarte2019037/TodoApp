export interface Task {
    name       : string;
    description: string;
    completeAt : Date;
    userId?    : number;
    finishedAt?: Date;
    createdAt? : Date;
    completed? : boolean;
    id?        : number;
}