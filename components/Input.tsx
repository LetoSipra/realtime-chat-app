import {
  HiOutlineFaceSmile,
  HiPaperClip,
  HiPaperAirplane,
} from "react-icons/hi2";
import { useState, useEffect, useRef, MutableRefObject } from "react";
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
  const buttonRef = useRef() as MutableRefObject<HTMLButtonElement>;
  const inputRef = useRef() as MutableRefObject<HTMLInputElement>;
  const Filter = require("bad-words"),
    filter = new Filter();

  const sendMessage = async () => {
    if (!session) return;
    if (input.length < 1) return;
    if (loading) return;
    setLoading(true);
    await addDoc(collection(db, "messages"), {
      id: session?.user?.uid,
      username: session?.user?.name,
      userImg: session?.user?.image,
      text: input,
      timestamp: serverTimestamp(),
    });
    setLoading(false);
    setShowEmoji(false);
    setInput("");
    setValue(!value); //it has linked useEffect, every time this value changes it will automatically scroll to bottom
    inputRef.current.focus();
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      buttonRef.current.click();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  });

  useEffect(() => {
    if (/[a-z]/.test(input)) {
      const filtered = filter.clean(input);
      setInput(filtered);
    }
  }, [input]);

  return (
    <>
      <main className="relative mx-2 mb-2 max-h-[44px]">
        <section className="flex rounded-xl bg-[#202c33] p-2">
          <div className="mx-1 my-auto flex space-x-1 px-0.5 py-0.5">
            <HiOutlineFaceSmile
              onClick={() => {
                setShowEmoji(!showEmoji);
                inputRef.current.focus();
              }}
              className="iconAnimation h-6 w-6"
            />
            <HiPaperClip className="iconAnimation h-6 w-6" />
            {showEmoji && (
              <div className="absolute bottom-[50px]">
                <Picker
                  data={data}
                  onEmojiSelect={(e: any) => {
                    setInput(input + e.native);
                    inputRef.current.focus();
                  }}
                  theme={"dark"}
                />
              </div>
            )}
          </div>
          <div className="flex w-full space-x-2 rounded-md bg-[#2a3942]">
            {session ? (
              <input
                ref={inputRef}
                disabled={loading ? true : false}
                type="text"
                placeholder="Write a messeage"
                maxLength={250}
                className="w-full bg-[#2a3942] px-2 py-0.5 outline-none"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                }}
              />
            ) : (
              <p className="mx-auto font-bold text-red-600">
                YOU HAVE TO LOGIN FIRST
              </p>
            )}
            <p className="my-auto px-1">{input.length}/250</p>
          </div>
          <button ref={buttonRef} onClick={sendMessage}>
            <div className="mx-1 my-auto">
              <HiPaperAirplane className="iconAnimation h-6 w-6" />
            </div>
          </button>
        </section>
      </main>
    </>
  );
}

export default Input;
