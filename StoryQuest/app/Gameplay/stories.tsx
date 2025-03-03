// The file where the stories will be imported from.

//TO DO:
//CHANGE THE IMAGE POSITIONS
//ADDING ANIMATION
//CHANGE THE SIZE OF THE PICTURES. NEED TO BE BIGGER
//MAKE BETTER SENTENCE/STORIES



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
            mouse: { image: "mouse.svg", x: 50, y: 100 },
            ladybug: {image: "ladybug.svg", x: 60, y:90},
            //below are tests to see if the keyboard is dynamically initiated correctly
            apple: {image: "apple.svg", x: 60, y:90},
            lantern: {image: "lantern.svg", x: 60, y:90},
            cat: {image: "cat.svg", x: 60, y:90},
            dog: {image: "dog.svg", x: 60, y:90},
            bird: {image: "bird.svg", x: 60, y:90},
            bear: {image: "bear.svg", x: 60, y:90},
            boy: {image: "boy.svg", x: 60, y:90},
            squirrel: {image: "squirrel.svg", x: 60, y:90},
            
          },
        },
        {
          phrase: "And near the flowers, I see a ___",  // New sentence
          words: {
            bee: { image: "bee.svg", x: 70, y:50},
            butterfly: { image: "butterfly.svg", x: 70, y:50},
            //can add more words here
          },
        },
        {
          phrase: "The tree was full of ___.", // Another sentence
          words: {
              apples: { image: "apples.svg", x: 80, y:20},
              lanterns: { image: "lantern.svg", x: 80, y:20},
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
              bird: { image: "bird.svg", x: 0, y:0},
              airplane: { image: "airplane.svg", x: 0, y:0},
            },
          },
          {
            phrase: "In the path there is a ___",  // New sentence
            words: {
              bear: { image: "bear.svg", x: 0, y:0},
              basket: { image: "basket.svg", x: 0, y:0},
            },
          },
          {
            phrase: "And the ___ was sitting in the rock.", // Another sentence 
            words: {
                boy: { image: "boy.svg", x: 0, y:0},
                squirrel: { image: "Squirrel.svg", x: 0, y:0}
            }
          }
          // ... more sections
        ],
      },
  ];
  
  export default stories;
 