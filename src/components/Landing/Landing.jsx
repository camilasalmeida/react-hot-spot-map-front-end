// src/components/Landing.jsx
import styles from './Landing.module.css';
import { Link } from 'react-router-dom';


const Landing = () => {
    return (
        <>
        <main className={styles.container}>
                {/* Section 1: Header */}
            <header className={styles.header}>
                    <h1>The HotSpotMap</h1>
            </header>
            
                {/* Section 2: Intro */}
            <section className={styles.about}> 
                        <h3>Sign up to unlock the door to exclusive spots and uncover your secret dashboard of hidden gems.🗝️ </h3>
                        <p>HotSpotMap makes it simple to plan your next gathering. Add your favorite locations, share important details, and invite your guests effortlessly. As soon as you send an invitation, your guests will receive all the event details via email, making it easy to create lasting memories together.</p>
            </section>
            <section className={styles.cta}>
                    <Link to="/signup" className={styles.joinNowButton}>JOIN NOW</Link>
            </section>

                {/* Section 3: Testimonials */}
            <section className={styles.testimonial}>
                    <header>
                        <h2>TESTIMONIALS</h2>
                    </header>

                    <article>
                        <p>"It was so easy to send invites and keep everything organized. Highly recommend!"</p>
                        <footer>– Emily R.</footer>
                    </article>
                    <article>
                        <p>"HotSpotMap made setting up my date effortless. I added the location, sent the invite, and it felt like I had everything planned perfectly—she was really impressed!"</p>
                        <footer>– Alex T.</footer>
                    </article>
                    <article>
                        <p>"Using HotSpotMap was a game-changer! I planned a surprise outing, and the invitation process made it feel so seamless. My date couldn't stop smiling all day!"</p>
                        <footer>– Ryan M.</footer>
                    </article>
            </section>

                {/* Section 4: Call to Action */}
                <section className={styles.cta}>
                    <Link to="/signup" className={styles.joinNowButton}>JOIN NOW</Link>
            </section>
        
        </main>
   
        </>
    )
}

export default Landing