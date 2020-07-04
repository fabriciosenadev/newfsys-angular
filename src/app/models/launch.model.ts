export interface LaunchIn {
    [x: string]: any,
    date: Date,
    id_category: Number,
    description? : String,
    value: Number,
}

export interface LaunchOut {
    [x: string]: any,
    date: Date,
    id_category: Number,
    description? : String,
    value: Number,
    id_pay_method: Number,
}

export interface LaunchFilter {
    [x: string]: any,
    fromDate: Date,
    toDate: Date 
}