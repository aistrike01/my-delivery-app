export interface ISortType {
    name: string;
    sortName: string;
    order: string;
}

export interface IFilters {
    sort: string;
    category: string;
    page: string;
    order: string;
}

export interface IFilterState {
    categoryId: number;
    sortId: number;
    currentPage: number;
    searchValue: string;
    order: string;
    categoriesList: string[];
    sortTypesList: ISortType[];
}
