// stories.tsx



export interface StorySection {
  phrase: string;
  words: {
    [word: string]: {
      image: string;
      x: number;
      y: number;
      effect?: 'spin' | 'pulse' | 'fade' | 'bounce'|'flip'|'sideToSide'|'upAndDown'|'scaleUp'|'none'|'SlideAcrossEffect'; // Add effect property
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
      phrase: "Look in the garden, there is a ___.",
      words: {
        mouse: { image: "mouse.svg", x: 25, y: 90, effect: 'flip', width: 80, height: 80 },
        ladybug: { image: "ladybug.svg", x: 26, y: 90, effect: 'sideToSide' },
        bird: { image: "bird.svg", x: 26, y: 90, effect: 'upAndDown' },
        squirrel: { image: "Squirrel.svg", x: 40, y: 70, effect: 'fade' },
        boy: { image: "boy.svg", x: 35, y: 90, effect: 'fade', width: 250, height: 280 },
        bear: { image: "bear.svg", x: 40, y: 70, effect: 'fade' }
      },
    },

    {
      phrase: "And playing in the left was the ___.",
      words: {
        mouse: { image: "mouse.svg", x: 25, y: 90, effect: 'flip', width: 80, height: 80 },
        ladybug: { image: "ladybug.svg", x: 26, y: 90, effect: 'sideToSide' },
        bird: { image: "bird.svg", x: 26, y: 90, effect: 'upAndDown' },
        squirrel: { image: "Squirrel.svg", x: 40, y: 70, effect: 'fade' },
        boy: { image: "boy.svg", x: 35, y: 90, effect: 'fade', width: 250, height: 280 },
        bear: { image: "bear.svg", x: 40, y: 70, effect: 'fade' }
      },
    },

    {
      phrase: "And near the flowers, we see a ___.",  
      words: {
        bee: { image: "bee.svg", x: 70, y: 50, effect: 'pulse' },
        butterfly: { image: "butterfly.svg",x: 65, y: 45, effect: 'sideToSide' },
        basket: { image: "basket.svg", x: 70, y: 65, effect: 'fade' },
        bear: { image: "bear.svg", x: 70, y: 50, effect: 'flip' },
        bird: { image: "bird.svg", x: 70, y: 50, effect: 'flip' },
        ladybug: { image: "ladybug.svg", x: 70, y: 50, effect: 'pulse' }
      },
    },

    {
      phrase: "To the right we discovered a ___.",  
      words: {
        book: { image: "book.svg", x: 20, y: 80, effect: 'pulse' },
        butterfly: { image: "butterfly.svg",x: 20, y: 80, effect: 'sideToSide' },
        bike: { image: "bike.svg", x: 20, y: 75, effect: 'fade' },
        bear: { image: "bear.svg", x: 20, y: 70, effect: 'flip' },
        robot: { image: "robot.svg", x: 20, y: 80, effect: 'flip' },
        wizard: { image: "wizard.svg", x: 20, y: 70, effect: 'pulse' }
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
    phrase: "  We talked to a ___.",
    words: {
      bee: { image: "bee.svg", x: 90, y: 90, effect: 'fade' },
      boy: { image: "boy.svg", x: 90, y: 90, effect: 'scaleUp' },
      hero: { image: "hero.svg", x: 90, y: 90, effect: 'pulse' },
      witch: { image: "witch.svg", x: 90, y: 90, effect: 'scaleUp' },
      knight: { image: "knight.svg", x: 90, y: 90, effect: 'fade' },
      robot: { image: "robot.svg", x: 90, y: 90, effect: 'scaleUp' }
    },
  },

  {
    phrase: "  Flying in the sky was a beautiful ___.",
    words: {
      bird: { image: "bird.svg", x: 30, y: 5, effect: 'fade' },
      airplane: { image: "airplane.svg", x: 25, y: 5, effect: 'scaleUp' },
      hero: { image: "hero.svg", x: 25, y: 5, effect: 'pulse' },
      witch: { image: "witch.svg", x: 25, y: 5, effect: 'scaleUp' },
      butterfly: { image: "butterfly.svg", x: 25, y: 5, effect: 'fade' },
      ballon: { image: "ballon.svg", x: 30, y: 5, effect: 'scaleUp' }
    },
  },
  
  {
    phrase: "By the tree we spotted a ___.",
    words: {
      treasure: { image: "treasure.svg", x: 20, y: 40, effect: 'fade' },
      basket: { image: "basket.svg", x: 25, y: 35, effect: 'scaleUp' },
      squirrel: { image: "squirrel.svg", x: 25, y: 38, effect: 'pulse' },
      boy: { image: "boy.svg", x: 25, y: 35, effect: 'scaleUp' },
      star: { image: "star.svg", x: 25, y: 35, effect: 'fade' },
      ballon: { image: "ballon.svg", x: 20, y: 28, effect: 'scaleUp' }
    },
  },

  {
    phrase: " Trying to hide behind the tree there is a ___.",
    words: {
      bike: { image: "bike.svg", x: 45, y: 0, effect: 'fade' },
      robot: { image: "robot.svg", x: 45, y: 0, effect: 'scaleUp' },
      book: { image: "book.svg", x: 50, y: 0, effect: 'pulse' },
      mouse: { image: "mouse.svg", x: 70, y: 30, effect: 'scaleUp' },
      basket: { image: "basket.svg", x: 45, y: 0, effect: 'fade' },
      ladybug: { image: "ladybug.svg", x: 45, y: 0, effect: 'scaleUp' }
    }
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
backgroundImage: "forest-background.jpg",
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
    phrase: "On my left I can see ___.",  // New sentence
    words: {
      treasure: { image: "treasure.svg", x: 10, y: 70, effect: 'pulse' },
      basket: { image: "basket.svg", x: 10, y: 70, effect: 'none' },
      monkey: { image: "monkey.svg", x: 10, y: 70, effect: 'none' },
      mouse: { image: "mouse.svg", x: 10, y: 70, effect: 'none' },
      dragon: { image: "dragon.svg", x: 10, y: 70, effect: 'none' },
      ladybug: { image: "ladybug.svg", x: 10, y: 70, effect: 'none' }
    },
  },

  {
    phrase: "To my right  ___.",  
    words: {
      robot: { image: "robot.svg", x: 90, y: 80, effect: 'pulse' },
      knight: { image: "knight.svg", x: 90, y: 80, effect: 'none' },
      butterfly: { image: "butterfly.svg", x: 90, y: 70, effect: 'none' },
      squirrel: { image: "Squirrel.svg", x: 90, y: 80, effect: 'none' },
      boy: { image: "boy.svg", x: 90, y: 80, effect: 'none' },
      ladybug: { image: "ladybug.svg", x: 90, y: 80, effect: 'none' }
    },
  },

  {
    phrase: "We talked to the  ___.",  
    words: {
      robot: { image: "robot.svg", x: 90, y: 80, effect: 'pulse' },
      knight: { image: "knight.svg", x: 90, y: 80, effect: 'none' },
      boy: { image: "boy.svg", x: 90, y: 70, effect: 'none' },
      witch: { image: "witch.svg", x: 90, y: 80, effect: 'none' },
      bear: { image: "bear.svg", x: 90, y: 80, effect: 'none' },
      wizard: { image: "wizard.svg", x: 90, y: 80, effect: 'none' }
    },
  },

  {
    phrase: "We followed the trail of colorful ___.",
    words: {
      leaves: { "image": "leaves.svg", "x": 20, "y": 40, "effect": "scaleUp" },
      flowers: { "image": "flowers.svg", "x": 22, "y": 42, "effect": "fade" },
      berries: { "image": "berries.svg", "x": 25, "y": 45, "effect": "pulse" },
      stones: { "image": "stones.svg", "x": 20, "y": 40, "effect": "flip" },
      feathers: { "image": "feathers.svg", "x": 20, "y": 40, "effect": "upAndDown" },
      mushrooms: { "image": "mushroom.svg", "x": 20, "y": 40, "effect": "sideToSide" }
    }
  },

  {
    phrase: "It was fun to see the ___ playing.",
    words: {
      squirrel: { "image": "squirrel.svg", "x": 20, "y": 40, "effect": "scaleUp" },
      mouse: { "image": "mouse.svg", "x": 22, "y": 42, "effect": "fade" },
      boy: { "image": "boy.svg", "x": 25, "y": 45, "effect": "pulse" },
      robot: { "image": "robot.svg", "x": 20, "y": 40, "effect": "flip" },
      alien: { "image": "alien.svg", "x": 20, "y": 40, "effect": "upAndDown" },
      bee: { "image": "bee.svg", "x": 20, "y": 40, "effect": "sideToSide" }
    }
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
        phrase: "The captain told us to watch out for a floating ___.",
        words: {
          ballon: { image: "ballon.svg", x: 20, y: 25, effect: 'pulse' },
          rock: { image: "rock.svg", x: 20, y: 25, effect: 'scaleUp' },
          cow: { image: "cow.svg", x: 20, y: 20, effect: 'scaleUp' },
          treasure: { image: "treasure.svg", x: 20, y: 25, effect: 'pulse' },
          robot: { image: "robot.svg", x: 20, y: 20, effect: 'pulse' },
          wizard: { image: "wizard.svg", x: 20, y: 20, effect: 'fade' }
        },
      },


      {
        phrase: "We see a colorful ___.",
        words: {
          ballon: { image: "ballon.svg", x: 20, y: 25, effect: 'pulse' },
          rainbow: { image: "rainbow.svg", x: 20, y: 25, effect: 'scaleUp' },
          comet: { image: "comet.svg", x: 20, y: 20, effect: 'scaleUp' },
          treasure: { image: "treasure.svg", x: 20, y: 25, effect: 'pulse' },
          robot: { image: "robot.svg", x: 20, y: 20, effect: 'pulse' },
          planet: { image: "planet.svg", x: 20, y: 20, effect: 'fade' }
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
        phrase: "Above the moon, we sppoted a ___.",
        words: {
          spaceDog: { image: "spacedog.svg", x: 5, y: 70, effect: 'bounce' },
          astronaut: { image: "astronaut.svg", x: 5, y: 70, effect: 'none' },
          wizard: { image: "wizard.svg", x: 5, y: 70, effect: 'spin' },
          treasure: { image: "treasure.svg", x: 20, y: 25, effect: 'pulse' },
          robot: { image: "robot.svg", x: 20, y: 20, effect: 'pulse' },
          alien: { image: "alien.svg", x: 20, y: 20, effect: 'fade' }
        },
      },


      {
        phrase: "The space is a place full of ___.",
        words: {
          stars: { image: "stars.svg", x: 5, y: 70, effect: 'bounce' },
          rocks: { image: "rocks.svg", x: 5, y: 70, effect: 'none' },
          coins: { image: "coins.svg", x: 5, y: 70, effect: 'spin' },
          bubbles: { image: "bubbles.svg", x: 20, y: 25, effect: 'pulse' },
          letters: { image: "letters.svg", x: 20, y: 20, effect: 'pulse' },
          eggs: { image: "eggs.svg", x: 20, y: 20, effect: 'fade' }
        },
      },

      {
        phrase: "We also said hi to a ___.",
        words: {
          alien: { image: "alien.svg", x: 5, y: 70, effect: 'pulse' },
          robot: { image: "robot.svg", x: 5, y: 70, effect: 'sideToSide' },
          spaceCat: { image: "spacecat.svg", x: 5, y: 70, effect: 'fade' },
          spaceDog: { image: "spacedog.svg", x: 5, y: 70, effect: 'bounce' },
          astronaut: { image: "astronaut.svg", x: 5, y: 70, effect: 'none' },
          wizard: { image: "wizard.svg", x: 5, y: 70, effect: 'spin' }
        }
      }
    ],
  },

// NEW STORY - NUMBER 4
{
title: "Under the sea",
backgroundImage: "ocean-background.png",
colorTheme: {
backgroundColor: "#0a0a23", // Deep space blue
buttonColor: "#4d79ff", // Cosmic blue
},
sections: [
  
{
phrase: "It is a beautiful day under the ocean, on our right we see, ___.",
words: {
  bluefish: { image: "bluefish.svg", x: 80, y: 50, effect: 'spin' },
  redfish: { image: "redfish.svg", x: 80, y: 50, effect: 'sideToSide' },
  orangefish: { image: "orangefish.svg", x: 80, y: 50, effect: 'bounce' },
  diver: { image: "scubadiver.svg", x: 80, y: 50, effect: 'flip' },
  seaHorse: { image: "seaHorse.svg", x: 80, y: 50, effect: 'fade' },
  pinkFish: { image: "pinkFish.svg", x: 80, y: 50, effect: 'pulse' }
},
},
{
phrase: "We can see a colorful ___.",
words: {
  mermaid: { image: "mermaid.svg", x: 20, y: 25, effect: 'pulse' },
  coral: { image: "coral.svg", x: 20, y: 25, effect: 'scaleUp' },
  jellyfish: { image: "jellyfish.svg", x: 20, y: 20, effect: 'scaleUp' },
  treasure: { image: "treasure.svg", x: 20, y: 25, effect: 'pulse' },
  robot: { image: "robot.svg", x: 20, y: 20, effect: 'pulse' },
  submarine: { image: "submarine.svg", x: 20, y: 20, effect: 'fade' }
},
},
{
phrase: "On our left we see ___.",
words: {
  bluefish: { image: "bluefish.svg", x: 10, y: 50, effect: 'spin' },
  redfish: { image: "redfish.svg", x: 10, y: 50, effect: 'sideToSide' },
  orangefish: { image: "orangefish.svg", x: 10, y: 50, effect: 'bounce' },
  diver: { image: "scubadiver.svg", x: 10, y: 50, effect: 'flip' },
  seaHorse: { image: "seaHorse.svg", x: 10, y: 50, effect: 'fade' },
  pinkFish: { image: "pinkFish.svg", x: 10, y: 50, effect: 'pulse' }
}
},


{
phrase: "At the bottom of the ocean we discovered ___.",
words: {
  seastar: { image: "seastar.svg", x: 10, y: 50, effect: 'spin' },
  jellyfish: { image: "jellyfish.svg", x: 10, y: 50, effect: 'sideToSide' },
  orangefish: { image: "orangefish.svg", x: 10, y: 50, effect: 'bounce' },
  diver: { image: "scubadiver.svg", x: 10, y: 50, effect: 'flip' },
  seaHorse: { image: "seaHorse.svg", x: 10, y: 50, effect: 'fade' },
  seashell: { image: "seashell.svg", x: 10, y: 50, effect: 'pulse' }
}
},

{
  phrase: "We also spotted a  ___.",
  words: {
    mermaid: { image: "mermaid.svg", x: 10, y: 50, effect: 'spin' },
    jellyfish: { image: "jellyfish.svg", x: 10, y: 50, effect: 'sideToSide' },
    shark: { image: "shark.svg", x: 10, y: 50, effect: 'bounce' },
    diver: { image: "scubadiver.svg", x: 10, y: 50, effect: 'flip' },
    seaHorse: { image: "seaHorse.svg", x: 10, y: 50, effect: 'fade' },
    seashell: { image: "seashell.svg", x: 10, y: 50, effect: 'pulse' }
  }
  },


  {
    phrase: "By the seaweed trying to hide there is a ___.",
    words: {
      whale: { image: "seastar.svg", x: 10, y: 50, effect: 'spin' },
      jellyfish: { image: "jellyfish.svg", x: 10, y: 50, effect: 'sideToSide' },
      orangefish: { image: "orangefish.svg", x: 10, y: 50, effect: 'bounce' },
      diver: { image: "scubadiver.svg", x: 10, y: 50, effect: 'flip' },
      seaHorse: { image: "seaHorse.svg", x: 10, y: 50, effect: 'fade' },
      seashell: { image: "seashell.svg", x: 10, y: 50, effect: 'pulse' }
    }
    },


    {
      phrase: " Near the surface there is a___.",
      words: {
        seastar: { image: "seastar.svg", x: 10, y: 50, effect: 'spin' },
        jellyfish: { image: "jellyfish.svg", x: 10, y: 50, effect: 'sideToSide' },
        orangefish: { image: "orangefish.svg", x: 10, y: 50, effect: 'bounce' },
        diver: { image: "scubadiver.svg", x: 10, y: 50, effect: 'flip' },
        seaHorse: { image: "seaHorse.svg", x: 10, y: 50, effect: 'fade' },
        shark: { image: "shark.svg", x: 10, y: 50, effect: 'pulse' }
      }
      },

{
phrase: "We said hello to a ___.",
words: {
  bluefish: { image: "bluefish.svg", x: 10, y: 50, effect: 'spin' },
  shark: { image: "shark.svg", x: 10, y: 50, effect: 'sideToSide' },
  orangefish: { image: "orangefish.svg", x: 10, y: 50, effect: 'bounce' },
  diver: { image: "scubadiver.svg", x: 10, y: 50, effect: 'flip' },
  seaHorse: { image: "seaHorse.svg", x: 10, y: 50, effect: 'fade' },
  whale: { image: "whale.svg", x: 10, y: 50, effect: 'pulse' }
}
},

],
},

];

export default stories;