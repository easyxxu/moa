export const RESPONSE_MESSAGE = {
  ERROR: {
    VALIDATION: {
      REQUIRED: "필수 입력입니다.",
      EMAIL: "이메일 형식에 맞지 않는 메일 주소입니다. 다시 입력해주세요.",
      PASSWORD:
        "비밀번호는 6글자 이상, 최소 1글자의 영어 대소문자, 숫자, 특수문자가 들어가야 합니다.",
      PHONE: "전화번호는 숫자만 입력 가능합니다.",
      INPUT: "입력한 내용이 형식에 맞지 않습니다.",
      QUESTION_CONTENT: "5자 이상 적어주세요.",
      STAR_RATING: "별점을 선택해주세요.",
      REVIEW_CONTENT: "최소 15자 이상 작성해주세요.",
    },
    AUTH: {
      EMAIL_EXISTS: "이미 사용 중인 이메일입니다.",
      INVALID_CREDENTIALS:
        "이메일 또는 비밀번호가 잘못되었습니다. 다시 입력해주세요.",
      USER_TYPE: "로그인 유형(판매자 또는 구매자)을 다시 확인해주세요.",
    },
    SERVER: {
      ERROR: "서버 에러가 발생했습니다. 잠시 후 다시 시도해 주세요.",
      TOO_MANY_REQUESTS:
        "요청이 많아 에러가 발생했습니다. 잠시 후 다시 시도해 주세요.",
    },
    USER: {
      GET_INFO:
        "유저 정보를 가져오는 데 실패했습니다. 잠시 후 다시 시도해 주세요.",
    },
    REVIEW: {
      ADD: "리뷰를 저장하는 데 문제가 발생했습니다. 다시 시도해주세요.",
      MODIFY: "리뷰를 수정하는 데 문제가 발생했습니다. 다시 시도해주세요.",
      DELETE: "리뷰를 삭제하는 데 문제가 발생했습니다. 다시 시도해주세요.",
    },
    PRODUCT: {
      ADD: "상품을 등록하는 데 문제가 발생했습니다. 다시 시도해주세요.",
      MODIFY: "상품을 수정하는 데 문제가 발생했습니다. 다시 시도해주세요.",
      DELETE: "상품을 삭제하는 데 문제가 발생했습니다. 다시 시도해주세요.",
    },
    ORDER: {
      ERROR: "주문이 실패했습니다.",
    },
    CART: {
      NO_CART_ID: "생성된 장바구니가 없습니다.",
      CART: "장바구니를 불러오는 데 문제가 발생했습니다.",
    },
  },
  SUCCESS: {
    CART: {
      ADD: "장바구니에 담겼습니다.",
      DELETE: "상품이 장바구니에서 삭제되었습니다.",
    },
    ORDER: {
      SUCCESS: "주문이 완료되었습니다.",
    },
    REVIEW: {
      ADD: "리뷰가 작성되었습니다.",
      MODIFY: "리뷰가 수정되었습니다.",
      DELETE: "리뷰가 삭제되었습니다.",
    },
    QUESTION: {
      ADD: "문의가 작성되었습니다.",
      DELETE: "문의가 삭제되었습니다.",
    },
    PROFILE: {
      EMAIL_CHANGE: "이메일이 변경되었습니다.",
      NAME_CONTACT_CHANGE: "회원정보를 수정하였습니다.",
    },
    AUTH: {
      SIGN_UP: "회원가입이 완료되었습니다.",
      LOG_OUT: "로그아웃 되었습니다.",
    },
    PRODUCT: {
      ADD: "상품이 등록되었습니다.",
      MODIFY: "상품이 수정되었습니다.",
      DELETE: "상품이 삭제되었습니다.",
    },
    ANSWER: {
      ADD: "답변이 등록되었습니다.",
      MODIFY: "답변이 수정되었습니다.",
    },
  },
};
