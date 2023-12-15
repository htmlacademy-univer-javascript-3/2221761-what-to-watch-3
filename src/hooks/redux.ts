import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import {AppDispatch, State} from '../store/store.ts';

export const useTypedDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<State> = useSelector;
