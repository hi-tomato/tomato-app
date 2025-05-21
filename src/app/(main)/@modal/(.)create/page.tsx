"use client";
import { useRouter } from "next/navigation";

export default function CreateModal() {
  const router = useRouter();

  const handleClose = () => {
    router.back(); // 모달 닫기
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">새 글 작성</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {/* 실제 글 작성 폼 */}
        <form className="space-y-4">
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg resize-none"
            rows={4}
            placeholder="무슨 일이 일어나고 있나요?"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              게시
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
