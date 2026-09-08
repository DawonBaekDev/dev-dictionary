import mongoose from "mongoose"; 
// MongoDB를 JavaScript로 다룰 수 있게 해주는 Mongoose를 가져온다.

const MONGODB_URI = process.env.MONGODB_URI;
// .env.local에 저장한 MongoDB 연결 주소를 가져온다.
// 중요한 정보이므로 코드에 직접 주소를 작성하지 않는다.

export default async function connectDB() {
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI 환경변수가 없습니다.");
    // 환경변수가 없으면 원인을 알 수 있도록 오류를 발생시킨다.
  }

  await mongoose.connect(MONGODB_URI);
  // 환경변수에 저장된 주소를 사용해 MongoDB에 연결한다.

  return mongoose;
}