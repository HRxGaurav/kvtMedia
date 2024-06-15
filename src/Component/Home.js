import React from 'react';
import Graph from './Graph';
import style from './Home.module.css';

const Home = () => {
  const Connect = () =>{
    window.alert("These feature Not developed yet!!")
  }
  return (
    <div className={style.mainDiv}>
      <div className={style.topBar}>
        <div className={style.greetingText}>
          <div className={style.helloText}>Hello, User 👋</div>
          <div className={style.welcomeText}>Welcome to Dashboard</div>
        </div>
        <div className={style.metamaskButton} onClick={Connect}>Connect to Metamask</div>
      </div>
      <Graph />
    </div>
  )
}

export default Home;
