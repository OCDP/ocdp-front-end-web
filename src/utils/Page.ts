export default class Page<T> implements Utils.IPage<T> {
  results: T[];
  next?: string | undefined;
  previous?: string | undefined;
  count: number;
  page_size: number;

  constructor({ results, count, page_size, next, previous }: Utils.IPage<T>) {
    this.results = results;
    this.count = count;
    this.page_size = page_size;
    this.next = next;
    this.previous = previous;
  }

  get page_count() {
    if (this.count && this.page_size) {
      return Math.ceil(this.count / this.page_size);
    } else return 0;
  }
}

export function buildCleanPage<T>() {
  return ({ results: [] } as unknown) as Utils.IPage<T>;
}
