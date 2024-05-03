import { create } from "zustand";
import { devtools as devTools, persist } from "zustand/middleware";

const pageStateStore = (setPageState) => {
  return {
    pageState: {
      pageIndex: 0,
      numOfPages: 0,
      isNextPossible: true,
      isPrevPossible: false,
    },
    updateState: (_pageIndex, _numOfPages, _isNextPossible, _isPrevPossible) =>
      setPageState((_) => ({
        pageState: {
          pageIndex: _pageIndex,
          numOfPages: _numOfPages,
          isNextPossible: _isNextPossible,
          isPrevPossible: _isPrevPossible,
        },
      })),
  };
};

const usePageStateStore = create(
  devTools(pageStateStore, {
    name: "page_state",
  })
);

export default usePageStateStore;
