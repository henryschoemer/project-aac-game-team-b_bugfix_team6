// hooks/useAACSounds.ts
import useSound from 'use-sound';

const useAACSounds = () => {
    const soundBaseUrl = '/aacSounds/';

    // sound hooks for MP3 files
    const [playAirplane] = useSound(`${soundBaseUrl}airplane.mp3`);
    const [playAlien] = useSound(`${soundBaseUrl}alien.mp3`);
    const [playAstronaut] = useSound(`${soundBaseUrl}astronaut.mp3`);
    const [playBalloon] = useSound(`${soundBaseUrl}balloon.mp3`);
    const [playBasket] = useSound(`${soundBaseUrl}basket.mp3`);
    const [playBear] = useSound(`${soundBaseUrl}bear.mp3`);
    const [playBee] = useSound(`${soundBaseUrl}bee.mp3`);
    const [playBird] = useSound(`${soundBaseUrl}bird.mp3`);
    const [playBook] = useSound(`${soundBaseUrl}book.mp3`);
    const [playBoy] = useSound(`${soundBaseUrl}boy.mp3`);
    const [playButterfly] = useSound(`${soundBaseUrl}butterfly.mp3`);
    const [playCar] = useSound(`${soundBaseUrl}car.mp3`);
    const [playCherries] = useSound(`${soundBaseUrl}cherries.mp3`);
    const [playCloud] = useSound(`${soundBaseUrl}cloud.mp3`);
    const [playComet] = useSound(`${soundBaseUrl}comet.mp3`);
    const [playCow] = useSound(`${soundBaseUrl}cow.mp3`);
    const [playFlag] = useSound(`${soundBaseUrl}flag.mp3`);
    const [playFlowers] = useSound(`${soundBaseUrl}flowers.mp3`);
    const [playHelicopter] = useSound(`${soundBaseUrl}helicopter.mp3`);
    const [playHero] = useSound(`${soundBaseUrl}hero.mp3`);
    const [playLadybug] = useSound(`${soundBaseUrl}ladybug.mp3`);
    const [playLanterns] = useSound(`${soundBaseUrl}lanterns.mp3`);
    const [playMonkey] = useSound(`${soundBaseUrl}monkey.mp3`);
    const [playMoon] = useSound(`${soundBaseUrl}moon.mp3`);
    const [playMouse] = useSound(`${soundBaseUrl}mouse.mp3`);
    const [playOranges] = useSound(`${soundBaseUrl}oranges.mp3`);
    const [playPlanet] = useSound(`${soundBaseUrl}planet.mp3`);
    const [playRainbow] = useSound(`${soundBaseUrl}rainbow.mp3`);
    const [playRobot] = useSound(`${soundBaseUrl}robot.mp3`);
    const [playRock] = useSound(`${soundBaseUrl}rock.mp3`);
    const [playRocket] = useSound(`${soundBaseUrl}rocket.mp3`);
    const [playShootingStar] = useSound(`${soundBaseUrl}shootingStar.mp3`);
    const [playSpaceCat] = useSound(`${soundBaseUrl}spaceCat.mp3`);
    const [playSpaceDog] = useSound(`${soundBaseUrl}spaceDog.mp3`);
    const [playSpaceDragon] = useSound(`${soundBaseUrl}spaceDragon.mp3`);
    const [playSquirrel] = useSound(`${soundBaseUrl}squirrel.mp3`);
    const [playStar] = useSound(`${soundBaseUrl}star.mp3`);
    const [playSun] = useSound(`${soundBaseUrl}sun.mp3`);
    const [playTreasure] = useSound(`${soundBaseUrl}treasure.mp3`);
    const [playUFO] = useSound(`${soundBaseUrl}UFO.mp3`);
    const [playWitch] = useSound(`${soundBaseUrl}witch.mp3`);
    const [playWizard] = useSound(`${soundBaseUrl}wizard.mp3`);

    // play function for each word
    const soundMap: Record<string, () => void> = {
        airplane: playAirplane,
        alien: playAlien,
        astronaut: playAstronaut,
        balloon: playBalloon,
        basket: playBasket,
        bear: playBear,
        bee: playBee,
        bird: playBird,
        book: playBook,
        boy: playBoy,
        butterfly: playButterfly,
        car: playCar,
        cherries: playCherries,
        cloud: playCloud,
        comet: playComet,
        cow: playCow,
        flag: playFlag,
        flowers: playFlowers,
        helicopter: playHelicopter,
        hero: playHero,
        ladybug: playLadybug,
        lanterns: playLanterns,
        monkey: playMonkey,
        moon: playMoon,
        mouse: playMouse,
        oranges: playOranges,
        planet: playPlanet,
        rainbow: playRainbow,
        robot: playRobot,
        rock: playRock,
        rocket: playRocket,
        shootingStar: playShootingStar,
        spaceCat: playSpaceCat,
        spaceDog: playSpaceDog,
        spaceDragon: playSpaceDragon,
        squirrel: playSquirrel,
        star: playStar,
        sun: playSun,
        treasure: playTreasure,
        UFO: playUFO,
        witch: playWitch,
        wizard: playWizard,
    };

    const playSound = (word: string) => {
        const playFunction = soundMap[word];

        if (playFunction) {
            playFunction();
        } else {
            console.warn(`No sound found for word: ${word}`);
        }
    };

    return { playSound };
};

export default useAACSounds;