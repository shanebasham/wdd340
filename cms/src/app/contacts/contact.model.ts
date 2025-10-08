export class Contact {
  constructor(public id: number, 
    public name: string, 
    public email: string, 
    public phone: number, 
    public imagePath: string, 
    public group: Contact[] | null) {
  }
}
