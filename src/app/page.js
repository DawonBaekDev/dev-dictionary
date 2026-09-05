"use client"
import { useState } from "react";
import styles from "./page.module.css";

const terms = [
  {
    id: 1,
    name: "API",
    category: "웹",
    description: "서로 다른 프로그램이 기능이나 데이터를 주고받는 통로",
  },
  {
    id: 2,
    name: "컴포넌트",
    category: "React",
    description: "화면을 구성하는 재사용 가능한 작은 UI 조각",
  },
  {
    id: 3,
    name: "데이터베이스",
    category: "데이터",
    description: "여러 데이터를 체계적으로 저장하고 관리하는 공간",
  },
  {
    id: 4,
    name: "서버",
    category: "웹",
    description: "요청을 받아 필요한 데이터나 기능을 제공하는 프로그램",
  },
  {
    id: 5,
    name: "Props",
    category: "React",
    description: "부모 컴포넌트가 자식 컴포넌트에 전달하는 데이터",
  },
  {
    id: 6,
    name: "MongoDB",
    category: "데이터",
    description: "데이터를 문서 형태로 저장하는 NoSQL 데이터베이스",
  },
]

const categories = ["전체", "웹", "React", "데이터"]

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("전체")

  const filteredTerms = terms.filter((term) => {
    const query = searchQuery.toLowerCase().trim()
    const matchesSearch = 
      term.name.toLowerCase().includes(query) ||
      term.description.toLowerCase().includes(query)
    const matchesCategory = 
      selectedCategory === "전체" ||
      term.category === selectedCategory

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
            <span>{filteredTerms.length}개의 용어</span>
          </div>

          {filteredTerms.length > 0 ? (
            <div className={styles.termGrid}>
              {filteredTerms.map((term) => (
                <article className={styles.termCard} key={term.id}>
                  <span className={styles.tag}>{term.category}</span>
                  <h3>{term.name}</h3>
                  <p>{term.description}</p>
                  <button type="button" className={styles.detailButton}>
                    자세히 보기 →
                  </button>
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