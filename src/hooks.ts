import { useDispatch, useSelector } from 'react-redux'
import {AppDispatch, RootState} from "./store";


// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>();


export const useLocalStorage = () => {
    const getItem = <T>(key: string): T | null => {
        const value = localStorage.getItem(key);
        return value ? (JSON.parse(value) as T) : null;
    };

    const setItem = <T>(key: string, value: T) => {
        localStorage.setItem(key, JSON.stringify(value));
    };

    const removeItem = (key: string) => {
        localStorage.removeItem(key);
    };

    const clear = () => {
        localStorage.clear();
    };

    return { getItem, setItem, removeItem, clear };
}