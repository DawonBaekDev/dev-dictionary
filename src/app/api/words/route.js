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