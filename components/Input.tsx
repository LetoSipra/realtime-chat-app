import {
  HiOutlineFaceSmile,
  HiPaperClip,
  HiPaperAirplane,
} from "react-icons/hi2";
import { useState, useEffect, useRef } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase";
import { useSession } from "next-auth/react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { isScroll } from "@/atoms/scrollAtom";
import { useRecoilState } from "recoil";

function Input() {
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showEmoji, setShowEmoji] = useState<boolean>(false);
  const { data: session } = useSession();
  const [value, setValue] = useRecoilState<boolean>(isScroll);
  const Filter = require("bad-words"),
    filter = new Filter();

  const sendMessage = async () => {
    if (input.length < 1) return;
    if (loading) return;
    const filterInput = filter.clean(input);
    setLoading(true);
    await addDoc(collection(db, "messages"), {
      id: session?.user?.uid,
      username: session?.user?.name,
      userImg: session?.user?.image,
      text: filterInput,
      timestamp: serverTimestamp(),
    });
    setLoading(false);
    setShowEmoji(false);
    setInput("");
    setValue(!value); //it has linked useEffect, every time this value changes it will automatically scroll to bottom
  };

  return (
    <>
      <main className="relative mb-2 max-h-[44px] mx-2">
        <section className="flex rounded-xl bg-[#202c33] p-2">
          <div className="mx-1 my-auto flex space-x-1 px-0.5 py-0.5">
            <HiOutlineFaceSmile
              onClick={() => setShowEmoji(!showEmoji)}
              className="iconAnimation h-6 w-6"
            />
            <HiPaperClip className="iconAnimation h-6 w-6" />
            {showEmoji && (
              <div className="absolute bottom-[50px]">
                <Picker
                  data={data}
                  onEmojiSelect={(e: any) => setInput(input + e.native)}
                  theme={"dark"}
                />
              </div>
            )}
          </div>
          <div className="w-full flex rounded-md bg-[#2a3942] space-x-2">
            <input
              type="text"
              placeholder="Write a messeage"
              maxLength={250}
              className="w-full bg-[#2a3942] px-2 py-0.5 outline-none"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
            <p className="px-1 my-auto">{input.length}/250</p>
          </div>
          <div className="mx-1 my-auto">
            <HiPaperAirplane
              className="iconAnimation h-6 w-6"
              onClick={sendMessage}
            />
          </div>
        </section>
      </main>
    </>
  );
}

export default Input;
