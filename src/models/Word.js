import mongoose from "mongoose";

const wordSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        slug: {
            type: String,
            required: true,
            unique: true
        },
        category: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        example: {
            type: String,
            required: true
        },
        // 코드가 어떤 종류인지 표시한다.
        // 예: JavaScript, JSX, Node.js, MongoDB
        codeLanguage: {
        type: String,
        default: "JavaScript",
        },

        // 실제 코드 사용 예시를 문자열로 저장한다.
        // 기존 단어에는 이 필드가 없으므로 필수 항목으로 지정하지 않는다.
        codeExample: {
        type: String,
        default: "",
        },
    },
    {
        timestamps: true
    }
)

const Word = mongoose.models.Word || mongoose.model("Word", wordSchema)

export default Word