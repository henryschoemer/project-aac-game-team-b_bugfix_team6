import AnimatedTitle from './HomePage/AnimatedTitle';
import {CreateButton, JoinButton, TemporaryTestingGameButton} from "./HomePage/HomePageButtons";
import Link from 'next/link';
import "./HomePage/HomePageStyles.css";
import {HomePageBackgroundMusic} from "./HomePage/HomePageBackgroundMusic";
import React from 'react';


export default function Home() {
    return (
        <div className="page-container"
             style={{
                 backgroundImage: "url('HomePage-Images/Background.jpg')",
                 backgroundSize: "cover",
             }}>
            <div className="page-content-container">

                {/*Title with animation*/}
            <div className="title-container">
                <AnimatedTitle/>
            </div>

            <div className="button-container">

                {/*CreateButton navigates to create room page*/}
                <div className="button-padding">
                    <div className="button-box">
                        <Link href="/CreateRoom">
                            <CreateButton/>
                        </Link>
                    </div>
                </div>


                {/*JoinButton navigates to join room page*/}

                <div className="button-padding">
                    <div className="button-box">
                        <Link href="/pages">
                            <JoinButton/>
                        </Link>
                    </div>
                </div>

                {/*Button navigates to gameplay
                This button will be removed when we implement the room hosting feature*/}

                <div className="button-padding">
                    <div className="button-box">
                        <Link href="/Gameplay">
                            <TemporaryTestingGameButton/>
                        </Link>
                    </div>
                </div>
            </div>

            {/*Copyright text*/}
            <footer>
                {/*Background music, with play and stop buttons*/}
                <div className="music-slider-container">
                    <HomePageBackgroundMusic/>
                </div>
                <h1 className="copyright-text">Copyright © 2025 StoryQuest</h1>
            </footer>
        </div>
        </div>
    );
}