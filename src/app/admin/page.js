"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";

// 입력창의 처음 상태다.
const initialForm = {
  name: "",
  slug: "",
  category: "웹",
  description: "",
  example: "",
  codeLanguage: "JavaScript",
  codeExample: "",
};

export default function AdminPage() {
  // 사용자가 입력한 모든 값을 하나의 객체로 관리한다.
  const [formData, setFormData] = useState(initialForm);

  // 등록 결과 메시지를 저장한다.
  const [result, setResult] = useState({
    type: "",
    message: "",
  });

  // 중복 제출을 막기 위해 요청 상태를 저장한다.
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 입력창의 값이 바뀔 때 해당 항목만 수정한다.
  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  }

  // 등록 버튼을 눌렀을 때 실행된다.
  async function handleSubmit(event) {
    // 폼의 기본 새로고침 동작을 막는다.
    event.preventDefault();

    setIsSubmitting(true);
    setResult({
      type: "",
      message: "",
    });

    try {
      // 입력한 내용을 POST 방식으로 API에 전달한다.
      const response = await fetch("/api/words", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      // 400, 409, 500 등의 응답이면 오류로 처리한다.
      if (!response.ok) {
        throw new Error(data.message);
      }

      // 등록에 성공하면 메시지를 보여주고 입력창을 초기화한다.
      setResult({
        type: "success",
        message: data.message,
      });
      setFormData(initialForm);
    } catch (error) {
      setResult({
        type: "error",
        message: error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <Link href="/" className={styles.backLink}>
          ← 단어 목록으로
        </Link>

        <section className={styles.card}>
          <h1>새 단어 등록</h1>
          <p className={styles.introduction}>
            개발 단어와 쉬운 설명을 입력해 주세요.
          </p>

          <form className={styles.form} onSubmit={handleSubmit}>
            <label>
              단어
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="예: 프레임워크"
                required
              />
            </label>

            <label>
              주소 이름
              <input
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                placeholder="예: framework"
                required
              />
            </label>

            <label>
              카테고리
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="웹">웹</option>
                <option value="React">React</option>
                <option value="데이터">데이터</option>
                <option value="기타">기타</option>
              </select>
            </label>

            <label>
              쉬운 설명
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="초보자도 이해할 수 있게 설명해 주세요."
                rows="4"
                required
              />
            </label>

            <label>
              사용 예시
              <textarea
                name="example"
                value={formData.example}
                onChange={handleChange}
                placeholder="실제 상황에서 사용하는 예시를 입력해 주세요."
                rows="4"
                required
              />
            </label>

            <label>
                코드 종류
                <select
                    name="codeLanguage"
                    value={formData.codeLanguage}
                    onChange={handleChange}
                >
                    <option value="JavaScript">JavaScript</option>
                    <option value="JSX">JSX</option>
                    <option value="Node.js">Node.js</option>
                    <option value="MongoDB">MongoDB</option>
                    <option value="Terminal">Terminal</option>
                </select>
            </label>

            <label>
                코드 사용 예시
                <textarea
                    name="codeExample"
                    value={formData.codeExample}
                    onChange={handleChange}
                    placeholder={`const message = "Hello";\nconsole.log(message);`}
                    rows="8"
                    required
                />
            </label>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "등록 중..." : "단어 등록"}
            </button>
          </form>

          {result.message && (
            <p
              className={
                result.type === "success"
                  ? styles.success
                  : styles.error
              }
            >
              {result.message}
            </p>
          )}
        </section>
      </div>
    </main>
  );
}