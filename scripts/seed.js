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
  },
  {
    name: "컴포넌트",
    slug: "component",
    category: "React",
    description: "화면을 구성하는 재사용 가능한 작은 UI 조각",
    example: "버튼과 검색창을 각각 컴포넌트로 만들 수 있습니다.",
  },
  {
    name: "데이터베이스",
    slug: "database",
    category: "데이터",
    description: "여러 데이터를 체계적으로 저장하고 관리하는 공간",
    example: "개발 단어의 이름과 설명을 데이터베이스에 저장합니다.",
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