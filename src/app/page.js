"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";

// 현재 제공하는 검색 카테고리 목록이다.
const categories = ["전체", "웹", "React", "데이터"];

export default function Home() {
  // MongoDB에서 불러온 단어 목록을 저장한다.
  const [words, setWords] = useState([]);

  // 사용자가 입력한 검색어를 저장한다.
  const [searchQuery, setSearchQuery] = useState("");

  // 사용자가 선택한 카테고리를 저장한다.
  const [selectedCategory, setSelectedCategory] = useState("전체");

  // 데이터를 불러오는 중인지 저장한다.
  const [isLoading, setIsLoading] = useState(true);

  // 데이터를 불러오다가 발생한 오류 메시지를 저장한다.
  const [error, setError] = useState("");

  // 페이지가 처음 화면에 나타날 때 한 번 실행된다.
  useEffect(() => {
    async function fetchWords() {
      try {
        // 우리가 만든 /api/words API에 단어 목록을 요청한다.
        const response = await fetch("/api/words");

        // 정상 응답이 아니라면 catch 부분으로 이동시킨다.
        if (!response.ok) {
          throw new Error("단어 데이터를 불러오지 못했습니다.");
        }

        // JSON 응답을 JavaScript 객체로 변환한다.
        const data = await response.json();

        // API에서 받은 단어 배열을 상태에 저장한다.
        setWords(data.words);
      } catch (error) {
        // 오류가 발생하면 사용자에게 보여줄 문장을 저장한다.
        setError(error.message);
      } finally {
        // 성공과 실패 여부에 관계없이 로딩을 종료한다.
        setIsLoading(false);
      }
    }

    fetchWords();
  }, []);

  // 검색어와 선택한 카테고리에 맞는 단어만 남긴다.
  const filteredWords = words.filter((word) => {
    // 검색어를 소문자로 바꾸고 앞뒤 공백을 제거한다.
    const query = searchQuery.toLowerCase().trim();

    const matchesSearch =
      word.name.toLowerCase().includes(query) ||
      word.description.toLowerCase().includes(query);

    const matchesCategory =
      selectedCategory === "전체" ||
      word.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>BEGINNER DEV DICTIONARY</p>
          <h1 className={styles.title}>개발자 단어 사전</h1>
          <p className={styles.introduction}>
            어려운 개발 용어를 초보자의 눈높이로 설명해 드려요.
          </p>
        </header>

        <section className={styles.searchSection}>
          <label htmlFor="word-search" className={styles.srOnly}>
            개발 단어 검색
          </label>

          <input
            id="word-search"
            className={styles.searchInput}
            type="search"
            placeholder="궁금한 개발 단어를 검색해 보세요"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </section>

        <nav className={styles.categories} aria-label="단어 카테고리">
          {categories.map((category) => (
            <button
              type="button"
              key={category}
              className={
                selectedCategory === category
                  ? styles.activeCategory
                  : ""
              }
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </nav>

        <section>
          <div className={styles.sectionHeader}>
            <h2>개발 단어</h2>
            <span>{filteredWords.length}개의 단어</span>
          </div>

          {isLoading ? (
            <p className={styles.emptyState}>
              단어를 불러오는 중입니다...
            </p>
          ) : error ? (
            <p className={styles.emptyState}>{error}</p>
          ) : filteredWords.length > 0 ? (
            <div className={styles.wordGrid}>
              {filteredWords.map((word) => (
                <article className={styles.wordCard} key={word._id}>
                  <span className={styles.tag}>{word.category}</span>
                  <h3>{word.name}</h3>
                  <p>{word.description}</p>

                  {/* 숫자 ID 대신 읽기 쉬운 slug를 주소로 사용한다. */}
                  <Link
                    href={`/words/${word.slug}`}
                    className={styles.detailButton}
                  >
                    자세히 보기 →
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <p className={styles.emptyState}>
              검색 결과가 없습니다. 다른 단어를 검색해 보세요.
            </p>
          )}
        </section>
      </div>
    </main>
  );
}