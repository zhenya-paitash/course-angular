import { Pipe, PipeTransform } from '@angular/core';
import {Post} from "../app.component";

@Pipe({
  name: 'filterPosts',
  pure: false
})
export class FilterPostsPipe implements PipeTransform {

  transform(posts: Post[], search: string, field: string = 'title'): Post[] {
    if (!search.trim()) {
      return posts
    }

    return posts.filter(i => i[field].toLowerCase().includes(search.toLowerCase()) );
  }

}
