import connectDB from "@/lib/mongodb";
import Word from "@/models/Word";

// Mongoose는 Node.js 환경에서 실행되어야 한다.
export const runtime = "nodejs";

// /api/words로 들어오는 GET 요청을 처리한다.
export async function GET() {
  try {
    // .env.local의 주소를 사용해 MongoDB에 연결한다.
    await connectDB();

    // words 컬렉션의 모든 단어를 이름순으로 조회한다.
    // lean()은 조회 결과를 일반 JavaScript 객체로 반환한다.
    const words = await Word.find({})
      .sort({ name: 1 })
      .lean();

    // MongoDB의 _id를 브라우저에서 사용할 수 있는 문자열로 바꾼다.
    const serializedWords = words.map((word) => ({
      ...word,
      _id: word._id.toString(),
    }));

    // 조회한 단어 목록을 JSON 형태로 응답한다.
    return Response.json({
      words: serializedWords,
    });
  } catch (error) {
    // 연결이나 조회가 실패하면 오류 메시지와 상태 코드 500을 전달한다.
    return Response.json(
      {
        message: "단어 목록을 불러오지 못했습니다.",
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

// /api/words로 들어오는 POST 요청을 처리한다.
export async function POST(request) {
  try {
    // 브라우저가 보낸 JSON 데이터를 JavaScript 객체로 변환한다.
    const body = await request.json();

    // 브라우저가 전송한 각 입력값을 body 객체에서 꺼낸다.
    const {
      name,
      slug,
      category,
      description,
      example,
      codeLanguage,
      codeExample,
    } = body;

    // 모든 값이 문자열이고 내용이 입력되어 있는지 검사한다.
    const requiredValues = [
      name,
      slug,
      category,
      description,
      example,
      codeExample,
    ];

    const hasEmptyValue = requiredValues.some(
      (value) =>
        typeof value !== "string" || value.trim() === ""
    );

    if (hasEmptyValue) {
      return Response.json(
        {
          message: "모든 항목을 입력해 주세요.",
        },
        {
          status: 400,
        }
      );
    }

    // 주소에 사용할 slug를 소문자로 통일한다.
    const normalizedSlug = slug.toLowerCase().trim();

    // slug에는 영문 소문자, 숫자, 하이픈만 허용한다.
    if (!/^[a-z0-9-]+$/.test(normalizedSlug)) {
      return Response.json(
        {
          message: "주소 이름은 영문, 숫자, 하이픈만 사용할 수 있습니다.",
        },
        {
          status: 400,
        }
      );
    }

    // 로컬 MongoDB에 연결한다.
    await connectDB();

    // 같은 slug를 사용하는 단어가 있는지 확인한다.
    const existingWord = await Word.findOne({
      slug: normalizedSlug,
    });

    if (existingWord) {
      return Response.json(
        {
          message: "이미 같은 주소 이름을 사용하는 단어가 있습니다.",
        },
        {
          status: 409,
        }
      );
    }

    // 검사를 통과한 단어를 MongoDB에 저장한다.
    const createdWord = await Word.create({
      name: name.trim(),
      slug: normalizedSlug,
      category: category.trim(),
      description: description.trim(),
      example: example.trim(),

      // 선택한 코드 종류와 입력한 코드를 MongoDB에 함께 저장한다.
      codeLanguage: codeLanguage.trim(),
      codeExample: codeExample.trim(),
    });

    // 생성된 MongoDB 문서를 일반 객체로 바꾼다.
    const wordObject = createdWord.toObject();

    return Response.json(
      {
        message: "새 단어가 등록되었습니다.",
        word: {
          ...wordObject,
          _id: wordObject._id.toString(),
        },
      },
      {
        // 201은 새로운 데이터 생성에 성공했다는 상태 코드다.
        status: 201,
      }
    );
  } catch (error) {
    return Response.json(
      {
        message: "단어 등록에 실패했습니다.",
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}