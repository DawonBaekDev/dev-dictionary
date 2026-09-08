import Link from "next/link";
import { notFound } from "next/navigation";
import { words } from "@/data/words";
import styles from "./page.module.css";

export default async function WordDetailPage({ params }) {
  const { id } = await params;

  const word = words.find((item) => item.id === Number(id));

  if (!word) {
    notFound();
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <Link href="/" className={styles.backLink}>
          ← 단어 목록으로
        </Link>

        <article className={styles.card}>
          <span className={styles.tag}>{word.category}</span>
          <h1>{word.name}</h1>
          <p className={styles.description}>{word.description}</p>

          <section className={styles.exampleSection}>
            <h2>이렇게 사용해요</h2>
            <p>{word.example}</p>
          </section>
        </article>
      </div>
    </main>
  );
}