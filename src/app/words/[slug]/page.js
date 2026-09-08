import Link from "next/link";
import { notFound } from "next/navigation";
import connectDB from "@/lib/mongodb";
import Word from "@/models/Word";
import styles from "./page.module.css";

// Mongoose를 사용할 수 있도록 Node.js 환경에서 실행한다.
export const runtime = "nodejs";

// 주소의 slug를 이용해 하나의 단어를 보여주는 상세 페이지다.
export default async function WordDetailPage({ params }) {
  // /words/api로 접속하면 slug에는 "api"가 들어온다.
  const { slug } = await params;

  // 로컬 MongoDB에 연결한다.
  await connectDB();

  // words 컬렉션에서 slug가 일치하는 단어 하나를 찾는다.
  const word = await Word.findOne({ slug }).lean();

  // 일치하는 단어가 없다면 404 페이지를 보여준다.
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