import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rating',
})
export class RatingPipe implements PipeTransform {
  transform(rating: number): { full: number; half: boolean } {
    return { full: rating / 1, half: rating % 1 !== 0 };
  }
}
