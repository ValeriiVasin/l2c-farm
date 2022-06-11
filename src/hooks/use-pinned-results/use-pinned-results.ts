import { useRecoilState } from 'recoil';
import { pinnedResultsAtom } from '../../state';
import type { PinnedResult } from '../../types';

export function usePinnedResults() {
  const [pinnedResults, setPinnedResults] = useRecoilState(pinnedResultsAtom);

  const pinResult = (item: PinnedResult) => {
    const character = pinnedResults.length > 0 ? pinnedResults[0].character : void 0;
    setPinnedResults([{ ...item, character }, ...pinnedResults]);
  };

  const clearPinnedResults = () => setPinnedResults([]);

  const removePinnedResult = (timestamp: number) => {
    setPinnedResults(pinnedResults.filter((result) => result.timestamp !== timestamp));
  };

  const changePinnedCharacterName = (timestamp: number, name: string) => {
    setPinnedResults(
      pinnedResults.map((result) =>
        result.timestamp === timestamp ? { ...result, character: name ? name : void 0 } : result,
      ),
    );
  };

  const changePinnedComment = (timestamp: number, comment: string) => {
    setPinnedResults(
      pinnedResults.map((result) =>
        result.timestamp === timestamp ? { ...result, comment: comment ? comment : void 0 } : result,
      ),
    );
  };

  return {
    changePinnedCharacterName,
    changePinnedComment,
    clearPinnedResults,
    pinnedResults,
    pinResult,
    removePinnedResult,
  };
}
