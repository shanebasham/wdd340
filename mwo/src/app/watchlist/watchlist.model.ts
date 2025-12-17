export class Watchlist {
  constructor(
    public id: string,
    public title: string,
    public year?: number,
    public type: string = 'movie',
    public genres: string[] = [],
    public status: string = 'planned',
    public watched: boolean = false,
    public favorite: boolean = false,
    public rating: number | null = null,
    public notes: string = '',
    public _id?: string,
  ) {}
}
