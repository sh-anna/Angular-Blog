import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sorting'
})
export class SortingPipe implements PipeTransform {

  transform(posts, category = ''): unknown {
    if (!category) {
      return posts
    }
    return posts.filter( posts => {
      return posts.category.toLowerCase() == category.toLowerCase()
    })
  }

}
