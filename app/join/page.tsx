import Form from "@/components/authForm/Form";
import InputLabel from "@/components/common/InputLabel";

export default function Join() {
  return (
    <Form formType="join">
      <form className="flex flex-col gap-4">
        <InputLabel name="이메일" label="email" style="box" />
        <InputLabel name="비밀번호" label="password" style="box" />
        <InputLabel name="이름" label="name" style="box" />
        <InputLabel name="전화번호" label="phoneNum" style="box" />
      </form>
    </Form>
  );
}
