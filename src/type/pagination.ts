export interface  pagination {
    db : string,
    slelectBy ?: object,
    page : number,
    perPage : number,
    path ?: string,
    select ?: string,
    sort?: object
}