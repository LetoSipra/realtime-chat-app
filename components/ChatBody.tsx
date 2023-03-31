import { db } from "@/firebase";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import Messeage from "./Message";
import { isScroll } from "@/atoms/scrollAtom";
import { useRecoilState } from "recoil";
import { useAutoAnimate } from "@formkit/auto-animate/react";

function ChatBody() {
  const [messages, setMessages] = useState<[]>([]);
  const scrollRef = useRef() as MutableRefObject<HTMLDivElement>;
  const [value, setValue] = useRecoilState(isScroll);
  const [animate] = useAutoAnimate();

  useEffect(() => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  }, [value]);

  useEffect(() => {
    setTimeout(function () {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }, 1000);
  }, []);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "messages"),
          orderBy("timestamp", "asc"),
          limit(100)
        ),
        (snapshot: any) => {
          setMessages(snapshot.docs);
        }
      ),
    [db]
  );

  return (
    <>
      <main className="relative overflow-y-auto scrollbar-hide">
        <section className="mx-1 h-[calc(100vh_-_118px)] bg-[#0b141a] px-3">
          <div className="" ref={animate}>
            {messages.map((message: any) => (
              <Messeage
                message={message.data()}
                id={message.id}
                key={message.id}
              />
            ))}
            <div ref={scrollRef}></div>
          </div>
        </section>
      </main>
    </>
  );
}

export default ChatBody;
