import Image from "next/image";
import AnimatedTitle from './HomePage/AnimatedTitle';
import {CreateButton, JoinButton, TemporaryTestingGameButton, ProfileButton} from "./HomePage/HomePageButtons";
import Link from 'next/link';
import "./HomePage/HomePageStyles.css";

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

                {/*ProfileButton navigates to profile page*/}
                <div className="button-padding">
                    <div className="button-box">
                        <Link href="/Profile">
                            <ProfileButton/>
                        </Link>

                    </div>
                </div>

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
                        <Link href="/JoinRoom">
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
                <h1 className="copyright-text">Copyright © 2025 StoryQuest</h1>
            </footer>
        </div>
        </div>
    );
}