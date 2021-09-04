import React from 'react'

const About = () => {
    return (
        <div className={`content-width mt main p-4`}>
            <p class="w-100">
                This project is made by Maksims Ļiskins. 
                I am Frontend/WEB developer with &gt; 1 year work experience.
                Site is written with Laravel + React JS.
                Below you can find useful links:
            </p>
            <div>
                <ul>
                    <li>
                        <a href="https://github.com/Kerchik" target="_blank">Github</a>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com/in/maksims-%C4%BCiskins-75a04421b/" target="_blank">LinkedIn</a>
                    </li>
                    <li>
                        <a href="mailto:maksims.liskins@inbox.lv">Email</a>
                    </li>
                    <li>
                        <a href="/Liskins_CV.pdf" download>CV</a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default About