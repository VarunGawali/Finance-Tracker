import {create} from 'zustand'
import { NweAccountSheet } from '../components/new-account-sheet';

type NewAccountState = {
    isOpen: boolean;
    onOpen: ()=> void;
    onClose: ()=> void;
}

export const useNewAccount = create<NewAccountState>((set)=>({
    isOpen: false,
    onOpen: ()=> set({isOpen: true }),
    onClose: ()=> set({isOpen: false }),
}))