import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { Segment } from "@/shared/models/flight";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const getSegmentsByDirections = (
  segments?: Segment[],
): [Segment[], Segment[]] | [null, null] => {
  if (!segments) return [null, null];

  const directionDirection =
    segments?.filter((item) => item.direction === 0) || [];
  const directionReturn =
    segments?.filter((item) => item.direction === 1) || [];

  return [directionDirection, directionReturn];
};
