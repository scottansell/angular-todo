import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'completedFilter',
    pure: false
})

export class CompletedFilterPipe implements PipeTransform {
    transform(items: any[], filter: any): any {
        if (!items || !filter) {
            return items;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        items.reverse();
        return items.filter(item => (item.completed === filter.completed));
    }
}