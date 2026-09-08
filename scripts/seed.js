import nextEnv from "@next/env";
// CommonJS의 require 대신 ES Module의 import를 사용한다.
import mongoose from "mongoose";

// 앱에서 사용하는 Word 모델을 seed 파일에서도 가져와 재사용한다.
// 일반 Node.js 실행에서는 @ 별칭 대신 상대 경로를 사용해야 한다.
import Word from "../src/models/Word.js";


const { loadEnvConfig } = nextEnv;

// 프로젝트 최상단의 .env.local 파일을 불러온다.
loadEnvConfig(process.cwd());

// MongoDB에 처음 저장할 개발 단어 목록이다.
const seedWords = [
  {
    name: "API",
    slug: "api",
    category: "웹",
    description: "서로 다른 프로그램이 기능이나 데이터를 주고받는 통로",
    example: "날씨 앱이 기상청 API를 통해 날씨 데이터를 받아옵니다.",
    // 상세 페이지에 표시할 코드 종류다.
    codeLanguage: "JavaScript",

    // 백틱을 사용하면 여러 줄의 코드를 문자열로 저장할 수 있다.
    codeExample: `const response = await fetch("/api/words");
    const data = await response.json();

    console.log(data.words);`,
  },
  {
    name: "컴포넌트",
    slug: "component",
    category: "React",
    description: "화면을 구성하는 재사용 가능한 작은 UI 조각",
    example: "버튼과 검색창을 각각 컴포넌트로 만들 수 있습니다.",
    codeLanguage: "JSX",
    codeExample: `function Welcome() {
      return <h1>안녕하세요!</h1>;
    }`,
  },
  {
    name: "데이터베이스",
    slug: "database",
    category: "데이터",
    description: "여러 데이터를 체계적으로 저장하고 관리하는 공간",
    example: "개발 단어의 이름과 설명을 데이터베이스에 저장합니다.",
    codeLanguage: "MongoDB",
    codeExample: `db.words.find({
      category: "React"
    });`,
  },
  {
    name: "변수",
    slug: "variable",
    category: "웹",
    description: "프로그램에서 값을 담아두고 이름으로 다시 사용하는 공간",
    example: "사용자의 이름이나 현재 점수를 변수에 저장할 수 있습니다.",
    codeLanguage: "JavaScript",
    codeExample: `// userName이라는 변수에 문자열을 저장합니다.
    let userName = "다원";

    // let으로 선언한 변수에는 새로운 값을 넣을 수 있습니다.
    userName = "새 이름";`,
  },
  {
    name: "상수",
    slug: "constant",
    category: "웹",
    description: "한 번 값을 넣은 뒤 다른 값으로 다시 대입할 수 없는 변수",
    example: "사이트 이름처럼 바뀌지 않을 값을 상수로 선언합니다.",
    codeLanguage: "JavaScript",
    codeExample: `// const로 선언한 상수에는 새로운 값을 다시 대입할 수 없습니다.
    const siteName = "개발자 단어 사전";

    console.log(siteName);`,
  },
  {
    name: "함수",
    slug: "function",
    category: "웹",
    description: "특정 작업을 하나로 묶어서 필요할 때 실행하는 코드",
    example: "두 숫자를 더하는 작업을 함수로 만들어 반복해서 사용합니다.",
    codeLanguage: "JavaScript",
    codeExample: `// 두 값을 받아 더한 결과를 반환하는 함수입니다.
    function add(a, b) {
      return a + b;
    }

    // 함수를 실행하고 결과를 확인합니다.
    console.log(add(2, 3));`,
  },
  {
    name: "배열",
    slug: "array",
    category: "웹",
    description: "여러 개의 값을 순서대로 모아 저장하는 자료형",
    example: "여러 개발 기술의 이름을 하나의 배열로 관리할 수 있습니다.",
    codeLanguage: "JavaScript",
    codeExample: `// 여러 문자열을 하나의 배열에 저장합니다.
    const skills = ["React", "Next.js", "MongoDB"];

    // 배열의 순서는 0부터 시작합니다.
    console.log(skills[0]);`,
  },
  {
    name: "객체",
    slug: "object",
    category: "웹",
    description: "관련된 값을 속성 이름과 값의 쌍으로 묶어 저장하는 자료형",
    example: "단어의 이름과 카테고리를 하나의 객체로 표현할 수 있습니다.",
    codeLanguage: "JavaScript",
    codeExample: `// 하나의 단어 정보를 객체로 묶어서 저장합니다.
    const word = {
      name: "API",
      category: "웹",
    };

    // 점을 사용해 객체의 속성에 접근합니다.
    console.log(word.name);`,
  },
  {
    name: "조건문",
    slug: "conditional",
    category: "웹",
    description: "조건이 참인지 거짓인지에 따라 다른 코드를 실행하는 문법",
    example: "로그인 여부에 따라 서로 다른 안내 문구를 보여줄 수 있습니다.",
    codeLanguage: "JavaScript",
    codeExample: `// 로그인 상태에 따라 다른 메시지를 출력합니다.
    const isLoggedIn = true;

    if (isLoggedIn) {
      console.log("환영합니다!");
    } else {
      console.log("로그인이 필요합니다.");
    }`,
  },
  {
    name: "반복문",
    slug: "loop",
    category: "웹",
    description: "정해진 조건이나 횟수에 따라 같은 작업을 반복하는 문법",
    example: "배열에 들어 있는 모든 단어를 하나씩 출력할 수 있습니다.",
    codeLanguage: "JavaScript",
    codeExample: `// 배열에 저장된 모든 단어를 차례대로 꺼냅니다.
    const words = ["API", "React", "MongoDB"];

    for (const word of words) {
      console.log(word);
    }`,
  },
  {
    name: "이벤트",
    slug: "event",
    category: "웹",
    description: "클릭이나 입력처럼 브라우저에서 발생하는 사용자의 행동",
    example: "버튼 클릭 이벤트가 발생하면 지정한 함수를 실행할 수 있습니다.",
    codeLanguage: "JavaScript",
    codeExample: `// HTML에서 첫 번째 버튼을 찾습니다.
    const button = document.querySelector("button");

    // 버튼을 클릭하면 함수를 실행합니다.
    button.addEventListener("click", () => {
      console.log("버튼을 클릭했습니다.");
    });`,
  },

  {
    name: "DOM",
    slug: "dom",
    category: "웹",
    description: "브라우저가 HTML 문서를 JavaScript로 다룰 수 있게 만든 객체 구조",
    example: "JavaScript로 제목의 글자를 변경할 때 DOM을 사용합니다.",
    codeLanguage: "JavaScript",
    codeExample: `// HTML에서 첫 번째 h1 요소를 찾습니다.
    const title = document.querySelector("h1");

    // 찾은 요소의 글자를 변경합니다.
    title.textContent = "개발자 단어 사전";`,
  },
  {
    name: "비동기",
    slug: "async-await",
    category: "웹",
    description: "시간이 걸리는 작업을 기다리면서 다른 코드의 실행을 막지 않는 처리 방식",
    example: "서버에서 데이터를 받아오는 작업을 async와 await으로 처리합니다.",
    codeLanguage: "JavaScript",
    codeExample: `// async를 사용하면 함수 안에서 await을 사용할 수 있습니다.
    async function getWords() {
      // 서버의 응답이 도착할 때까지 기다립니다.
      const response = await fetch("/api/words");
      const data = await response.json();

      return data.words;
    }`,
  },
  {
    name: "Promise",
    slug: "promise",
    category: "웹",
    description: "비동기 작업이 나중에 성공하거나 실패한 결과를 나타내는 객체",
    example: "API 요청이 끝난 뒤 전달받은 데이터를 처리할 때 사용합니다.",
    codeLanguage: "JavaScript",
    codeExample: `// fetch가 반환한 Promise가 완료되면 then이 실행됩니다.
    fetch("/api/words")
      .then((response) => response.json())
      .then((data) => console.log(data.words))
      // 요청에 실패하면 catch가 실행됩니다.
      .catch((error) => console.error(error));`,
  },
  {
    name: "JSON",
    slug: "json",
    category: "웹",
    description: "서버와 클라이언트가 데이터를 주고받을 때 자주 사용하는 문자열 형식",
    example: "단어 정보를 JSON 형태로 변환해 API 응답으로 전달합니다.",
    codeLanguage: "JavaScript",
    codeExample: `// JSON으로 변환할 JavaScript 객체입니다.
    const word = {
      name: "API",
      category: "웹",
    };

    // JavaScript 객체를 JSON 문자열로 변환합니다.
    const jsonText = JSON.stringify(word);

    console.log(jsonText);`,
  },
  {
    name: "HTTP",
    slug: "http",
    category: "웹",
    description: "웹 브라우저와 서버가 요청과 응답을 주고받기 위한 통신 규칙",
    example: "브라우저가 HTTP 요청을 보내면 서버가 HTML이나 JSON을 응답합니다.",
    codeLanguage: "JavaScript",
    codeExample: `// GET 방식으로 서버에 단어 목록을 요청합니다.
    const response = await fetch("/api/words", {
      method: "GET",
    });

    // 서버가 보낸 JSON 응답을 JavaScript 객체로 변환합니다.
    const data = await response.json();`,
  },
  {
    name: "URL",
    slug: "url",
    category: "웹",
    description: "인터넷에 있는 페이지나 자원의 위치를 나타내는 주소",
    example: "localhost:3000/admin은 단어 등록 페이지를 가리키는 URL입니다.",
    codeLanguage: "JavaScript",
    codeExample: `// 문자열로 작성된 주소를 URL 객체로 변환합니다.
    const url = new URL(
      "http://localhost:3000/words/api"
    );

    // 주소에서 경로 부분만 확인합니다.
    console.log(url.pathname);`,
  },
  {
    name: "Request",
    slug: "request",
    category: "웹",
    description: "클라이언트가 서버에 데이터나 작업을 요구하는 것",
    example: "브라우저가 서버에 단어 목록을 보내달라는 요청을 전달합니다.",
    codeLanguage: "JavaScript",
    codeExample: `// POST 요청의 body에 새로운 단어 정보를 담아 보냅니다.
    await fetch("/api/words", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "요청",
        slug: "request",
      }),
    });`,
  },
  {
    name: "Response",
    slug: "response",
    category: "웹",
    description: "서버가 클라이언트의 요청을 처리한 뒤 돌려주는 결과",
    example: "서버가 요청받은 단어 목록과 성공 여부를 응답합니다.",
    codeLanguage: "Next.js",
    codeExample: `// GET 요청을 받으면 JSON 형식의 응답을 반환합니다.
    export async function GET() {
      return Response.json({
        message: "요청 성공",
        words: [],
      });
    }`,
  },
  {
    name: "상태 코드",
    slug: "status-code",
    category: "웹",
    description: "HTTP 요청의 처리 결과를 숫자로 알려주는 코드",
    example: "200은 성공, 404는 찾을 수 없음, 500은 서버 오류를 의미합니다.",
    codeLanguage: "Next.js",
    codeExample: `// 새로운 데이터가 생성되었음을 201 상태 코드로 알립니다.
    export async function POST() {
      return Response.json(
        { message: "단어 등록 성공" },
        { status: 201 }
      );
    }`,
  },
  {
    name: "프론트엔드",
    slug: "frontend",
    category: "웹",
    description: "사용자가 브라우저에서 직접 보고 조작하는 화면 영역",
    example: "검색창, 버튼, 단어 카드처럼 사용자에게 보이는 화면을 구현합니다.",
    codeLanguage: "HTML",
    codeExample: `<!-- 사용자가 단어를 검색할 수 있는 입력창입니다. -->
    <label for="search">단어 검색</label>
    <input id="search" type="search" />`,
  },
  {
    name: "백엔드",
    slug: "backend",
    category: "웹",
    description: "서버에서 요청을 처리하고 데이터베이스를 관리하는 영역",
    example: "MongoDB에서 단어를 조회해 API 응답으로 전달합니다.",
    codeLanguage: "Next.js",
    codeExample: `// 데이터베이스에서 모든 단어를 조회합니다.
    export async function GET() {
      const words = await Word.find();

      // 조회한 데이터를 JSON 형식으로 전달합니다.
      return Response.json({ words });
    }`,
  },
  {
    name: "서버",
    slug: "server",
    category: "웹",
    description: "클라이언트의 요청을 받아 처리하고 결과를 보내주는 프로그램",
    example: "Next.js 개발 서버가 페이지와 API 요청을 처리합니다.",
    codeLanguage: "Terminal",
    codeExample: `# Next.js 개발 서버를 실행합니다.
    npm run dev`,
  },
  {
    name: "클라이언트",
    slug: "client",
    category: "웹",
    description: "서버에 요청을 보내고 전달받은 응답을 사용하는 프로그램",
    example: "웹 브라우저는 서버에 페이지를 요청하는 클라이언트입니다.",
    codeLanguage: "JavaScript",
    codeExample: `// 클라이언트에서 서버의 API에 요청을 보냅니다.
    const response = await fetch("/api/words");

    // 서버가 보낸 JSON 데이터를 객체로 변환합니다.
    const data = await response.json();`,
  },
  {
    name: "Node.js",
    slug: "node-js",
    category: "웹",
    description: "브라우저 밖에서도 JavaScript를 실행할 수 있게 해주는 실행 환경",
    example: "Node.js로 Next.js 개발 서버와 seed 스크립트를 실행합니다.",
    codeLanguage: "Terminal",
    codeExample: `# 설치된 Node.js의 버전을 확인합니다.
    node --version

    # JavaScript 파일을 Node.js로 실행합니다.
    node scripts/seed.js`,
  },
  {
    name: "npm",
    slug: "npm",
    category: "웹",
    description: "Node.js 프로젝트의 패키지를 설치하고 명령을 실행하는 도구",
    example: "npm을 사용해 Mongoose를 설치하거나 개발 서버를 실행합니다.",
    codeLanguage: "Terminal",
    codeExample: `# 프로젝트에 Mongoose 패키지를 설치합니다.
    npm install mongoose

    # package.json에 등록된 dev 명령을 실행합니다.
    npm run dev`,
  },
  {
    name: "package.json",
    slug: "package-json",
    category: "웹",
    description: "프로젝트 정보와 명령어, 사용 중인 패키지를 기록하는 파일",
    example: "npm run seed로 실행할 명령을 scripts 항목에 작성합니다.",
    codeLanguage: "JSON",
    codeExample: `{
      "scripts": {
        "dev": "next dev",
        "seed": "node scripts/seed.js"
      }
    }`,
  },
  {
    name: "모듈",
    slug: "module",
    category: "웹",
    description: "기능을 파일 단위로 나누고 다른 파일에서 재사용하는 방식",
    example: "Word 모델을 내보낸 뒤 API 파일에서 가져와 사용합니다.",
    codeLanguage: "JavaScript",
    codeExample: `// add 함수를 다른 파일에서 사용할 수 있도록 내보냅니다.
    export function add(a, b) {
      return a + b;
    }

    // 다른 파일에서 내보낸 함수를 가져옵니다.
    import { add } from "./calculator.js";`,
  },
  {
    name: "Git",
    slug: "git",
    category: "웹",
    description: "코드의 변경 내역을 기록하고 이전 상태를 관리하는 버전 관리 도구",
    example: "기능을 완성한 시점의 코드를 커밋으로 저장합니다.",
    codeLanguage: "Terminal",
    codeExample: `# 변경된 파일과 현재 브랜치를 확인합니다.
    git status

    # 지금까지의 커밋 기록을 확인합니다.
    git log --oneline`,
  },
  {
    name: "브랜치",
    slug: "branch",
    category: "웹",
    description: "기존 코드와 분리된 공간에서 새로운 작업을 진행하는 Git 기능",
    example: "단어 등록 기능을 별도 브랜치에서 만든 뒤 main에 합칩니다.",
    codeLanguage: "Terminal",
    codeExample: `# add-word라는 새 브랜치를 만들고 이동합니다.
    git switch -c add-word

    # 현재 브랜치의 이름을 확인합니다.
    git branch --show-current`,
  },
  {
    name: "map",
    slug: "array-map",
    category: "웹",
    description: "배열의 각 요소를 변환해 새로운 배열을 만드는 JavaScript 메서드",
    example: "단어 배열을 React의 카드 컴포넌트 목록으로 변환할 수 있습니다.",
    codeLanguage: "JavaScript",
    codeExample: `// 숫자 배열의 각 값에 2를 곱해 새로운 배열을 만듭니다.
    const numbers = [1, 2, 3];

    const doubledNumbers = numbers.map((number) => {
      return number * 2;
    });

    console.log(doubledNumbers);`,
  },
  {
    name: "filter",
    slug: "array-filter",
    category: "웹",
    description: "조건을 만족하는 요소만 골라 새로운 배열을 만드는 JavaScript 메서드",
    example: "선택한 카테고리와 일치하는 단어만 화면에 표시할 수 있습니다.",
    codeLanguage: "JavaScript",
    codeExample: `// React 카테고리에 해당하는 단어만 남깁니다.
    const reactWords = words.filter((word) => {
      return word.category === "React";
    });

    console.log(reactWords);`,
  },
  {
    name: "커밋",
    slug: "commit",
    category: "웹",
    description: "Git에서 특정 시점의 변경 내용을 메시지와 함께 저장한 기록",
    example: "단어 등록 기능을 완성한 뒤 변경 내용을 하나의 커밋으로 저장합니다.",
    codeLanguage: "Terminal",
    codeExample: `# 모든 변경 파일을 커밋할 대상으로 추가합니다.
    git add .

    # 변경 내용을 메시지와 함께 기록합니다.
    git commit -m "단어 등록 기능 추가"`,
  },
  {
    name: "useState",
    slug: "use-state",
    category: "React",
    description: "함수 컴포넌트에서 state를 만들고 변경하는 React Hook",
    example: "버튼을 누른 횟수나 입력창의 내용을 화면에 반영할 때 사용합니다.",
    codeLanguage: "JavaScript",
    codeExample: `// useState를 React에서 가져옵니다.
    import { useState } from "react";

    export default function Counter() {
      // count는 현재 값이고 setCount는 값을 변경하는 함수입니다.
      const [count, setCount] = useState(0);

      return (
        <button onClick={() => setCount(count + 1)}>
          클릭 횟수: {count}
        </button>
      );
    }`,
  },
  {
    name: "useEffect",
    slug: "use-effect",
    category: "React",
    description: "화면 렌더링 이후 데이터 요청 같은 부수 작업을 실행하는 React Hook",
    example: "페이지가 처음 나타날 때 API에서 단어 목록을 불러옵니다.",
    codeLanguage: "JavaScript",
    codeExample: `// useEffect를 React에서 가져옵니다.
    import { useEffect } from "react";

    // 빈 배열을 전달하면 처음 렌더링된 뒤 한 번 실행됩니다.
    useEffect(() => {
      fetchWords();
    }, []);`,
  },
  {
    name: "JSX",
    slug: "jsx",
    category: "React",
    description: "JavaScript 파일 안에서 HTML과 비슷한 화면 구조를 작성하는 문법",
    example: "React 컴포넌트가 보여줄 제목과 버튼을 JSX로 작성합니다.",
    codeLanguage: "JavaScript",
    codeExample: `// JSX를 반환하면 React가 화면 요소로 렌더링합니다.
    function Title() {
      const wordCount = 50;

      return (
        <h1>개발 단어 {wordCount}개</h1>
      );
    }`,
  },
  {
    name: "Hook",
    slug: "hook",
    category: "React",
    description: "함수 컴포넌트에서 React의 상태와 기능을 사용할 수 있게 하는 함수",
    example: "useState와 useEffect는 React가 제공하는 대표적인 Hook입니다.",
    codeLanguage: "JavaScript",
    codeExample: `// 이름이 use로 시작하는 사용자 Hook을 만듭니다.
    function useWordCount(words) {
      return words.length;
    }

    // Hook을 호출해 배열에 저장된 단어 수를 구합니다.
    const wordCount = useWordCount(words);`,
  },
  {
    name: "렌더링",
    slug: "rendering",
    category: "React",
    description: "데이터를 바탕으로 사용자가 볼 화면을 만들어 표시하는 과정",
    example: "State가 변경되면 React가 필요한 화면을 다시 렌더링합니다.",
    codeLanguage: "JavaScript",
    codeExample: `// words 배열을 여러 개의 화면 요소로 변환합니다.
    function WordList({ words }) {
      return words.map((word) => (
        <p key={word.slug}>{word.name}</p>
      ));
    }`,
  },
  {
    name: "Key",
    slug: "react-key",
    category: "React",
    description: "React가 목록의 각 요소를 구별할 수 있도록 지정하는 고유한 값",
    example: "단어 목록을 출력할 때 각 단어의 slug를 key로 사용할 수 있습니다.",
    codeLanguage: "JavaScript",
    codeExample: `// 각 단어의 고유한 slug를 key로 전달합니다.
    words.map((word) => (
      <WordCard
        key={word.slug}
        word={word}
      />
    ));`,
  },
  {
    name: "서버 컴포넌트",
    slug: "server-component",
    category: "React",
    description: "서버에서 실행되고 만들어진 결과를 브라우저로 보내는 컴포넌트",
    example: "상세 페이지가 서버에서 MongoDB의 단어를 직접 조회합니다.",
    codeLanguage: "Next.js",
    codeExample: `// App Router의 컴포넌트는 기본적으로 서버에서 실행됩니다.
    export default async function WordPage() {
      // 서버에서 데이터베이스를 직접 조회할 수 있습니다.
      const words = await Word.find();

      return <p>{words.length}개의 단어</p>;
    }`,
  },
  {
    name: "클라이언트 컴포넌트",
    slug: "client-component",
    category: "React",
    description: "브라우저에서 상태나 클릭 이벤트를 사용할 수 있는 컴포넌트",
    example: "검색어를 입력받는 홈 화면은 클라이언트 컴포넌트로 만듭니다.",
    codeLanguage: "Next.js",
    codeExample: `"use client";

    // useState를 사용하려면 클라이언트 컴포넌트여야 합니다.
    import { useState } from "react";

    export default function Search() {
      const [query, setQuery] = useState("");

      return (
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      );
    }`,
  },
  {
    name: "App Router",
    slug: "app-router",
    category: "웹",
    description: "Next.js의 app 폴더 구조를 사용해 페이지와 API 경로를 만드는 방식",
    example: "app/admin/page.js 파일은 /admin 주소의 페이지가 됩니다.",
    codeLanguage: "Next.js",
    codeExample: `// app/about/page.js 파일에 작성합니다.
    export default function AboutPage() {
      return <h1>사이트 소개</h1>;
    }`,
  },
  {
    name: "라우팅",
    slug: "routing",
    category: "웹",
    description: "URL 주소에 따라 사용자에게 알맞은 페이지를 보여주는 기능",
    example: "/admin 주소로 이동하면 단어 등록 페이지가 나타납니다.",
    codeLanguage: "Next.js",
    codeExample: `// Link를 사용하면 새로고침 없이 다른 페이지로 이동합니다.
    import Link from "next/link";

    export default function Menu() {
      return <Link href="/admin">단어 등록</Link>;
    }`,
  },
  {
    name: "동적 라우팅",
    slug: "dynamic-routing",
    category: "웹",
    description: "URL 일부를 변수처럼 받아 여러 데이터의 페이지를 하나의 파일로 처리하는 방식",
    example: "words/[slug]/page.js 하나로 모든 단어의 상세 페이지를 만듭니다.",
    codeLanguage: "Next.js",
    codeExample: `// URL에 들어 있는 slug 값을 꺼냅니다.
    export default async function WordPage({ params }) {
      const { slug } = await params;

      return <h1>{slug}</h1>;
    }`,
  },
  {
    name: "Layout",
    slug: "layout",
    category: "웹",
    description: "여러 페이지가 공통으로 사용하는 화면 구조를 정의하는 Next.js 파일",
    example: "모든 페이지가 공유하는진 HTML과 body 구조를 layout.js에 작성합니다.",
    codeLanguage: "Next.js",
    codeExample: `// children은 현재 주소에 해당하는 페이지 컴포넌트입니다.
export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}`,
  },
  {
    name: "Route Handler",
    slug: "route-handler",
    category: "웹",
    description: "Next.js App Router에서 HTTP 요청을 처리하는 서버 API 함수",
    example: "app/api/words/route.js에서 GET과 POST 요청을 처리합니다.",
    codeLanguage: "Next.js",
    codeExample: `// GET 요청을 받으면 단어 목록을 JSON으로 응답합니다.
    export async function GET() {
      const words = await Word.find();

      return Response.json({ words });
    }`,
  },
  {
    name: "환경 변수",
    slug: "environment-variable",
    category: "웹",
    description: "연결 주소나 비밀번호처럼 코드와 분리해 환경별로 관리하는 값",
    example: "MongoDB 연결 주소를 .env.local의 MONGODB_URI에 저장합니다.",
    codeLanguage: "JavaScript",
    codeExample: `// .env.local에 저장된 MongoDB 연결 주소를 읽습니다.
    const mongoUri = process.env.MONGODB_URI;

    // 연결 주소가 없으면 오류를 발생시킵니다.
    if (!mongoUri) {
      throw new Error("MONGODB_URI가 없습니다.");
    }`,
  },
  {
    name: "MongoDB",
    slug: "mongodb",
    category: "데이터",
    description: "데이터를 JSON과 비슷한 문서 형태로 저장하는 NoSQL 데이터베이스",
    example: "개발 단어 객체를 words 컬렉션에 문서로 저장합니다.",
    codeLanguage: "MongoDB",
    codeExample: `// dev-dictionary 데이터베이스를 선택합니다.
    use("dev-dictionary");

    // words 컬렉션에 저장된 문서를 조회합니다.
    db.words.find();`,
  },
  {
    name: "컬렉션",
    slug: "collection",
    category: "데이터",
    description: "MongoDB에서 비슷한 종류의 문서들을 모아두는 공간",
    example: "words 컬렉션에 여러 개의 개발 단어 문서를 저장합니다.",
    codeLanguage: "MongoDB",
    codeExample: `// words 컬렉션에 새로운 단어 문서를 추가합니다.
    db.words.insertOne({
      name: "API",
      slug: "api",
      category: "웹",
    });`,
  },
  {
    name: "문서",
    slug: "document",
    category: "데이터",
    description: "MongoDB 컬렉션에 저장되는 하나의 데이터 객체",
    example: "API라는 단어의 이름, 설명, 예시가 하나의 문서를 이룹니다.",
    codeLanguage: "MongoDB",
    codeExample: `// slug가 api인 문서 하나를 찾습니다.
    const word = db.words.findOne({
      slug: "api",
    });

    // 찾은 문서의 이름을 확인합니다.
    print(word.name);`,
  },
  {
    name: "스키마",
    slug: "schema",
    category: "데이터",
    description: "데이터에 어떤 필드가 있고 각 필드가 어떤 규칙을 따르는지 정의한 구조",
    example: "단어 데이터에 name, slug, category가 필요하다는 규칙을 정합니다.",
    codeLanguage: "Mongoose",
    codeExample: `// 단어 데이터가 따라야 할 구조를 정의합니다.
    const wordSchema = new mongoose.Schema({
      name: {
        type: String,
        required: true,
      },
      category: {
        type: String,
        required: true,
      },
    });`,
  },
  {
    name: "모델",
    slug: "model",
    category: "데이터",
    description: "스키마를 바탕으로 데이터베이스의 데이터를 조회하고 저장하는 객체",
    example: "Word 모델을 사용해 새로운 단어를 MongoDB에 저장합니다.",
    codeLanguage: "Mongoose",
    codeExample: `// wordSchema를 사용하는 Word 모델을 만듭니다.
    const Word =
      mongoose.models.Word ||
      mongoose.model("Word", wordSchema);

    // Word 모델로 새로운 단어를 저장합니다.
    await Word.create({
      name: "API",
      category: "웹",
    });`,
  },
  {
    name: "Mongoose",
    slug: "mongoose",
    category: "데이터",
    description: "Node.js에서 MongoDB를 편리하게 사용할 수 있도록 도와주는 라이브러리",
    example: "Mongoose로 MongoDB에 연결하고 Word 모델을 사용해 데이터를 관리합니다.",
    codeLanguage: "Mongoose",
    codeExample: `// Mongoose를 가져옵니다.
    import mongoose from "mongoose";

    // 환경 변수에 저장된 주소로 MongoDB에 연결합니다.
    await mongoose.connect(
      process.env.MONGODB_URI
    );`,
  },
  {
    name: "쿼리",
    slug: "query",
    category: "데이터",
    description: "데이터베이스에 원하는 데이터를 조회하거나 변경해 달라고 요청하는 명령",
    example: "React 카테고리에 해당하는 단어만 데이터베이스에서 조회합니다.",
    codeLanguage: "Mongoose",
    codeExample: `// category가 React인 모든 단어를 조회합니다.
    const reactWords = await Word.find({
      category: "React",
    });

    // 조회된 단어의 개수를 확인합니다.
    console.log(reactWords.length);`,
  },
  {
    name: "CRUD",
    slug: "crud",
    category: "데이터",
    description: "데이터를 생성하고 조회하고 수정하고 삭제하는 네 가지 기본 작업",
    example: "단어 등록, 목록 조회, 내용 수정, 단어 삭제 기능이 CRUD에 해당합니다.",
    codeLanguage: "Mongoose",
    codeExample: `// Create: 새로운 단어를 생성합니다.
    await Word.create({ name: "API", slug: "api" });

    // Read: 저장된 단어를 조회합니다.
    await Word.find();

    // Update: 단어의 이름을 수정합니다.
    await Word.updateOne(
      { slug: "api" },
      { name: "API 수정" }
    );

    // Delete: 단어를 삭제합니다.
    await Word.deleteOne({ slug: "api" });`,
  },
  {
    name: "ObjectId",
    slug: "object-id",
    category: "데이터",
    description: "MongoDB가 각 문서를 구별하기 위해 기본으로 생성하는 고유한 식별값",
    example: "MongoDB에 단어를 저장하면 _id 필드에 ObjectId가 자동으로 만들어집니다.",
    codeLanguage: "MongoDB",
    codeExample: `// 특정 ObjectId를 가진 문서 하나를 조회합니다.
    db.words.findOne({
      _id: ObjectId(
        "507f1f77bcf86cd799439011"
      ),
    });`,
  },
  {
    name: "Seed 데이터",
    slug: "seed-data",
    category: "데이터",
    description: "개발이나 테스트를 시작할 때 데이터베이스에 미리 넣어두는 초기 데이터",
    example: "개발 단어 50개를 seed 스크립트로 MongoDB에 미리 저장합니다.",
    codeLanguage: "JavaScript",
    codeExample: `// 데이터베이스에 미리 저장할 초기 데이터입니다.
    const seedWords = [
      {
        name: "API",
        slug: "api",
        category: "웹",
      },
    ];

    // 같은 slug가 있으면 수정하고 없으면 새로 생성합니다.
    for (const word of seedWords) {
      await Word.updateOne(
        { slug: word.slug },
        { $set: word },
        { upsert: true }
      );
    }`,
  },
  {
    name: "RDB",
    slug: "rdb",
    category: "데이터",
    description: "데이터를 행과 열로 구성된 테이블에 저장하고 테이블 사이의 관계를 관리하는 데이터베이스",
    example: "MySQL, PostgreSQL, Oracle은 대표적인 관계형 데이터베이스입니다.",
    codeLanguage: "SQL",
    codeExample: `-- 개발 단어를 저장할 words 테이블을 생성합니다.
    CREATE TABLE words (
      id INT PRIMARY KEY,
      name VARCHAR(100),
      category VARCHAR(50)
    );`,
  },
  {
    name: "SQL",
    slug: "sql",
    category: "데이터",
    description: "관계형 데이터베이스에서 데이터를 조회하고 관리할 때 사용하는 언어",
    example: "SELECT 명령어를 사용해 원하는 조건의 데이터를 조회할 수 있습니다.",
    codeLanguage: "SQL",
    codeExample: `-- React 카테고리에 해당하는 단어를 조회합니다.
    SELECT name, description
    FROM words
    WHERE category = 'React';`,
  },
  {
    name: "NoSQL",
    slug: "nosql",
    category: "데이터",
    description: "테이블 중심의 관계형 구조가 아닌 다양한 형태로 데이터를 저장하는 데이터베이스 방식",
    example: "MongoDB는 데이터를 문서 형태로 저장하는 NoSQL 데이터베이스입니다.",
    codeLanguage: "MongoDB",
    codeExample: `// 테이블 대신 컬렉션에 문서 형태로 저장합니다.
    db.words.insertOne({
      name: "API",
      category: "웹",
      tags: ["서버", "통신"],
    });`,
  },
  {
    name: "테이블",
    slug: "table",
    category: "데이터",
    description: "관계형 데이터베이스에서 같은 종류의 데이터를 행과 열로 저장하는 공간",
    example: "words 테이블에 여러 개발 단어의 정보를 저장할 수 있습니다.",
    codeLanguage: "SQL",
    codeExample: `-- 단어 정보를 저장할 테이블을 생성합니다.
    CREATE TABLE words (
      id INT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      description TEXT
    );`,
  },

  {
    name: "행",
    slug: "row",
    category: "데이터",
    description: "관계형 데이터베이스의 테이블에 저장된 하나의 데이터 묶음",
    example: "words 테이블에서 API 단어의 전체 정보가 하나의 행에 해당합니다.",
    codeLanguage: "SQL",
    codeExample: `-- 새로운 행 하나를 words 테이블에 추가합니다.
    INSERT INTO words (
      id,
      name,
      category
    )
    VALUES (
      1,
      'API',
      '웹'
    );`,
  },
  {
    name: "열",
    slug: "column",
    category: "데이터",
    description: "관계형 데이터베이스의 테이블에서 데이터의 종류와 속성을 나타내는 세로 영역",
    example: "name 열에는 모든 단어의 이름이 저장됩니다.",
    codeLanguage: "SQL",
    codeExample: `-- name과 category 열의 데이터만 조회합니다.
    SELECT name, category
    FROM words;`,
  },
  {
    name: "기본 키",
    slug: "primary-key",
    category: "데이터",
    description: "테이블의 각 행을 고유하게 구별하기 위해 사용하는 값",
    example: "각 단어에 서로 다른 id를 기본 키로 지정할 수 있습니다.",
    codeLanguage: "SQL",
    codeExample: `-- id를 중복될 수 없는 기본 키로 지정합니다.
    CREATE TABLE words (
      id INT PRIMARY KEY,
      name VARCHAR(100) NOT NULL
    );`,
  },
  {
    name: "외래 키",
    slug: "foreign-key",
    category: "데이터",
    description: "한 테이블의 데이터를 다른 테이블의 데이터와 연결하기 위해 사용하는 값",
    example: "단어 테이블의 category_id로 카테고리 테이블을 연결할 수 있습니다.",
    codeLanguage: "SQL",
    codeExample: `-- category_id가 categories 테이블의 id를 참조합니다.
    CREATE TABLE words (
      id INT PRIMARY KEY,
      name VARCHAR(100),
      category_id INT,
      FOREIGN KEY (category_id)
        REFERENCES categories(id)
    );`,
  },
  {
    name: "인덱스",
    slug: "index",
    category: "데이터",
    description: "데이터베이스에서 원하는 데이터를 더 빠르게 찾도록 도와주는 별도의 검색 구조",
    example: "slug에 인덱스를 만들면 특정 단어를 더 빠르게 조회할 수 있습니다.",
    codeLanguage: "MongoDB",
    codeExample: `// slug를 빠르게 검색하고 중복 저장도 막는 인덱스를 생성합니다.
    db.words.createIndex(
      { slug: 1 },
      { unique: true }
    );

    // slug가 api인 문서를 조회합니다.
    db.words.findOne({ slug: "api" });`,
  },
  {
    name: "Aggregation",
    slug: "aggregation",
    category: "데이터",
    description: "여러 데이터를 단계별로 처리해 그룹화하거나 계산된 결과를 만드는 작업",
    example: "카테고리별로 저장된 단어가 몇 개인지 계산할 수 있습니다.",
    codeLanguage: "MongoDB",
    codeExample: `// category가 같은 문서를 묶어 단어 개수를 계산합니다.
    db.words.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
      // 개수가 많은 카테고리부터 정렬합니다.
      {
        $sort: {
          count: -1,
        },
      },
    ]);`,
  },
];

