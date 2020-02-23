export class Recipie {
  public name: string;
  public description: string;
  public imagepath: string;
  constructor(name: string, desc: string, img: string) {
    this.name = name;
    this.description = desc;
    this.imagepath = img;
  }
}
