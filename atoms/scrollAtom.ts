import { atom } from "recoil";

export const isScroll = atom({
  key: "isScoll", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});
