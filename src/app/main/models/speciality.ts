export interface ISpeciality {
  name: string;
  desc: string;
}

export class Speciality implements ISpeciality {
  public name: string;
  public desc: string;
  public enabled: boolean = false;

  constructor(name: string, desc: string) {
    this.name = name;
    this.desc = desc;
  }
}
