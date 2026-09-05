import Link from "next/link";
import { notFound } from "next/navigation";
import { terms } from "@/data/terms";
import styles from "./page.module.css";

export default async function TermDetailPage({ params }) {
  const { id } = await params;

  const term = terms.find((item) => item.id === Number(id));

  if (!term) {
    notFound();
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <Link href="/" className={styles.backLink}>
          ← 단어 목록으로
        </Link>

        <article className={styles.card}>
          <span className={styles.tag}>{term.category}</span>
          <h1>{term.name}</h1>
          <p className={styles.description}>{term.description}</p>

          <section className={styles.exampleSection}>
            <h2>이렇게 사용해요</h2>
            <p>{term.example}</p>
          </section>
        </article>
      </div>
    </main>
  );
}