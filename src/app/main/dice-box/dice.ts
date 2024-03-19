// @ts-ignore
import DiceBox from '@3d-dice/dice-box-threejs';

// set configurations when invoking the class
const Box = new DiceBox('#dice-box', {
  theme_customColorset: {
    // background: [
    //   "#00ffcb",
    //   "#ff6600",
    //   "#1d66af",
    //   "#7028ed",
    //   "#c4c427",
    //   "#d81128"
    // ], // randomly assigned colors
    background: '#00ffcb',
    foreground: '#ffffff',
    texture: 'marble', // marble | ice
    material: 'metal', // metal | glass | plastic | wood
  },
  light_intensity: 1,
  gravity_multiplier: 600,
  baseScale: 100,
  strength: 2,
  onRollComplete: (results: any) => {
    console.log(`I've got results :>> `, results);
  },
});

Box.initialize()
  .then(() => {
    // give code sandbox a chance to load up
    setTimeout(() => {
      Box.roll('7d6@4,4,4,4,4,4,4');
      // Box.roll("1d2+1d4+1d6+1d8+1d10+1d12+1d20+1d100");
    }, 1000);
  })
  .catch((e: any) => console.error(e));

export { Box };
