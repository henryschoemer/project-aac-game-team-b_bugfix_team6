// stories.tsx
export interface StorySection {
    phrase: string;
    words: {
      [word: string]: {
        image: string;
        x: number;
        y: number;
        effect?: 'spin' | 'pulse' | 'fade' | 'bounce'|'flip'|'sideToSide'|'upAndDown'|'scaleUp'|'none'; // Add effect property
      };
    };
  }
  
  export interface Story {
    title: string;
    backgroundImage: string;
    sections: StorySection[]; // Array of sections
  }
  
  const stories: Story[] = [
    {
      title: "The Garden Adventure",
      backgroundImage: "garden-background.webp",
      sections: [
        {
          phrase: "Look in the garden, there is a ___",
          words: {
            mouse: { image: "mouse.svg", x: 40, y: 80, effect: 'flip' }, 
            ladybug: { image: "ladybug.svg", x: 60, y: 90, effect: 'spin' }, 
            
          },
        },
        {
          phrase: "And near the flowers, I see a ___",  // New sentence
          words: {
            bee: { image: "bee.svg", x: 70, y: 50, effect: 'pulse' },
            butterfly: { image: "butterfly.svg", x: 70, y: 50, effect: 'sideToSide' },
            //can add more words here
          },
        },
        {
          phrase: "The tree was full of ___.", // Another sentence
          words: {
            apples: { image: "apples.svg", x: 80, y: 20, effect: 'spin' },
            lanterns: { image: "lantern.svg", x: 80, y: 20, effect: 'scaleUp' },
          }
        }
  
        // ...  can add more sections
      ],
    },
  
    //NEW STORY
    {
      title: "Walk in the forest",
      backgroundImage: "Forest-background.png",
      sections: [
        {
          phrase: "In the forest, I look in the sky and see a ___",
          words: {
            bird: { image: "bird.svg", x: 50, y: 10, effect: 'fade' },
            airplane: { image: "airplane.svg", x: 50, y: 10, effect: 'spin' },
          },
        },
        {
          phrase: "In the path there is a ___",  // New sentence
          words: {
            bear: { image: "bear.svg", x: 40, y: 80, effect: 'pulse' },
            basket: { image: "basket.svg", x: 40, y: 80, effect: 'none' },
          },
        },
        {
          phrase: "And the ___ was bouncing in the bush.", // Another sentence
          words: {
            boy: { image: "boy.svg", x: 80, y: 60, effect: 'scaleUp' },
            squirrel: { image: "Squirrel.svg", x: 65, y: 60, effect: 'upAndDown' }
          }
        }
        // ... more sections
      ],
    },
  ];
  
  export default stories;