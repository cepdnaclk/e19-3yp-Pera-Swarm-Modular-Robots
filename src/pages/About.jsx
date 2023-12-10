import React, { useEffect } from "react";
import Overview from "../components/Overview/Overview";
import Profile from "../components/Profile/Profile";
import kalindu from "../assets/kalindu.jpg";
import sanka from "../assets/sanka.jfif";
import manodya from "../assets/manodya.jfif";
import geethal from "../assets/geethal.jpg";
import nadun from "../assets/nadun.jpg";
import supervisor from "../assets/supervisor.png";
import "../css/About.css";
import AOS from "aos";
import "aos/dist/aos.css";
import "../css/About.css";

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, offset: 200, once: true });
  }, []);
  return (
    <>
      <Overview
        heading="Modular robot developed for multipurpose uses"
        text="About the team and Supervisors"
      />
      <div className="title" data-aos="fade-up">
        <h1>Our Team</h1>
      </div>

      <div className="card-set" data-aos="fade-up">
        <Profile
          imageUrl={nadun}
          name="Nandun Jayawardhana"
          regNo="E/19/170"
          githubUsername="nandun00"
        />
        <Profile
          imageUrl={sanka}
          name=" Sanka  Peeris"
          regNo="E/19/275"
          githubUsername="sanka-p "
        />
        <Profile
          imageUrl={manodya}
          name="Manodya Senevirathne"
          regNo="E/19/366"
          githubUsername="manodyaSenevirathne"
        />
        <Profile
          imageUrl={geethal}
          name="Geethal Wickramasingha"
          regNo="E/19/436"
          githubUsername="GeethalWickramasingha"
        />
        <Profile
          imageUrl={kalindu}
          name="Kalindu Wijerathne"
          regNo="E/19/446"
          githubUsername="KalinduWijerathna"
        />
      </div>
      <div className="title" data-aos="fade-up">
        <h1>Project Supervisor</h1>
      </div>
      <div className="card-set" data-aos="fade-up">
        <Profile
          imageUrl={supervisor}
          name="Dr.Isuru Nawinne"
          regNo="Senior Lecture"
        />
      </div>
    </>
  );
};

export default About;
