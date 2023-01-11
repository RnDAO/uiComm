import { create } from "zustand";
import IAuth from "./types/IAuth";
import createAuthSlice from "./slices/authSlice";

const useAppStore = create<IAuth>()((...a) => ({
    ...createAuthSlice(...a),
}));


export default useAppStore;