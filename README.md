<!-- [![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-2972f46106e565e64193e422d61a12cf1da4916b45550586e14ef0a7c637dd04.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=17850489) -->

<div align="center">

# Storyquest: Teamwork Prevails!
[[Report Issue on Jira](https://temple-cis-projects-in-cs.atlassian.net/jira/software/c/projects/AGTB/issues?jql=project%20%3D%20%22AGTB%22%20ORDER%20BY%20created%20DESC)]
[[Deploy Docs](https://github.com/Capstone-Projects-2025-Spring/project-aac-game-team-b)]
[[Documentation Website Link](https://capstone-projects-2025-spring.github.io/project-aac-game-team-b/)]

</div>

## Project Overview

We will develop a game, called "Storyquest: Teamwork Prevails", that aims to maximize communication between children who use 
Augmentative and Alternative Communication (AAC), and children who communicate verbally. This game will be turn-based, and use pictures to encourage communication between two players. We aim to integrate existing AAC technology into this game.

## Keywords

Section #, as well as any words that quickly give your peers insights into the application like programming language, development platform, type of application, etc.

## Project Abstract

This project is a web-based, tablet-friendly "cloze phrase(*)" style story game designed for children to learn how to collaborate, with special considerations regarding players who use Augmentative and Alternative Communication (ACC). In order to promote social inclusion and empathy, the game relies on teammates all communicating and working as a team in order to get the phrase correct. This is done so AAC users don't feel left behind and are actively needed in the group. An embedded or easily accessible AAC-friendly interface ensures minimal screen switching and enables easy participation. The interface dynamically indicates when a child is selecting their answer. 


## High Level Requirement

    1. User Experience (UX) and Design

        **Bright, colorful, and appealing design:** Use vibrant colors and friendly, playful graphics to make the app visually engaging for kids.

        **Simple navigation:** Ensure the interface is easy for children to understand and use. Buttons should be big, clear, and intuitive.

        **Age-appropriate design:** Tailor the experience to the target age group (e.g., for younger kids, minimize text and use icons or pictures).

    2. Accessibility

        **Audio cues and narration:** Some children may not be able to read yet, so using voiceover narration or sound effects can help.

        **Adjustable difficulty levels:** Include settings to adjust the game difficulty to match the child’s skill level.

    3. Engaging Content

        **Interactive elements:** Kids should feel involved and rewarded during the game. Include interactive features like achievements, rewards, or animations.

        **Clear, non-frustrating feedback:** Kids need immediate feedback about their actions in the game, whether it’s positive reinforcement or gentle guidance when they’re stuck.

    4. Multiplayer/Collaboration Features 

        **Social interaction:** If multiplayer, provide safe, controlled interaction options such as pre-set messages or emojis and voice dictation.

        **Cooperative gameplay:** Enable teamwork if it’s a multiplayer game, with easy communication or task sharing.


## Conceptual Design

The website will be built with the Next.js Framework primarily for the front-end, and with Convex for the back-end. The language specifically will be TypeScript and we will likely sprinkle in some TailWind CSS. Docusaurus and GitHub Pages will keep track of project progression. We will use Vercel to seemlessly deploy the game.

## Background

Many current tools on the market are geared towards engaging AAC users, such as the AAC Language Lab1 or AssistiveWare2. 
The AAC Language Lab has web-based games based on stages of learning, and requires a subscription model to use.
There is a gap in the market for learning games based in collaboration between AAC users and non-AAC users.
StoryQuest aims to create a collaborative environment for AAC and non-AAC users to engage in play.
In a study by Schwartz et al.,3 the 31 preschool children with significant developmental disabilities who learned to use Picture Exchange Communication Systems to communicate with adults after 11 months, also learned to communicate with peers without disabilities after an additional 3 months of intervention in integrated, play-based activities.
Social interactions for development remains important at the grade-school level.

## Required Resources

#### Front-End Development
    **Next.js Framework:** A React-based framework to build the website and game logic. Next.js will handle SSR (Server Side Rendering) and routing, helping with performance and SEO.

    **TypeScript:** The primary language for building the app, ensuring type safety and better development experience.

    **Tailwind CSS:** For fast, responsive design that’s customizable and minimalistic.

    **Firebase:** For seamless deployment.

    **Docusaurus:** For maintaining project documentation and tracking progress, ideal for keeping all stakeholders in the loop.

    **GitHub Pages:** For hosting documentation, a project roadmap, or related resources.

#### Back-End Development
    **Firestore:** This real-time serverless backend will handle state persistence, interactions, and user data. It integrates well with Next.js for a smooth full-stack experience.

    **Database (Convex DB):** Convex offers a cloud database to manage game data, player progress, and other relevant information in real-time.

    **Authentication Service:** Consider integrating user authentication (like Firebase Authentication or Auth0) to ensure safety and privacy, especially with children’s accounts.

    **Accessibility APIs:** If the AAC device is connected via web standards, APIs like Web Speech API (for text-to-speech and speech recognition) might be useful.


## Collaborators

[//]: # ( readme: collaborators -start )
<table>
<tr>
    <td align="center">
        <a href="https://github.com/nathaliavalli">
            <img src="img/nathalia_valli.JPG" width="100" height="120" alt="nathalia_valli.jpeg"/>
            <br />
            <sub><b>Nathalia Valli</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/HarpinderFeelsLikeCoding">
            <img src="img/harpinder.webp" width="100;" height="120" alt="harpinder.webp"/>
            <br />
            <sub><b>Harpinder Singh</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/molly-pop">
            <img src="img/molly.webp" width="100" height="120" alt="molly.webp"/>
            <br />
            <sub><b>Molly Barron</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/molly-pop">
            <img src="img/josh.webp" width="100" height="120" alt="josh.webp"/>
            <br />
            <sub><b>Josh Varkley</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/tt50">
            <img src="img/tiffany.webp" width="100" height="120" alt="tiffany.webp"/>
            <br />
            <sub><b>Tiffany Truong</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/shaynaodle">
            <img src="img/shayna.webp" width="100" height="120" alt="shayna.webp"/>
            <br />
            <sub><b>Shayna Odle</b></sub>
        </a>
    </td>
    </tr>
</table>

[//]: # ( readme: collaborators -end )

(*)cloze phrase - a common technique leveraged in speech therapy. Phrases with a word or words intentionally left out, for the purpose of encouraging the listener to fill in the blank. Cloze phrases are used to help children learn language, and can also be used for assessment.

