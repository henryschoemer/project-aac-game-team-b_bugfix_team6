import React from 'react';

export const HomePageBackgroundMusic: React.FC = () => {
    return(
        <audio id="HomePageBackgroundMusic" autoPlay loop>
            <source src="sounds/StoryQuestHomePageMusic.mp3" type="audio/mp3"/>
            Your browser does not support the audio element.
        </audio>
    );
};