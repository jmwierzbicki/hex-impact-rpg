import prand, {RandomGenerator} from "pure-rand";

export class RNG {
  static rng: RandomGenerator
  static seed: string = ''
  static seedEnabled: boolean = true

  static setRngSeed(seed: string) {
    this.seed = seed;
    let seedNumber = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    this.rng = prand.xoroshiro128plus(seedNumber);
  }

  static resetCounter() {
    this.setRngSeed(this.seed)
  }

  static toggleSeed(enable: boolean){
  this.seedEnabled = enable;
}

  static generate(max: number): number {
    if (this.seedEnabled) {
      return prand.unsafeUniformIntDistribution(1, max, this.rng)-1
    }
    return Math.floor(Math.random() * max)

  }

}
//
// const seed = 0;
// let rng?: RandomGenerator = undefined;
//
// export function setRngSeed(seed: string) {
//   let seedNumber = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
//   rng = prand.xoroshiro128plus(seedNumber);
// }
// export function resetCounter() {
//   counter = 0;
// }
// export function toggleSeed(enable: boolean){
//   seedEnabled = enable;
// }
//
//
// let rngSeed: string = '';
// let counter: number = 0;
// let seedEnabled: boolean = true;
//
// export function rng(max: number): number {
//   if (seedEnabled) {
//     let seed = (rngSeed+counter.toString()).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
//     let x = Math.sin(seed++) * 10000;
//     let random = x - Math.floor(x);
//     counter++;
//     return Math.floor(random * max);
//   }
//   return Math.floor(Math.random() * max)
//
// }
