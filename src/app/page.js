"use client"

import { useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import { words, categories } from "@/data/words";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("전체")

  const filteredWords = words.filter((word) => {
    const query = searchQuery.toLowerCase().trim()
    const matchesSearch = 
      word.name.toLowerCase().includes(query) ||
      word.description.toLowerCase().includes(query)
    const matchesCategory = 
      selectedCategory === "전체" ||
      word.category === selectedCategory

    return matchesSearch && matchesCategory
  })

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
          <label htmlFor="term-search" className={styles.srOnly}>
            개발 용어 검색
          </label>

          <input
            id="term-search"
            className={styles.searchInput}
            type="search"
            placeholder="궁금한 개발 용어를 검색해 보세요"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </section>

        <nav className={styles.categories} aria-label="용어 카테고리">
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
            <h2>개발 용어</h2>
            <span>{filteredWords.length}개의 용어</span>
          </div>

          {filteredWords.length > 0 ? (
            <div className={styles.wordGrid}>
              {filteredWords.map((word) => (
                <article className={styles.wordCard} key={word.id}>
                  <span className={styles.tag}>{word.category}</span>
                  <h3>{word.name}</h3>
                  <p>{word.description}</p>
                  <Link 
                    href={`/words/${word.id}`} 
                    className={styles.detailButton}>
                      자세히 보기 →</Link>
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