// stories.tsx
export interface StorySection {
  phrase: string;
  words: {
    [word: string]: {
      image: string;
      walkCycleImages?: [string, string]; // For walking animations (2 images)
      walkCycleDuration?: number;
      x: number;
      y: number;
      effect?: 'spin' | 'pulse' | 'fade' | 'bounce'|'flip'|'sideToSide'|'upAndDown'|'scaleUp'|'none'; // Add effect property
      width?: number; // Add width property
      height?: number; // Add height property
    };
  };
}

export interface Story {
  title: string;
  backgroundImage: string;
  sections: StorySection[]; // Array of sections
  colorTheme: {
    backgroundColor: string;
    buttonColor: string;
  }
}

const stories: Story[] = [

    //NEW STORY - NUMBER 1
  {
    title: "The Garden Adventure",
    backgroundImage: "garden-background.webp",
    colorTheme: {
      backgroundColor: "#b4fcdc", // Light green
      buttonColor: "#63d2cb", // Teal
    },
    sections: [
      {
        phrase: "Look in the garden, there is a ___.",
        words: {
          mouse: { image: "mouse.svg", x: 30, y: 65, effect: 'flip', width: 80, height: 80 },
          ladybug: { image: "ladybug.svg", x: 60, y: 75, effect: 'sideToSide' },
          bird: { image: "bird.svg", x: 30, y: 20, effect: 'upAndDown' },
          squirrel: { image: "Squirrel.svg", x: 40, y: 70, effect: 'fade' },
          boy: { image: "boy.svg", x: 35, y: 60, effect: 'fade', width: 250, height: 280 },
          bear: { image: "bear.svg", x: 40, y: 70, effect: 'fade' }
        },
      },
      {
        phrase: "And near the flowers, I see a ___.",  // New sentence
        words: {
          bee: { image: "bee.svg", x: 70, y: 50, effect: 'pulse' },
          butterfly: { image: "butterfly.svg",walkCycleImages:["butterfly1.svg","butterfly2.svg"],walkCycleDuration:0.3,x: 65, y: 45, effect: 'sideToSide' },
          basket: { image: "basket.svg", x: 70, y: 65, effect: 'fade' },
          bear: { image: "bear.svg", x: 70, y: 57, effect: 'flip' },
          bird: { image: "bird.svg", x: 70, y: 55, effect: 'flip' },
          ladybug: { image: "ladybug.svg", x: 70, y: 50, effect: 'pulse' }
        },
      },

      {
        phrase: "  In the middle of the clouds there is a ___.",
        words: {
          bird: { image: "bird.svg", x: 20, y: 40, effect: 'fade' },
          sun: { image: "sun.svg", x: 25, y: 35, effect: 'scaleUp' },
          moon: { image: "moon.svg", x: 25, y: 38, effect: 'pulse' },
          witch: { image: "witch.svg", x: 25, y: 35, effect: 'scaleUp' },
          balloon: { image: "balloon.svg", x: 25, y: 35, effect: 'fade' },
          rainbow: { image: "rainbow.svg", x: 20, y: 28, effect: 'scaleUp' }
        },
      },

      {
        phrase: "The tree was full of ___.",
        words: {
          apples: { image: "apples.svg", x: 45, y: 0, effect: 'fade' },
          lanterns: { image: "lantern.svg", x: 45, y: 0, effect: 'scaleUp' },
          flowers: { image: "flower.svg", x: 50, y: 0, effect: 'pulse' },
          birds: { image: "bird.svg", x: 70, y: 30, effect: 'scaleUp' },
          oranges: { image: "orange.svg", x: 45, y: 0, effect: 'fade' },
          cherries: { image: "cherry.svg", x: 45, y: 0, effect: 'scaleUp' }
        }
      }

      // ...  can add more sections to the story here
    ],
  },

  //NEW STORY - NUMBER 2
  {
    title: "Walk in the Forest",
    backgroundImage: "Forest-background.png",
    colorTheme: {
      backgroundColor: "#ffcccb", // Light red
      buttonColor: "#ff6666", // Coral
    },
    sections: [
      {
        phrase: "In the forest, I look in the sky and see a ___.",
        words: {
          bird: { image: "bird.svg", x: 40, y: 5, effect: 'fade' },
          airplane: { image: "airplane.svg", x: 40, y: 5, effect: 'pulse' },
          helicopter: { image: "helicopter.svg", x: 40, y: 5, effect: 'pulse' },
          hero: { image: "hero.svg", x: 40, y: 5, effect: 'fade' },
          cloud: { image: "cloud.svg", x: 40, y: 5, effect: 'scaleUp' },
          sun: { image: "sun.svg", x: 40, y: 5, effect: 'scaleUp' },
        },
      },
      {
        phrase: "In the path there is a ___.",  // New sentence
        words: {
          bear: { image: "bear.svg", x: 40, y: 80, effect: 'pulse' },
          basket: { image: "basket.svg", x: 40, y: 80, effect: 'none' },
          monkey: { image: "monkey.svg", x: 40, y: 70, effect: 'none' },
          squirrel: { image: "Squirrel.svg", x: 40, y: 80, effect: 'none' },
          bird: { image: "bird.svg", x: 40, y: 80, effect: 'none' },
          ladybug: { image: "ladybug.svg", x: 40, y: 80, effect: 'none' }
        },
      },
      {
        phrase: "And the ___ was bouncing in the bush.", // Another sentence
        words: {
          boy: {image: "boy.svg", x: 80, y: 60, effect: 'scaleUp'},
          squirrel: {image: "Squirrel.svg", x: 65, y: 60, effect: 'upAndDown'},
          mouse: {image: "mouse.svg", x: 65, y: 60, effect: 'upAndDown'},
          monkey: {image: "monkey.svg", x: 65, y: 60, effect: 'upAndDown'},
          ladybug: {image: "ladybug.svg", x: 65, y: 60, effect: 'upAndDown'},
          bear: {image: "bear.svg", x: 65, y: 60, effect: 'upAndDown'}
        }
      }
      ],
    },

    // NEW STORY - NUMBER 3
      {
        title: "Space Adventure",
        backgroundImage: "space-background.svg",
        colorTheme: {
          backgroundColor: "#0a0a23", // Deep space blue
          buttonColor: "#4d79ff", // Cosmic blue
        },
        sections: [
          {
            phrase: "We are travelling thru space and saw a ___.",
            words: {
              planet: { image: "planet.svg", x: 80, y: 5, effect: 'spin' },
              comet: { image: "comet.svg", x: 80, y: 5, effect: 'sideToSide' },
              astronaut: { image: "astronaut.svg", x: 80, y: 5, effect: 'bounce' },
              car: { image: "car.svg", x: 80, y: 5, effect: 'flip' },
              alien: { image: "alien.svg", x: 80, y: 5, effect: 'fade' },
              star: { image: "star.svg", x: 80, y: 5, effect: 'pulse' }
            },
          },
          {
            phrase: "On the moon, we discovered a ___.",
            words: {
              flag: { image: "flag.svg", x: 20, y: 25, effect: 'pulse' },
              rock: { image: "rock.svg", x: 20, y: 25, effect: 'scaleUp' },
              cow: { image: "cow.svg", x: 20, y: 20, effect: 'scaleUp' },
              treasure: { image: "treasure.svg", x: 20, y: 25, effect: 'pulse' },
              robot: { image: "robot.svg", x: 20, y: 20, effect: 'pulse' },
              alien: { image: "alien.svg", x: 20, y: 20, effect: 'fade' }
            },
          },
          {
            phrase: "Suddenly, something flew by us. It was a ___.",
            words: {
              UFO: { image: "ufo.svg", x: 50, y: 50, effect: 'scaleUp' },
              book: { image: "book.svg", x: 50, y: 50, effect: 'fade' },
              rocket: { image: "rocket.svg", x: 50, y: 50, effect: 'upAndDown' },
              airplane: { image: "airplane.svg", x: 50, y: 50, effect: 'scaleUp' },
              shootingStar: { image: "shootingstar.svg", x: 50, y: 50, effect: 'sideToSide' },
              spaceDragon: { image: "dragon.svg", x: 50, y: 50, effect: 'bounce' }
            }
          },
          {
            phrase: "We also said hi to a ___.",
            words: {
              Alien: { image: "alien.svg", x: 5, y: 70, effect: 'pulse' },
              robot: { image: "robot.svg", x: 5, y: 70, effect: 'sideToSide' },
              spaceCat: { image: "spacecat.svg", x: 5, y: 70, effect: 'fade' },
              spaceDog: { image: "spacedog.svg", x: 5, y: 70, effect: 'bounce' },
              astronaut: { image: "astronaut.svg", x: 5, y: 70, effect: 'none' },
              Wizard: { image: "wizard.svg", x: 5, y: 70, effect: 'spin' }
            }
          }
        ],
      },

      // ... more sections for more story parts
];

export default stories;