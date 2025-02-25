import Image from "next/image";
import AnimatedTitle from '@/app/HomePage/AnimatedTitle';
import {CreateButton, JoinButton} from "@/app/HomePage/HomePageButtons";

import "@/app/HomePage/HomePageStyles.css";

export default function Home() {
    return (
        <div className="page-container"
             style={{
                 backgroundImage: "url('HomePage-Images/Background.jpg')",
                 backgroundSize: "cover",
             }}>
            <div className="title-container">
                <AnimatedTitle/>
            </div>

            <div className="button-container">

                <div className="button-padding">
                    <div className="button-box">
                        <CreateButton/>
                    </div>
                </div>
                <div className="button-padding">
                    <div className="button-box">
                        <JoinButton/>
                    </div>
                </div>
            </div>
            <footer>
                <h1 className="copyright-text">Copyright © 2025 StoryQuest</h1>
            </footer>
        </div>
    );
}