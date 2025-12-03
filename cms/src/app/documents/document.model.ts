export class Document {
  constructor(
    public name: string,
    public url: string,
    public description: string,
    public children: Document[] = []
  ) {}
}
