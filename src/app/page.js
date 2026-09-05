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
];

export default function Home() {
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
          />
        </section>

        <nav className={styles.categories} aria-label="용어 카테고리">
          <button className={styles.activeCategory}>전체</button>
          <button>웹</button>
          <button>React</button>
          <button>데이터</button>
        </nav>

        <section>
          <div className={styles.sectionHeader}>
            <h2>개발 용어</h2>
            <span>{terms.length}개의 용어</span>
          </div>

          <div className={styles.termGrid}>
            {terms.map((term) => (
              <article className={styles.termCard} key={term.id}>
                <span className={styles.tag}>{term.category}</span>
                <h3>{term.name}</h3>
                <p>{term.description}</p>
                <button className={styles.detailButton}>
                  자세히 보기 →
                </button>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}