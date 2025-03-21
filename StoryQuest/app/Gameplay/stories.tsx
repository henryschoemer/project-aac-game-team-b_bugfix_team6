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
  {
    title: "The Garden Adventure",
    backgroundImage: "garden-background.webp",
    colorTheme: {
      backgroundColor: "#b4fcdc", // Light green
      buttonColor: "#63d2cb", // Teal
    },
    sections: [
      {
        phrase: "Look in the garden, there is a ___",
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
        phrase: "And near the flowers, I see a ___",  // New sentence
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
        phrase: "The tree was full of ___.", // Another sentence
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

  //NEW STORY
  {
    title: "Walk in the forest",
    backgroundImage: "Forest-background.png",
    colorTheme: {
      backgroundColor: "#ffcccb", // Light red
      buttonColor: "#ff6666", // Coral
    },
    sections: [
      {
        phrase: "In the forest, I look in the sky and see a ___",
        words: {
          bird: { image: "bird.svg", x: 50, y: 10, effect: 'fade' },
          airplane: { image: "airplane.svg", x: 50, y: 10, effect: 'spin' },
          helicopter: { image: "helicopter.svg", x: 50, y: 10, effect: 'spin' },
          hero: { image: "hero.svg", x: 50, y: 10, effect: 'spin' },
          cloud: { image: "cloud.svg", x: 50, y: 10, effect: 'spin' },
          sun: { image: "sun.svg", x: 50, y: 10, effect: 'spin' },
        },
      },
      {
        phrase: "In the path there is a ___",  // New sentence
        words: {
          bear: { image: "bear.svg", x: 40, y: 80, effect: 'pulse' },
          basket: { image: "basket.svg", x: 40, y: 80, effect: 'none' },
          monkey: { image: "monkey.svg", x: 40, y: 80, effect: 'none' },
          squirrel: { image: "Squirrel.svg", x: 40, y: 80, effect: 'none' },
          bird: { image: "bird.svg", x: 40, y: 80, effect: 'none' },
          ladybug: { image: "ladybug.svg", x: 40, y: 80, effect: 'none' }
        },
      },
      {
        phrase: "And the ___ was bouncing in the bush.", // Another sentence
        words: {
          boy: { image: "boy.svg", x: 80, y: 60, effect: 'scaleUp' },
          squirrel: { image: "Squirrel.svg", x: 65, y: 60, effect: 'upAndDown' },
          mouse: { image: "mouse.svg", x: 65, y: 60, effect: 'upAndDown' },
          monkey: { image: "monkey.svg", x: 65, y: 60, effect: 'upAndDown' },
          ladybug: { image: "ladybug.svg", x: 65, y: 60, effect: 'upAndDown' },
          bear: { image: "bear.svg", x: 65, y: 60, effect: 'upAndDown' }
        }
      }
      // ... more sections for more story parts
    ],
  },
];

export default stories;