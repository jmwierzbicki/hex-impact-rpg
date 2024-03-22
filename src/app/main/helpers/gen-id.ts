import slugify from "slugify";

export function genID(name: string): string {
  return slugify(name, {
    remove: undefined,
    lower: true,
    strict: true,
    trim: true
  })
}
