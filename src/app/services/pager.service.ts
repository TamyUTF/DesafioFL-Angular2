import * as _ from 'underscore';

export class PagerService {
    getPager(totalItems: number,  currentPage: number = 1, pageSize: number = 10) {
        const totalPages = Math.ceil(totalItems / pageSize);
        let startPage: number;
        let endPage: number;
        if (totalPages <= 10) {
            startPage = 1;
            endPage = totalPages;
        } else {
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = 1;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }
        // calcular o índice dos items
        const startIndex = (currentPage - 1 ) * pageSize;
        const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        const pages = _.range(startPage, endPage + 1);

        return {
            totalItems,
            currentPage,
            pageSize,
            totalPages,
            startPage,
            endPage,
            startIndex,
            endIndex,
            pages
        };
    }
}
