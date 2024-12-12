<div align="center">
  <img width="300" alt="MoA 메인 로고 이미지" src="https://github.com/user-attachments/assets/04f5f8f2-8903-41f8-98ac-6319f0da1672">
  <br/>
  <img width="700" alt="모아소개" src="https://github.com/user-attachments/assets/6302ac1f-1920-41aa-ad93-607127115803">
</div>

[🔗 MoA 구경하기](https://modu-moa.vercel.app/)

| 테스트계정 | 🛒 구매자            | 🏪 판매자             |
| ---------- | -------------------- | --------------------- |
| ID         | `moabuyer@gmail.com` | `moaseller@gmail.com` |
| PW         | `123qweQWE!`         | `123qweQWE!`          |

## 기획

- 과거 React 기반으로 개발한 [호두마켓 프로젝트](https://github.com/easyxxu/Hodu-Market)에서 쇼핑몰의 핵심 요소인 SEO 최적화에 한계를 느끼며 **SSR 도입의 필요성**을 느끼게 되었습니다. 이를 계기로 SSR을 적용한 프로젝트를 진행하며, SEO 최적화 효과를 직접 경험하고자 했습니다.
- 또한, 해당 프로젝트에서 **백엔드 서버를 사용할 수 없게 되는 상황**을 겪으면서, 프론트엔드와 데이터베이스를 직접 관리하는 풀스택 구조에 대한 관심이 커졌습니다.

⇒ 기존 프로젝트의 한계를 보완하고 SSR 개발에 대한 경험을 쌓기 위해, 그리고 백엔드 없이도 직접 데이터베이스를 구축 및 관리해보고자 MoA 프로젝트를 시작하게 되었습니다.

## 개발

### 기술 스택

<img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white"/> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white"> <img src="https://img.shields.io/badge/Tailwind--CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white"/> <img src="https://img.shields.io/badge/Supabase-3FCF8E?style=flat-square&logo=supabase&logoColor=white"/>

<img width="1000" alt="모아 프로젝트 아키텍처" src="https://github.com/user-attachments/assets/4790aaea-4175-4f63-9f15-c9152b3e7fcb">

### 로그인, 회원가입

- Supabase의 Authentication을 이용해 이메일을 통한 로그인, 회원가입, SNS 로그인 구현
  <img width="1000" alt="MoA Auth 이미지" src="https://github.com/user-attachments/assets/f715fca6-bad5-496f-8eb1-0a0820b22742">

### 상품 리스트

- 메인 페이지
  <img width="1438" alt="스크린샷 2024-11-29 오후 1 52 51" src="https://github.com/user-attachments/assets/41e5d7a9-a2f2-44f8-948a-67c947ba5d87">

- 캐릭터별, 유형별 필터와 주문 많은 순, 좋아요 많은 순, 가격 순, 최신 순 정렬 기능 구현
  <img width="1437" alt="스크린샷 2024-11-29 오후 2 31 15" src="https://github.com/user-attachments/assets/a2c28409-c26a-4eb4-a5e7-c8184c6e3992">

### 상품 상세

- 상품 정보, 해당 상품에 게시된 리뷰와 문의글을 확인할 수 있습니다.
  <img width="1437" alt="상품상세페이지" src="https://github.com/user-attachments/assets/2bdcd6b0-655c-4aae-a051-10b44a544120">
  <img width="1437" alt="상품상세페이지의 리뷰,문의내역" src="https://github.com/user-attachments/assets/605cd327-30c7-45f6-b5f0-2f3f806e0522">

### 장바구니

- 판매자샵별로 그룹화하여 장바구니에 담긴 상품을 나타냈습니다.
  <img width="1437" alt="장바구니페이지" src="https://github.com/user-attachments/assets/a33939f2-663f-4083-8ce6-d119adca59bd">

### 주문

- 상품 상세 페이지 또는 장바구니 페이지에서 주문이 가능합니다.
- PortOne API를 통해 KG 이니시스, 카카오페이 간편 결제를 구현했습니다.
  <img width="1437" alt="주문서 작성 페이지" src="https://github.com/user-attachments/assets/90fe2224-10fb-4c50-8e09-b469188575ce">
- 주문 완료 시 주문한 제품과 주문 정보가 담긴 페이지로 이동합니다.
  <img width="1437" alt="주문 완료 페이지" src="https://github.com/user-attachments/assets/0230c11b-b1d0-4959-bb2c-234b0306baee">

### 마이페이지 for Buyer

- 구매자로 로그인한 사용자는 마이페이지를 통해 주문, 리뷰, 문의 내역을 확인할 수 있습니다.
  <br/>

**[주문조회]**

- 가장 최근 주문부터 확인이 가능합니다.
  <img width="1000" alt="주문조회" src="https://github.com/user-attachments/assets/e1949a76-f447-4807-a9f2-2a7e3f23624b">

- 주문상세내역에서 작성하기 버튼을 통해 리뷰작성이 가능합니다.
  <img width="1000" alt="주문상세내역" src="https://github.com/user-attachments/assets/54f88d8d-f923-469c-bf48-78b77e9ce727">
  <br/>

**[리뷰조회]**

- 작성한 리뷰를 확인하고 수정과 삭제가 가능합니다.
  <img width="1000" alt="리뷰조회" src="https://github.com/user-attachments/assets/ad63912f-f72d-474d-ba38-11c7abcce589">
  <br/>

**[개인정보수정]**
<img width="1000" alt="스크린샷 2024-12-05 오후 9 49 15" src="https://github.com/user-attachments/assets/83221965-b178-4d47-b986-22665676b21f">

**[상품 Q/A]**

- 상품별로 작성한 문의를 확인하고 삭제가 가능합니다.
  <img width="1000" alt="상품Q/A내역" src="https://github.com/user-attachments/assets/4350061f-73b9-4665-99fc-2fd68dbdb747">
  <img width="1000" alt="스크린샷 2024-11-29 오후 2 46 34" src="https://github.com/user-attachments/assets/326eb911-c049-41d2-bb2d-f9e827ffecd9">

### 판매자센터

**[홈]**

- 판매자센터의 홈에서 Chart를 이용해 매출, 주문건수를 한눈에 파악하기 쉽게 했습니다.
  <img width="1437" alt="판매자센터 홈 이미지" src="https://github.com/user-attachments/assets/3130c3d1-b9ec-4100-8f6c-b619487cabf5?raw=true">
  <br/>

**[상품관리]**

- 상품 등록, 수정과 삭제가 가능합니다.
  <img width="1000" alt="상품리스트" src="https://github.com/user-attachments/assets/5a2b7adf-7949-4a86-a576-424b443c4986">
  <img width="1000" alt="상품수정" src="https://github.com/user-attachments/assets/f72c383e-4e46-4c17-a65a-1eb3e08bcc61">
  <img width="1000" alt="상품등록" src="https://github.com/user-attachments/assets/22c151d1-23f6-42a1-81a8-ab6587877002">
  <br/>
  <br/>

**[문의관리]**

- 판매 상품별로 총 문의 개수와 답변 대기중인 문의 개수를 확인할 수 있습니다.
  <img width="1000" alt="문의관리 리스트" src="https://github.com/user-attachments/assets/fcf4c583-f024-4d81-b845-665fa48a531a">

- 상품에 달린 문의의 답변 상태를 파악할 수 있습니다.
  <img width="1000" alt="상품별 문의내역" src="https://github.com/user-attachments/assets/0ea7329a-593e-4436-acb3-93d6a5765033">

- 답변이 이미 달렸다면 답변을 확인할 수 있는 페이지로, 답변이 달리지 않았다면 답변을 달 수 있는 페이지로 이동합니다.
  <img width="1000" alt="문의답변 작성" src="https://github.com/user-attachments/assets/77ccb524-222e-4fe4-a725-91c8c5033d23">
  <img width="1000" alt="문의답변 확인" src="https://github.com/user-attachments/assets/7c450c3d-2784-4ec3-a659-bdf14380db2e">

### 추후 개발 예정

- 판매자센터
  - 주문 관리

<!-- ## 트러블슈팅

### 주문많은순 정렬을 위한 RPC 함수 적용 -->
