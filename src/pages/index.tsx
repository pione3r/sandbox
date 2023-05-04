import Head from "next/head";

import { AskFormBoard } from "@/components/AskFormBoard";
import { DummyTextAskForm } from "@/components/DummyAskForm/TextAskForm";
import { PickedAskFormBoard } from "@/components/PickedAskFormBoard";
import { DraggableItem } from "@/components/DraggableItem";
import { useDraggable } from "@/hooks/useDraggable";
import { useState } from "react";
import { TextAskFormType } from "./index.types";
import { TextAskForm } from "@/components/AskForm/TextAskForm";

export default function Home() {
  const [선택된질문리스트, set선택된질문리스트] = useState<TextAskFormType[]>(
    []
  );

  console.log(선택된질문리스트);

  const 질문추가 = () => {
    const newId = Math.max(
      0,
      ...선택된질문리스트.map((질문) => Number.parseInt(질문.id))
    );
    set선택된질문리스트((prev) => [
      ...prev,
      { id: "" + (newId + 1), type: "text", askTitle: "" },
    ]);
  };

  const { onMouseDownHandler } = useDraggable(질문추가);

  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={{ display: "flex", gap: "10px" }}>
        <AskFormBoard>
          <DraggableItem onMouseDown={onMouseDownHandler}>
            <DummyTextAskForm />
          </DraggableItem>
        </AskFormBoard>
        <PickedAskFormBoard>
          {선택된질문리스트.map((질문, index) => (
            <TextAskForm
              key={질문.id}
              index={index}
              질문={질문}
              질문제목수정={(event: React.ChangeEvent<HTMLInputElement>) => {
                const 수정한제목 = event.target.value;
                set선택된질문리스트((prev) =>
                  prev.map((item) =>
                    item.id === 질문.id
                      ? { ...item, askTitle: 수정한제목 }
                      : { ...item }
                  )
                );
              }}
              질문삭제={() => {
                const 삭제된질문 = [...선택된질문리스트];
                삭제된질문.splice(index, 1);
                set선택된질문리스트(삭제된질문);
              }}
            />
          ))}
        </PickedAskFormBoard>
      </main>
    </>
  );
}
