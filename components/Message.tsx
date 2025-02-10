import Moment from "react-moment";
import { useSession } from "next-auth/react";
import { HiOutlineTrash } from "react-icons/hi2";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/firebase";
import Image from "next/image";
import "moment-timezone";

interface Props {
  message: Messages;
  id: any;
}

function Messeage({ message, id }: Props) {
  const { data: session } = useSession();

  return (
    <>
      <div
        className={`flex w-full space-x-1 py-5 ${
          session?.user.uid === message.id && "justify-end"
        }`}>
        {session?.user.uid !== message.id && (
          <Image
            src={message.userImg}
            width={40}
            height={40}
            alt=""
            className="h-10 w-10 rounded-full object-contain"
          />
        )}
        <div
          className={`my-auto flex flex-col ${
            session?.user.uid === message.id && "items-end"
          }`}>
          <p>@{message.username}</p>
          <p className="w-fit max-w-xs overflow-auto break-words rounded-lg bg-[#005c4b] px-2.5 py-0.5 text-white">
            {message.text}
          </p>
          <div className="mt-1 flex space-x-2 text-xs">
            <Moment className="" format="LT">
              {message.timestamp?.toDate()}
            </Moment>
            {session?.user.uid === message?.id && (
              <HiOutlineTrash
                className="iconAnimation my-auto h-4 w-4 cursor-pointer text-red-600 hover:bg-red-600 hover:bg-opacity-30"
                onClick={() => deleteDoc(doc(db, "messages", id))}
              />
            )}
          </div>
        </div>
        {session?.user.uid === message.id && (
          <Image
            src={message.userImg}
            width={40}
            height={40}
            alt=""
            className="h-10 w-10 rounded-full object-contain"
          />
        )}
      </div>
    </>
  );
}

export default Messeage;