// seed 데이터를 MongoDB에 저장하는 함수다.
async function seedDatabase() {
  try {
    // .env.local에서 로컬 MongoDB 연결 주소를 가져온다.
    const mongoUri = process.env.MONGODB_URI;

    // 연결 주소가 없다면 명확한 오류를 발생시킨다.
    if (!mongoUri) {
      throw new Error("MONGODB_URI 환경변수가 없습니다.");
    }

    // 로컬 MongoDB에 연결한다.
    await mongoose.connect(mongoUri);
    console.log("MongoDB 연결 성공");

    // seedWords의 단어를 하나씩 저장하거나 수정한다.
    for (const word of seedWords) {
      await Word.updateOne(
        // slug가 같은 기존 단어를 찾는다.
        { slug: word.slug },

        // 기존 단어가 있다면 현재 내용으로 수정한다.
        { $set: word },

        {
          // 기존 단어가 없다면 새로 생성한다.
          upsert: true,

          // Word 모델에 정의된 규칙을 검사한다.
          runValidators: true,
        }
      );
    }

    console.log(`${seedWords.length}개의 단어 저장 완료`);
  } catch (error) {
    // 연결이나 저장 과정의 오류를 터미널에 출력한다.
    console.error("Seed 실패:", error.message);
    process.exitCode = 1;
  } finally {
    // 작업이 끝나면 MongoDB 연결을 종료한다.
    await mongoose.disconnect();
  }
}

// seed 함수를 실행한다.
seedDatabase();