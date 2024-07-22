"use client";
import { useState } from "react";
import Button from "./Button";

export default function QuantityButton() {
  const [count, setCount] = useState(1);
  return (
    <div className="flex gap-2">
      <Button type="button" custom="w-10">
        -
      </Button>
      <p className="w-10 px-3 py-3 text-center inner-box">{count}</p>
      <Button type="button" custom="w-10">
        +
      </Button>
    </div>
  );
}
