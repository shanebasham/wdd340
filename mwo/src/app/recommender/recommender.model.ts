export class Recommender {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public phone: string,
    public imageUrl: string,
    public group: Recommender[] | null = null,
    public _id?: string
  ) {}
}