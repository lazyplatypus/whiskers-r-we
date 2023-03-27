import { useState, useEffect } from 'react';
import Head from 'next/head';

import Fuse from 'fuse.js';
import _ from 'lodash';

import styles from '../styles/Home.module.css';
import CodeSampleModal from '../components/CodeSampleModal';

export default function Start({ catFacts }) {
  const [results, setResults] = useState(catFacts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fuse = new Fuse(catFacts, {
    keys: ['fact'],
    threshold: 0.3,
  });

  return (
    <div>
      <Head>
        <title>Core Web Vitals</title>
        <meta name="description" content="Core web vitals walk through" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter"
          rel="stylesheet"
        />
      </Head>

      <main className={styles.container}>
        <h1 className={styles.title}>
          Whiskers R We 
        </h1>

        <div>
          <h2 className={styles.secondaryHeading}>MEOW</h2>
          <input
            type="text"
            placeholder="Search cat facts..."
            className={styles.input}
            onChange={async (e) => {
              const { value } = e.currentTarget;

              const searchResult = fuse
                .search(value)
                .map((result) => result.item);

              const updatedResults = searchResult.length
                ? searchResult
                : catFacts;
              setResults(updatedResults);

              // Fake analytics hit
              console.info({
                searchedAt: _.now(),
              });
            }}
          />

        <ul className={styles.countries}>
            {results.map((catFact, index) => (
              <li key={index} className={styles.catFact}>
                <img src={catFact.imageUrl} alt={`Cat ${index + 1}`} />
                <p>{catFact.fact}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.codeSampleBlock}>
          <h2 className={styles.secondaryHeading}>DO YOU REALLY LIKE CATS?</h2>
          <p>Wanna be smothered</p>
          <button onClick={() => setIsModalOpen(true)}>Show Me</button>
          <CodeSampleModal
            isOpen={isModalOpen}
            closeModal={() => setIsModalOpen(false)}
          />
        </div>
      </main>

      <footer className={styles.footer}>
       meow
      </footer>
    </div>
  );
}

export async function getServerSideProps() {
  const response = await fetch('https://catfact.ninja/facts?limit=10');
  const data = await response.json();

  const fetchRandomCatImages = async () => {
    const response = await fetch(
      `https://api.thecatapi.com/v1/images/search?limit=10`
    );
    const data = await response.json();
    return data.map((image) => image.url);
  };

  const images = await fetchRandomCatImages();

  return {
    props: {
      catFacts: data.data.map((catFact, index) => ({
        fact: catFact.fact,
        length: catFact.length,
        imageUrl: images[index],
      })),
    },
  };
}