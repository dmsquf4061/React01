import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  const handleGoA = () => {
    navigate("/");
  };

  return (
    <div className="flex h-screen items-center justify-center bg-black p-10">
      <div className="flex flex-col items-center gap-1 text-stone-400">
        <div className="mb-8 text-5xl font-bold">404 ERROR</div>
        <div>페이지를 찾을 수 없습니다.</div>
        <div>존재하지 않는 주소를 입력하셨거나,</div>
        <div>요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.</div>

        <div className="mt-8 flex gap-2">
          <button
            onClick={handleGoA}
            className="
              rounded-lg border border-stone-400
              px-5 py-2
              transition-colors
              hover:bg-stone-400 hover:text-white
            "
          >
            홈으로 이동
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotFound;