import { NextRequest, NextResponse } from "next/server";

// 모바일 결제 구현
export async function GET(req: NextRequest) {
  const { searchParams, origin } = req.nextUrl;
  const paymentId = searchParams.get("paymentId");
  const code = searchParams.get("code");
  const message = searchParams.get("message");

  if (code) {
    // 실패
    console.error("모바일 결제 실패 => ", message, code);
    return NextResponse.json(
      { message: "결제를 처리하는 데 실패했습니다. 다시 시도해주세요." },
      { status: Number(code) }
    );
  }
  try {
    const response = await fetch(`${origin}/api/payment/complete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paymentId }),
    });

    if (!response.ok) {
      throw new Error(`결제 완료 API 호출 실패: ${response.statusText}`);
    }

    return NextResponse.json({
      status: "success",
      message: "결제 처리가 완료되었습니다.",
    });
  } catch (error) {
    console.error("결제 완료 API 호출 중 에러 발생:", error);
    return NextResponse.json(
      { status: "failed", message: "결제 처리 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
