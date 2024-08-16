import {create} from 'zustand'
import { NewCategorySheet } from '../components/new-category-sheet';

type NewCategoryState = {
    isOpen: boolean;
    onOpen: ()=> void;
    onClose: ()=> void;
}

export const useNewCategory = create<NewCategoryState>((set)=>({
    isOpen: false,
    onOpen: ()=> set({isOpen: true }),
    onClose: ()=> set({isOpen: false }),
}))