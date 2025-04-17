// stories.tsx

export interface WordData {
  image: string;
  x: number;
  y: number;
  effect?: 'spin' | 'pulse' | 'fade' | 'bounce' | 'flip' | 'sideToSide' | 'upAndDown' | 'scaleUp' | 'none' | 'SlideAcrossEffect';
  width?: number;
  height?: number;
}

export interface StorySection {
  phrase: string;
  words: { [word: string]: WordData };
}

export interface Story {
  title: string;
  backgroundImage: string;
  colorTheme: {
    backgroundColor: string;
    buttonColor: string;
  };
  difficultyLevels: {
    Easy: StorySection[];
    Medium: StorySection[];
    Hard: StorySection[];
  };
}

const stories: Story[] = [
  {
    title: "The Garden Adventure",
    backgroundImage: "garden-background.webp",
    colorTheme: {
      backgroundColor: "#b4fcdc", // Light green
      buttonColor: "#63d2cb", // Teal
    },
    difficultyLevels: {
      Easy: [
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
          phrase: "And near the flowers, I see a ___.",
          words: {
            bee: { image: "bee.svg", x: 70, y: 50, effect: 'pulse' },
            butterfly: { image: "butterfly.svg", x: 65, y: 45, effect: 'sideToSide' },
            basket: { image: "basket.svg", x: 70, y: 65, effect: 'fade' },
            bear: { image: "bear.svg", x: 70, y: 50, effect: 'flip' },
            bird: { image: "bird.svg", x: 70, y: 50, effect: 'flip' },
            ladybug: { image: "ladybug.svg", x: 70, y: 50, effect: 'pulse' }
          },
        },
        {
          phrase: "In the middle of the clouds there is a ___.",
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
          phrase: "We talked to a ___.",
          words: {
            bee: { image: "bee.svg", x: 20, y: 40, effect: 'fade' },
            boy: { image: "boy.svg", x: 25, y: 35, effect: 'scaleUp' },
            hero: { image: "hero.svg", x: 25, y: 38, effect: 'pulse' },
            witch: { image: "witch.svg", x: 25, y: 35, effect: 'scaleUp' },
            knight: { image: "knight.svg", x: 25, y: 35, effect: 'fade' },
            robot: { image: "robot.svg", x: 20, y: 28, effect: 'scaleUp' }
          },
        },
        {
          phrase: "Flying in the sky was a beautiful ___.",
          words: {
            bird: { image: "bird.svg", x: 20, y: 40, effect: 'fade' },
            airplane: { image: "airplane.svg", x: 25, y: 35, effect: 'scaleUp' },
            hero: { image: "hero.svg", x: 25, y: 38, effect: 'pulse' },
            witch: { image: "witch.svg", x: 25, y: 35, effect: 'scaleUp' },
            butterfly: { image: "butterfly.svg", x: 25, y: 35, effect: 'fade' },
            ballon: { image: "ballon.svg", x: 20, y: 28, effect: 'scaleUp' }
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
      ],
      Medium: [
        {
          phrase: "Look in the garden, there is a big ___.",
          words: {
            mouse: { image: "mouse.svg", x: 30, y: 85, effect: 'flip', width: 90, height: 90 },
            ladybug: { image: "ladybug.svg", x: 31, y: 85, effect: 'sideToSide' },
            bird: { image: "bird.svg", x: 31, y: 85, effect: 'upAndDown' },
            squirrel: { image: "Squirrel.svg", x: 45, y: 65, effect: 'fade' },
            boy: { image: "boy.svg", x: 40, y: 85, effect: 'fade', width: 260, height: 290 },
            bear: { image: "bear.svg", x: 45, y: 65, effect: 'fade' }
          },
        },
        {
          phrase: "And playing quickly on the left was the ___.",
          words: {
            mouse: { image: "mouse.svg", x: 30, y: 85, effect: 'flip', width: 90, height: 90 },
            ladybug: { image: "ladybug.svg", x: 31, y: 85, effect: 'sideToSide' },
            bird: { image: "bird.svg", x: 31, y: 85, effect: 'upAndDown' },
            squirrel: { image: "Squirrel.svg", x: 45, y: 65, effect: 'fade' },
            boy: { image: "boy.svg", x: 40, y: 85, effect: 'fade', width: 260, height: 290 },
            bear: { image: "bear.svg", x: 45, y: 65, effect: 'fade' }
          },
        },
        {
          phrase: "And near the colorful flowers, I see a busy ___.",
          words: {
            bee: { image: "bee.svg", x: 75, y: 45, effect: 'pulse' },
            butterfly: { image: "butterfly.svg", x: 70, y: 40, effect: 'sideToSide' },
            basket: { image: "basket.svg", x: 75, y: 60, effect: 'fade' },
            bear: { image: "bear.svg", x: 75, y: 45, effect: 'flip' },
            bird: { image: "bird.svg", x: 75, y: 45, effect: 'flip' },
            ladybug: { image: "ladybug.svg", x: 75, y: 45, effect: 'pulse' }
          },
        },
        {
          phrase: "In the middle of the white clouds there is a small ___.",
          words: {
            bird: { image: "bird.svg", x: 25, y: 35, effect: 'fade' },
            sun: { image: "sun.svg", x: 30, y: 30, effect: 'scaleUp' },
            moon: { image: "moon.svg", x: 30, y: 33, effect: 'pulse' },
            witch: { image: "witch.svg", x: 30, y: 30, effect: 'scaleUp' },
            balloon: { image: "balloon.svg", x: 30, y: 30, effect: 'fade' },
            rainbow: { image: "rainbow.svg", x: 25, y: 23, effect: 'scaleUp' }
          },
        },
        {
          phrase: "We talked to the friendly ___.",
          words: {
            bee: { image: "bee.svg", x: 25, y: 35, effect: 'fade' },
            boy: { image: "boy.svg", x: 30, y: 30, effect: 'scaleUp' },
            hero: { image: "hero.svg", x: 30, y: 33, effect: 'pulse' },
            witch: { image: "witch.svg", x: 30, y: 30, effect: 'scaleUp' },
            knight: { image: "knight.svg", x: 30, y: 30, effect: 'fade' },
            robot: { image: "robot.svg", x: 25, y: 23, effect: 'scaleUp' }
          },
        },
        {
          phrase: "Flying high in the blue sky was a beautiful ___.",
          words: {
            bird: { image: "bird.svg", x: 25, y: 35, effect: 'fade' },
            airplane: { image: "airplane.svg", x: 30, y: 30, effect: 'scaleUp' },
            hero: { image: "hero.svg", x: 30, y: 33, effect: 'pulse' },
            witch: { image: "witch.svg", x: 30, y: 30, effect: 'scaleUp' },
            butterfly: { image: "butterfly.svg", x: 30, y: 30, effect: 'fade' },
            ballon: { image: "ballon.svg", x: 25, y: 23, effect: 'scaleUp' }
          },
        },
        {
          phrase: "By the big green tree we spotted a small ___.",
          words: {
            treasure: { image: "treasure.svg", x: 25, y: 35, effect: 'fade' },
            basket: { image: "basket.svg", x: 30, y: 30, effect: 'scaleUp' },
            squirrel: { image: "squirrel.svg", x: 30, y: 33, effect: 'pulse' },
            boy: { image: "boy.svg", x: 30, y: 30, effect: 'scaleUp' },
            star: { image: "star.svg", x: 30, y: 30, effect: 'fade' },
            ballon: { image: "ballon.svg", x: 25, y: 23, effect: 'scaleUp' }
          },
        },
        {
          phrase: "The tall tree was full of ripe ___.",
          words: {
            apples: { image: "apples.svg", x: 50, y: 5, effect: 'fade' },
            lanterns: { image: "lantern.svg", x: 50, y: 5, effect: 'scaleUp' },
            flowers: { image: "flower.svg", x: 55, y: 5, effect: 'pulse' },
            birds: { image: "bird.svg", x: 75, y: 35, effect: 'scaleUp' },
            oranges: { image: "orange.svg", x: 50, y: 5, effect: 'fade' },
            cherries: { image: "cherry.svg", x: 50, y: 5, effect: 'scaleUp' }
          }
        }
      ],
      Hard: [
        {
          phrase: "Deep within the lush garden, a tiny ___ was carefully building its nest.",
          words: {
            mouse: { image: "mouse.svg", x: 20, y: 95, effect: 'flip', width: 70, height: 70 },
            ladybug: { image: "ladybug.svg", x: 21, y: 95, effect: 'sideToSide' },
            bird: { image: "bird.svg", x: 21, y: 95, effect: 'upAndDown' },
            squirrel: { image: "Squirrel.svg", x: 35, y: 75, effect: 'fade' },
            boy: { image: "boy.svg", x: 30, y: 95, effect: 'fade', width: 240, height: 270 },
            bear: { image: "bear.svg", x: 35, y: 75, effect: 'fade' }
          },
        },
        {
          phrase: "Silently observing from a high branch, a wise old ___ watched the activity below.",
          words: {mouse: { image: "mouse.svg", x: 20, y: 95, effect: 'flip', width: 70, height: 70 },
          ladybug: { image: "ladybug.svg", x: 21, y: 95, effect: 'sideToSide' },
          bird: { image: "bird.svg", x: 21, y: 95, effect: 'upAndDown' },
          squirrel: { image: "Squirrel.svg", x: 35, y: 75, effect: 'fade' },
          boy: { image: "boy.svg", x: 30, y: 95, effect: 'fade', width: 240, height: 270 },
          bear: { image: "bear.svg", x: 35, y: 75, effect: 'fade' }
          },
          },
          {
          phrase: "Gently swaying amidst the fragrant blossoms, a delicate ___ collected pollen.",
          words: {
          bee: { image: "bee.svg", x: 65, y: 55, effect: 'pulse' },
          butterfly: { image: "butterfly.svg", x: 60, y: 50, effect: 'sideToSide' },
          basket: { image: "basket.svg", x: 65, y: 70, effect: 'fade' },
          bear: { image: "bear.svg", x: 65, y: 55, effect: 'flip' },
          bird: { image: "bird.svg", x: 65, y: 55, effect: 'flip' },
          ladybug: { image: "ladybug.svg", x: 65, y: 55, effect: 'pulse' }
          },
          },
          {
          phrase: "High above the fluffy white clouds, a lone ___ soared gracefully through the vast expanse.",
          words: {
          bird: { image: "bird.svg", x: 15, y: 45, effect: 'fade' },
          sun: { image: "sun.svg", x: 20, y: 40, effect: 'scaleUp' },
          moon: { image: "moon.svg", x: 20, y: 43, effect: 'pulse' },
          witch: { image: "witch.svg", x: 20, y: 40, effect: 'scaleUp' },
          balloon: { image: "balloon.svg", x: 20, y: 40, effect: 'fade' },
          rainbow: { image: "rainbow.svg", x: 15, y: 33, effect: 'scaleUp' }
          },
          },
          {
          phrase: "With a curious gaze, a young ___ listened intently to the rustling leaves.",
          words: {
          bee: { image: "bee.svg", x: 15, y: 45, effect: 'fade' },
          boy: { image: "boy.svg", x: 20, y: 40, effect: 'scaleUp' },
          hero: { image: "hero.svg", x: 20, y: 43, effect: 'pulse' },
          witch: { image: "witch.svg", x: 20, y: 40, effect: 'scaleUp' },
          knight: { image: "knight.svg", x: 20, y: 40, effect: 'fade' },
          robot: { image: "robot.svg", x: 15, y: 33, effect: 'scaleUp' }
          },
          },
          {
          phrase: "Against the backdrop of the azure sky, a vibrant ___ danced on the gentle breeze.",
          words: {
          bird: { image: "bird.svg", x: 15, y: 45, effect: 'fade' },
          airplane: { image: "airplane.svg", x: 20, y: 40, effect: 'scaleUp' },
          hero: { image: "hero.svg", x: 20, y: 43, effect: 'pulse' },
          witch: { image: "witch.svg", x: 20, y: 40, effect: 'scaleUp' },
          butterfly: { image: "butterfly.svg", x: 20, y: 40, effect: 'fade' },
          ballon: { image: "ballon.svg", x: 15, y: 33, effect: 'scaleUp' }
          },
          },
          {
          phrase: "Hidden amongst the gnarled roots of the ancient tree, a shiny ___ glinted in the dim light.",
          words: {
          treasure: { image: "treasure.svg", x: 15, y: 45, effect: 'fade' },
          basket: { image: "basket.svg", x: 20, y: 40, effect: 'scaleUp' },
          squirrel: { image: "squirrel.svg", x: 20, y: 43, effect: 'pulse' },
          boy: { image: "boy.svg", x: 20, y: 40, effect: 'scaleUp' },
          star: { image: "star.svg", x: 20, y: 40, effect: 'fade' },
          ballon: { image: "ballon.svg", x: 15, y: 33, effect: 'scaleUp' }
          },
          },
          {
          phrase: "Reaching towards the heavens, the old oak tree was laden with plump, red ___.",
          words: {
          apples: { image: "apples.svg", x: 40, y: 10, effect: 'fade' },
          lanterns: { image: "lantern.svg", x: 40, y: 10, effect: 'scaleUp' },
          flowers: { image: "flower.svg", x: 45, y: 10, effect: 'pulse' },
          birds: { image: "bird.svg", x: 65, y: 40, effect: 'scaleUp' },
          oranges: { image: "orange.svg", x: 40, y: 10, effect: 'fade' },
          cherries: { image: "cherry.svg", x: 40, y: 10, effect: 'scaleUp' }
          }
          }
          ],
          },
          },
          {
          title: "Walk in the Forest",
          backgroundImage: "forest-background.jpg",
          colorTheme: {
          backgroundColor: "#ffcccb", // Light red
          buttonColor: "#ff6666", // Coral
          },
          difficultyLevels: {
          Easy: [
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
          },
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
          ],
          Medium: [
          {
          phrase: "In the quiet forest, I look high in the sky and see a lone ___.",
          words: {
          bird: { image: "bird.svg", x: 45, y: 10, effect: 'fade' },
          airplane: { image: "airplane.svg", x: 45, y: 10, effect: 'pulse' },
          helicopter: { image: "helicopter.svg", x: 45, y: 10, effect: 'pulse' },
          hero: { image: "hero.svg", x: 45, y: 10, effect: 'fade' },
          cloud: { image: "cloud.svg", x: 45, y: 10, effect: 'scaleUp' },
          sun: { image: "sun.svg", x: 45, y: 10, effect: 'scaleUp' },
          },
          },
          {
          phrase: "Along the winding path, there is a sleepy ___.",  // New sentence
          words: {
          bear: { image: "bear.svg", x: 45, y: 75, effect: 'pulse' },
          basket: { image: "basket.svg", x: 45, y: 75, effect: 'none' },
          monkey: { image: "monkey.svg", x: 45, y: 65, effect: 'none' },
          squirrel: { image: "Squirrel.svg", x: 45, y: 75, effect: 'none' },
          bird: { image: "bird.svg", x: 45, y: 75, effect: 'none' },
          ladybug: { image: "ladybug.svg", x: 45, y: 75, effect: 'none' }
          },
          },
          {
          phrase: "On my left, partially hidden, I can see a glimmering ___.",  // New sentence
          words: {
          treasure: { image: "treasure.svg", x: 15, y: 65, effect: 'pulse' },
          basket: { image: "basket.svg", x: 15, y: 65, effect: 'none' },
          monkey: { image: "monkey.svg", x: 15, y: 65, effect: 'none' },
          mouse: { image: "mouse.svg", x: 15, y: 65, effect: 'none' },
          dragon: { image: "dragon.svg", x: 15, y: 65, effect: 'none' },
          ladybug: { image: "ladybug.svg", x: 15, y: 65, effect: 'none' }
          },
          },
          {
          phrase: "To my right, perched on a branch, a small ___.",
          words: {
          robot: { image: "robot.svg", x: 85, y: 75, effect: 'pulse' },
          knight: { image: "knight.svg", x: 85, y: 75, effect: 'none' },
            butterfly: { image: "butterfly.svg", x: 85, y: 65, effect: 'none' },
            squirrel: { image: "Squirrel.svg", x: 85, y: 75, effect: 'none' },
            boy: { image: "boy.svg", x: 85, y: 75, effect: 'none' },
            ladybug: { image: "ladybug.svg", x: 85, y: 75, effect: 'none' }
          },
        },
        {
          phrase: "We talked quietly to the wise old ___.",
          words: {
            robot: { image: "robot.svg", x: 85, y: 75, effect: 'pulse' },
            knight: { image: "knight.svg", x: 85, y: 75, effect: 'none' },
            boy: { image: "boy.svg", x: 85, y: 65, effect: 'none' },
            witch: { image: "witch.svg", x: 85, y: 75, effect: 'none' },
            bear: { image: "bear.svg", x: 85, y: 75, effect: 'none' },
            wizard: { image: "wizard.svg", x: 85, y: 75, effect: 'none' }
          },
        },
        {
          phrase: "We carefully followed the faint trail of colorful ___.",
          words: {
            leaves: { "image": "leaves.svg", "x": 25, "y": 45, "effect": "scaleUp" },
            flowers: { "image": "flowers.svg", "x": 27, "y": 47, "effect": "fade" },
            berries: { "image": "berries.svg", "x": 30, "y": 50, "effect": "pulse" },
            stones: { "image": "stones.svg", "x": 25, "y": 45, "effect": "flip" },
            feathers: { "image": "feathers.svg", "x": 25, "y": 45, "effect": "upAndDown" },
            mushrooms: { "image": "mushroom.svg", "x": 25, "y": 45, "effect": "sideToSide" }
          },
        },
        {
          phrase: "It was peaceful to see the small ___ playing gently.",
          words: {
            squirrel: { "image": "squirrel.svg", "x": 25, "y": 45, "effect": "scaleUp" },
            mouse: { "image": "mouse.svg", "x": 27, "y": 47, "effect": "fade" },
            boy: { "image": "boy.svg", "x": 30, "y": 50, "effect": "pulse" },
            robot: { "image": "robot.svg", "x": 25, "y": 45, "effect": "flip" },
            alien: { "image": "alien.svg", "x": 25, "y": 45, "effect": "upAndDown" },
            bee: { "image": "bee.svg", "x": 25, "y": 45, "effect": "sideToSide" }
          },
        },
        {
          phrase: "And the little ___ was quietly bouncing near the thick bush.", // Another sentence
          words: {
            boy: { image: "boy.svg", x: 75, y: 65, effect: 'scaleUp' },
            squirrel: { image: "Squirrel.svg", x: 70, y: 65, effect: 'upAndDown' },
            mouse: { image: "mouse.svg", x: 70, y: 65, effect: 'upAndDown' },
            monkey: { image: "monkey.svg", x: 70, y: 65, effect: 'upAndDown' },
            ladybug: { image: "ladybug.svg", x: 70, y: 65, effect: 'upAndDown' },
            bear: { image: "bear.svg", x: 70, y: 65, effect: 'upAndDown' }
          }
        }
      ],
      Hard: [
        {
          phrase: "Deep within the ancient forest, I look towards the towering canopy and see a solitary ___.",
          words: {
            bird: { image: "bird.svg", x: 50, y: 15, effect: 'fade' },
            airplane: { image: "airplane.svg", x: 50, y: 15, effect: 'pulse' },
            helicopter: { image: "helicopter.svg", x: 50, y: 15, effect: 'pulse' },
            hero: { image: "hero.svg", x: 50, y: 15, effect: 'fade' },
            cloud: { image: "cloud.svg", x: 50, y: 15, effect: 'scaleUp' },
            sun: { image: "sun.svg", x: 50, y: 15, effect: 'scaleUp' },
          },
        },
        {
          phrase: "Along the overgrown path, there is a large, lumbering ___.",  // New sentence
          words: {
            bear: { image: "bear.svg", x: 50, y: 70, effect: 'pulse' },
            basket: { image: "basket.svg", x: 50, y: 70, effect: 'none' },
            monkey: { image: "monkey.svg", x: 50, y: 60, effect: 'none' },
            squirrel: { image: "Squirrel.svg", x: 50, y: 70, effect: 'none' },
            bird: { image: "bird.svg", x: 50, y: 70, effect: 'none' },
            ladybug: { image: "ladybug.svg", x: 50, y: 70, effect: 'none' }
          },
        },
        {
          phrase: "On my left, almost completely hidden by foliage, I can see a sparkling ___.",  // New sentence
          words: {
            treasure: { image: "treasure.svg", x: 20, y: 60, effect: 'pulse' },
            basket: { image: "basket.svg", x: 20, y: 60, effect: 'none' },
            monkey: { image: "monkey.svg", x: 20, y: 60, effect: 'none' },
            mouse: { image: "mouse.svg", x: 20, y: 60, effect: 'none' },
            dragon: { image: "dragon.svg", x: 20, y: 60, effect: 'none' },
            ladybug: { image: "ladybug.svg", x: 20, y: 60, effect: 'none' }
          },
        },
        {
          phrase: "To my right, camouflaged perfectly against the bark, a watchful ___.",
          words: {
            robot: { image: "robot.svg", x: 80, y: 70, effect: 'pulse' },
            knight: { image: "knight.svg", x: 80, y: 70, effect: 'none' },
            butterfly: { image: "butterfly.svg", x: 80, y: 60, effect: 'none' },
            squirrel: { image: "Squirrel.svg", x: 80, y: 70, effect: 'none' },
            boy: { image: "boy.svg", x: 80, y: 70, effect: 'none' },
            ladybug: { image: "ladybug.svg", x: 80, y: 70, effect: 'none' }
          },
        },
        {
          phrase: "We spoke in hushed tones to the ancient and knowledgeable ___.",
          words: {
            robot: { image: "robot.svg", x: 80, y: 70, effect: 'pulse' },
            knight: { image: "knight.svg", x: 80, y: 70, effect: 'none' },
            boy: { image: "boy.svg", x: 80, y: 60, effect: 'none' },
            witch: { image: "witch.svg", x: 80, y: 70, effect: 'none' },
            bear: { image: "bear.svg", x: 80, y: 70, effect: 'none' },
            wizard: { image: "wizard.svg", x: 80, y: 70, effect: 'none' }
          },
        },
        {
          phrase: "We meticulously followed the almost invisible trail of vibrant ___.",
          words: {
            leaves: { "image": "leaves.svg", "x": 30, "y": 50, "effect": "scaleUp" },
            flowers: { "image": "flowers.svg", "x": 32, "y": 52, "effect": "fade" },
            berries: { "image": "berries.svg", "x": 35, "y": 55, "effect": "pulse" },
            stones: { "image": "stones.svg", "x": 30, "y": 50, "effect": "flip" },
            feathers: { "image": "feathers.svg", "x": 30, "y": 50, "effect": "upAndDown" },
            mushrooms: { "image": "mushroom.svg", "x": 30, "y": 50, "effect": "sideToSide" }
          },
        },
        {
          phrase: "It was fascinating to observe the agile ___ playfully interacting with its surroundings.",
          words: {
            squirrel: { "image": "squirrel.svg", "x": 30, "y": 50, "effect": "scaleUp" },
            mouse: { "image": "mouse.svg", "x": 32, "y": 52, "effect": "fade" },
            boy: { "image": "boy.svg", "x": 35, "y": 55, "effect": "pulse" },
            robot: { "image": "robot.svg", "x": 30, "y": 50, "effect": "flip" },
            alien: { "image": "alien.svg", "x": 30, y: 50, "effect": "upAndDown" },
            bee: { "image": "bee.svg", "x": 30, y: 50, "effect": "sideToSide" }
          },
        },
        {
          phrase: "And the tiny ___ was energetically bouncing amongst the dense foliage of the bush.", // Another sentence
          words: {
            boy: { image: "boy.svg", x: 70, y: 70, effect: 'scaleUp' },
            squirrel: { image: "Squirrel.svg", x: 65, y: 65, effect: 'upAndDown' },
            mouse: { image: "mouse.svg", x: 65, y: 65, effect: 'upAndDown' },
            monkey: { image: "monkey.svg", x: 65, y: 65, effect: 'upAndDown' },
            ladybug: { image: "ladybug.svg", x: 65, y: 65, effect: 'upAndDown' },
            bear: { image: "bear.svg", x: 65, y: 65, effect: 'upAndDown' }
          }
        }
      ],
    },
  },
  {
    title: "Space Adventure",
    backgroundImage: "space-background.svg",
    colorTheme: {
      backgroundColor: "#0a0a23", // Deep space blue
      buttonColor: "#4d79ff", // Cosmic blue
    },
    difficultyLevels: {
      Easy: [
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
          },
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
          phrase: "The space is is a place full of ___.",
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
      Medium: [
        {
          phrase: "While journeying through space, we spotted a bright ___.",
          words: {
            planet: { image: "planet.svg", x: 75, y: 10, effect: 'spin' },
            comet: { image: "comet.svg", x: 25, y: 15, effect: 'sideToSide' },
            astronaut: { image: "astronaut.svg", x: 85, y: 10, effect: 'bounce' },
            car: { image: "car.svg", x: 15, y: 15, effect: 'flip' },
            alien: { image: "alien.svg", x: 35, y: 20, effect: 'fade' },
            star: { image: "star.svg", x: 90, y: 5, effect: 'pulse' }
          },
        },
        {
          phrase: "On the dusty surface of the moon, we discovered a strange ___.",
          words: {
            flag: { image: "flag.svg", x: 25, y: 30, effect: 'pulse' },
            rock: { image: "rock.svg", x: 15, y: 30, effect: 'scaleUp' },
            cow: { image: "cow.svg", x: 70, y: 25, effect: 'scaleUp' },
            treasure: { image: "treasure.svg", x: 80, y: 30, effect: 'pulse' },
            robot: { image: "robot.svg", x: 5, y: 25, effect: 'pulse' },
            alien: { image: "alien.svg", x: 60, y: 25, effect: 'fade' }
          },
        },
        {
          phrase: "The experienced captain warned us to be cautious of a large floating ___.",
          words: {
            ballon: { image: "ballon.svg", x: 15, y: 30, effect: 'pulse' },
            rock: { image: "rock.svg", x: 80, y: 30, effect: 'scaleUp' },
            cow: { image: "cow.svg", x: 70, y: 25, effect: 'scaleUp' },
            treasure: { image: "treasure.svg", x: 5, y: 30, effect: 'pulse' },
            robot: { image: "robot.svg", x: 60, y: 25, effect: 'pulse' },
            wizard: { image: "wizard.svg", x: 30, y: 25, effect: 'fade' }
          },
        },
        {
          phrase: "Through the spaceship window, we see a vibrant ___.",
          words: {
            ballon: { image: "ballon.svg", x: 15, y: 30, effect: 'pulse' },
            rainbow: { image: "rainbow.svg", x: 80, y: 30, effect: 'scaleUp' },
            comet: { image: "comet.svg", x: 70, y: 25, effect: 'scaleUp' },
            treasure: { image: "treasure.svg", x: 5, y: 30, effect: 'pulse' },
            robot: { image: "robot.svg", x: 60, y: 25, effect: 'pulse' },
            planet: { image: "planet.svg", x: 30, y: 25, effect: 'fade' }
          },
        },
        {
          phrase: "Suddenly, a fast object zipped past our viewport. It was a ___.",
          words: {
            UFO: { image: "ufo.svg", x: 55, y: 55, effect: 'scaleUp' },
            book: { image: "book.svg", x: 45, y: 45, effect: 'fade' },
            rocket: { image: "rocket.svg", x: 55, y: 55, effect: 'upAndDown' },
            airplane: { image: "airplane.svg", x: 45, y: 45, effect: 'scaleUp' },
            shootingStar: { image: "shootingstar.svg", x: 55, y: 55, effect: 'sideToSide' },
            spaceDragon: { image: "dragon.svg", x: 45, y: 45, effect: 'bounce' }
          },
        },
        {
          phrase: "High above the desolate moon, we spotted a curious ___.",
          words: {
            spaceDog: { image: "spacedog.svg", x: 10, y: 75, effect: 'bounce' },
            astronaut: { image: "astronaut.svg", x: 10, y: 75, effect: 'none' },
            wizard: { image: "wizard.svg", x: 10, y: 75, effect: 'spin' },
            treasure: { image: "treasure.svg", x: 25, y: 30, effect: 'pulse' },
            robot: { image: "robot.svg", x: 25, y: 25, effect: 'pulse' },
            alien: { image: "alien.svg", x: 25, y: 25, effect: 'fade' }
          },
        },
        {
          phrase: "The vast expanse of space is a mysterious place full of twinkling ___.",
          words: {
            stars: { image: "stars.svg", x: 10, y: 75, effect: 'bounce' },
            rocks: { image: "rocks.svg", x: 10, y: 75, effect: 'none' },
            coins: { image: "coins.svg", x: 10, y: 75, effect: 'spin' },
            bubbles: { image: "bubbles.svg", x: 25, y: 30, effect: 'pulse' },
            letters: { image: "letters.svg", x: 25, y: 25, effect: 'pulse' },
            eggs: { image: "eggs.svg", x: 25, y: 25, effect: 'fade' }
          },
        },
        {
          phrase: "During our space walk, we also waved hello to a friendly ___.",
          words: {
            alien: { image: "alien.svg", x: 10, y: 75, effect: 'pulse' },
            robot: { image: "robot.svg", x: 10, y: 75, effect: 'sideToSide' },
            spaceCat: { image: "spacecat.svg", x: 10, y: 75, effect: 'fade' },
            spaceDog: { image: "spacedog.svg", x: 10, y: 75, effect: 'bounce' },
            astronaut: { image: "astronaut.svg", x: 10, y: 75, effect: 'none' },
            wizard: { image: "wizard.svg", x: 10, y: 75, effect: 'spin' }
          }
        }
      ],
      Hard: [
        {
          phrase: "Navigating the interstellar void, we observed a distant, swirling ___.",
          words: {
            planet: { image: "planet.svg", x: 85, y: 15, effect: 'spin' },
            comet: { image: "comet.svg", x: 15, y: 20, effect: 'sideToSide' },
            astronaut: { image: "astronaut.svg", x: 90, y: 15, effect: 'bounce' },
            car: { image: "car.svg", x: 5, y: 20, effect: 'flip' },
            alien: { image: "alien.svg", x: 40, y: 25, effect: 'fade' },
            star: { image: "star.svg", x: 95, y: 10, effect: 'pulse' }
          },
        },
        {
          phrase: "Upon the desolate, cratered lunar landscape, we unearthed an ancient ___.",
          words: {
            flag: { image: "flag.svg", x: 30, y: 35, effect: 'pulse' },
            rock: { image: "rock.svg", x: 10, y: 35, effect: 'scaleUp' },
            cow: { image: "cow.svg", x: 75, y: 30, effect: 'scaleUp' },
            treasure: { image: "treasure.svg", x: 85, y: 35, effect: 'pulse' },
            robot: { image: "robot.svg", x: 0, y: 30, effect: 'pulse' },
            alien: { image: "alien.svg", x: 65, y: 30, effect: 'fade' }
          },
        },
        {
          phrase: "The seasoned captain urgently warned us to steer clear of a massive, unpredictable floating ___.",
          words: {
            ballon: { image: "ballon.svg", x: 10, y: 35, effect: 'pulse' },
            rock: { image: "rock.svg", x: 85, y: 35, effect: 'scaleUp' },
            cow: { image: "cow.svg", x: 75, y: 30, effect: 'scaleUp' },
            treasure: { image: "treasure.svg", x: 0, y: 35, effect: 'pulse' },
            robot: { image: "robot.svg", x: 65, y: 30, effect: 'pulse' },
            wizard: { image: "wizard.svg", x: 35, y: 30, effect: 'fade' }
          },
        },
        {
          phrase: "Through the reinforced viewport, we witnessed a breathtaking, kaleidoscopic ___.",
          words: {
            ballon: { image: "ballon.svg", x: 10, y: 35, effect: 'pulse' },
            rainbow: { image: "rainbow.svg", x: 85, y: 35, effect: 'scaleUp' },
            comet: { image: "comet.svg", x: 75, y: 30, effect: 'scaleUp' },
            treasure: { image: "treasure.svg", x: 0, y: 35, effect: 'pulse' },
            robot: { image: "robot.svg", x: 65, y: 30, effect: 'pulse' },
            planet: { image: "planet.svg", x: 35, y: 30, effect: 'fade' }
          },
        },
        {
          phrase: "Suddenly, a sleek, unidentified object streaked past our heavily shielded cockpit. It was a ___.",
          words: {
            UFO: { image: "ufo.svg", x: 60, y: 60, effect: 'scaleUp' },
            book: { image: "book.svg", x: 40, y: 40, effect: 'fade' },
            rocket: { image: "rocket.svg", x: 60, y: 60, effect: 'upAndDown' },
            airplane: { image: "airplane.svg", x: 40, y: 40, effect: 'scaleUp' },
            shootingStar: { image: "shootingstar.svg", x: 60, y: 60, effect: 'sideToSide' },
            spaceDragon: { image: "dragon.svg", x: 40, y: 40, effect: 'bounce' }
          },
        },
        {
          phrase: "High above the desolate, grey moonscape, we spotted a peculiar ___.",
          words: {
            spaceDog: { image: "spacedog.svg", x: 15, y: 80, effect: 'bounce' },
            astronaut: { image: "astronaut.svg", x: 15, y: 80, effect: 'none' },
            wizard: { image: "wizard.svg", x: 15, y: 80, effect: 'spin' },
            treasure: { image: "treasure.svg", x: 30, y: 40, effect: 'pulse' },
            robot: { image: "robot.svg", x: 30, y: 35, effect: 'pulse' },
            alien: { image: "alien.svg", x: 30, y: 35, effect: 'fade' }
          },
        },
        {
          phrase: "The infinite expanse of deep space is an enigmatic realm teeming with countless shimmering ___.",
          words: {
            stars: { image: "stars.svg", x: 15, y: 80, effect: 'bounce' },
            rocks: { image: "rocks.svg", x: 15, y: 80, effect: 'none' },
            coins: { image: "coins.svg", x: 15, y: 80, effect: 'spin' },
            bubbles: { image: "bubbles.svg", x: 30, y: 40, effect: 'pulse' },
            letters: { image: "letters.svg", x: 30, y: 35, effect: 'pulse' },
            eggs: { image: "eggs.svg", x: 30, y: 35, effect: 'fade' }
          },
        },
        {
          phrase: "During our extended extravehicular activity, we also communicated with a curious ___.",
          words: {
            alien: { image: "alien.svg", x: 15, y: 80, effect: 'pulse' },
            robot: { image: "robot.svg", x: 15, y: 80, effect: 'sideToSide' },
            spaceCat: { image: "spacecat.svg", x: 15, y: 80, effect: 'fade' },
            spaceDog: { image: "spacedog.svg", x: 15, y: 80, effect: 'bounce' },
            astronaut: { image: "astronaut.svg", x: 15, y: 80, effect: 'none' },
            wizard: { image: "wizard.svg", x: 15, y: 80, effect: 'spin' }
          }
        }
      ],
    },
  },
  {
    title: "Under the sea",
    backgroundImage: "ocean-background.png",colorTheme: {
      backgroundColor: "#0a0a23", // Deep space blue
      buttonColor: "#4d79ff", // Cosmic blue
    },
    difficultyLevels: {
      Easy: [
        {
          phrase: "It is a beautiful day under the ocean, I see a ___.",
          words: {
            fish: { image: "bluefish.svg", x: 50, y: 70, effect: 'spin' },
            coral: { image: "coral.svg", x: 30, y: 80, effect: 'scaleUp' },
          },
        },
        {
          phrase: "We can see a colorful ___.",
          words: {
            jellyfish: { image: "jellyfish.svg", x: 70, y: 60, effect: 'sideToSide' },
            seashell: { image: "seashell.svg", x: 20, y: 90, effect: 'pulse' },
          },
        },
        {
          phrase: "Look, there is a ___.",
          words: {
            octopus: { image: "octopus.svg", x: 40, y: 85, effect: 'bounce' },
            starfish: { image: "seastar.svg", x: 80, y: 75, effect: 'fade' },
          },
        },
        {
          phrase: "A small ___ is swimming.",
          words: {
            crab: { image: "crab.svg", x: 60, y: 90, effect: 'sideToSide' },
            turtle: { image: "turtle.svg", x: 10, y: 80, effect: 'none' },
          },
        },
      ],
      Medium: [
        {
          phrase: "It is a beautiful day under the deep ocean, I see a bright ___.",
          words: {
            angelfish: { image: "angelfish.svg", x: 55, y: 75, effect: 'spin' },
            brainCoral: { image: "braincoral.svg", x: 35, y: 85, effect: 'scaleUp' },
          },
        },
        {
          phrase: "We can see a translucent and colorful ___ floating gently.",
          words: {
            moonJelly: { image: "moonjelly.svg", x: 75, y: 65, effect: 'sideToSide' },
            spiralShell: { image: "spiralShell.svg", x: 25, y: 95, effect: 'pulse' },
          },
        },
        {
          phrase: "Look closely, there is a shy ___ hiding.",
          words: {
            cuttlefish: { image: "cuttlefish.svg", x: 45, y: 90, effect: 'bounce' },
            sandDollar: { image: "sandDollar.svg", x: 85, y: 80, effect: 'fade' },
          },
        },
        {
          phrase: "A quick, striped ___ is swimming by.",
          words: {
            hermitCrab: { image: "hermitcrab.svg", x: 65, y: 95, effect: 'sideToSide' },
            loggerhead: { image: "loggerhead.svg", x: 15, y: 85, effect: 'none' },
          },
        },
      ],
      Hard: [
        {
          phrase: "In the tranquil depths of the cerulean ocean, I observe a luminescent ___.",
          words: {
            bioluminescentFish: { image: "bioluminescentFish.svg", x: 60, y: 80, effect: 'spin' },
            staghornCoral: { image: "staghorncoral.svg", x: 40, y: 90, effect: 'scaleUp' },
          },
        },
        {
          phrase: "We can discern an ethereal and pulsating ___ drifting serenely.",
          words: {
            portugueseManOWar: { image: "portugueseManOWar.svg", x: 80, y: 70, effect: 'sideToSide' },
            nautilusShell: { image: "nautilusShell.svg", x: 30, y: 100, effect: 'pulse' },
          },
        },
        {
          phrase: "Observe carefully, there is a camouflaged ___ concealed amongst the seaweed.",
          words: {
            mimicOctopus: { image: "mimicOctopus.svg", x: 50, y: 95, effect: 'bounce' },
            seaBiscuit: { image: "seabiscuit.svg", x: 90, y: 85, effect: 'fade' },
          },
        },
        {
          phrase: "A swift, intricately patterned ___ is darting through the currents.",
          words: {
            arrowCrab: { image: "arrowcrab.svg", x: 70, y: 100, effect: 'sideToSide' },
            greenSeaTurtle: { image: "greenseaturtle.svg", x: 20, y: 90, effect: 'none' },
          },
        },
      ],
    },
  },
];

export default stories;