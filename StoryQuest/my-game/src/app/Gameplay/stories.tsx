// The file where the stories will be imported from.

//TO DO:
//CHANGE THE IMAGE POSITIONS
//ADDING ANIMATION
//CHANGE THE SIZE OF THE PICTURES. NEED TO BE BIGGER
//MAKE BETTER SENTENCE/STORIES
//THE IMAGES IS SHOWING UP WITH A WHITE BACKGROUND


// stories.tsx
export interface StorySection {
    phrase: string;
    words: { [word: string]: { image: string; x: number; y: number } }; // Store image and position
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
            mouse: { image: "mouse.png", x: 50, y: 100 },
            ladybug: {image: "ladybug.png", x: 60, y:90},
          },
        },
        {
          phrase: "And near the flowers, I see a ___",  // New sentence
          words: {
            bee: { image: "bee.png", x: 70, y:50},
            butterfly: { image: "butterfly.png", x: 70, y:50},
            //can add more words here
          },
        },
        {
          phrase: "The tree was full of ___.", // Another sentence
          words: {
              apples: { image: "apple.png", x: 80, y:20},
              lanterns: { image: "lantern.png", x: 80, y:20},
          }
        }
        // ...  can add more sections
      ],
    },

    //NEW STORY
    {
        title: "Walk in the forest",
        backgroundImage: "forest-background.png",
        sections: [
          {
            phrase: "In the forest, I look in the sky and see a ___",
            words: {
              bird: { image: "bird.png", x: 0, y:0},
              airplane: { image: "airplane.png", x: 0, y:0},
            },
          },
          {
            phrase: "In the path there is a ___",  // New sentence
            words: {
              bear: { image: "bear.png", x: 0, y:0},
              basket: { image: "basket.png", x: 0, y:0},
            },
          },
          {
            phrase: "And the ___ was sitting in the rock.", // Another sentence 
            words: {
                boy: { image: "boy.png", x: 0, y:0},
                squirrel: { image: "squirrel.png", x: 0, y:0}
            }
          }
          // ... more sections
        ],
      },
  ];
  
  export default stories;
 