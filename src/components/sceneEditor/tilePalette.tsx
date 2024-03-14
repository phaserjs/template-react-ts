import { FC, useState } from "react";
import Tile from "./Tile";

interface TilePaletteProps {
    onSelectTiles: (
        stX: number,
        stY: number,
        edX?: number,
        edY?: number
    ) => void;
}

const TilePalette: FC<TilePaletteProps> = ({ onSelectTiles }) => {
    const tiles = Array.from({ length: 16 * 32 });

    const [selectedList, setSelectedList] = useState<boolean[]>(
        new Array(16 * 32).fill(false)
    );

    const [boxingIndexStart, setBoxingIndexStart] = useState<number>(-1);

    const selectedTile = (index: number) => {
        const stColumn = index % 16;
        const stRow = Math.floor(index / 16);
        const newSelectedList = selectedList.map((s, i) => {
            if (i === index) return true;
            else return false;
        });
        setSelectedList(newSelectedList);
        onSelectTiles(stColumn, stRow); // Update Tile
    };

    const selectTilesStart = (index: number) => {
        setBoxingIndexStart(index);
        selectedTile(index);
    };

    const selectTilesOver = (index: number) => {
        selectedTiles(index);
    };

    const selectTilesEnd = () => {
        setBoxingIndexStart(-1);
    };

    const selectedTiles = (boxingIndexEnd: number) => {
        if (boxingIndexStart < 0 || boxingIndexEnd < 0) return;
        const stColumn = boxingIndexStart % 16;
        const stRow = Math.floor(boxingIndexStart / 16);
        const edColumn = boxingIndexEnd % 16;
        const edRow = Math.floor(boxingIndexEnd / 16);
        const leftTopColumn = Math.min(stColumn, edColumn);
        const leftTopRow = Math.min(stRow, edRow);
        const rightBottomColumn = Math.max(stColumn, edColumn);
        const rightBottomRow = Math.max(stRow, edRow);
        if (
            leftTopColumn === rightBottomColumn &&
            leftTopRow === rightBottomRow
        ) {
            onSelectTiles(leftTopColumn, leftTopRow);
        } else {
            const newSelectedList = selectedList.map((s, i) => {
                const iColumn = i % 16;
                const iRow = Math.floor(i / 16);
                if (
                    iColumn < leftTopColumn ||
                    iRow < leftTopRow ||
                    iColumn > rightBottomColumn ||
                    iRow > rightBottomRow
                )
                    return false;
                else return true;
            });
            setSelectedList(newSelectedList);
            onSelectTiles(
                leftTopColumn,
                leftTopRow,
                rightBottomColumn,
                rightBottomRow
            ); // Update Tile
        }
    };

    return (
        <div className="w-[35.75rem] h-[71.75rem] select-none">
            <div
                className="grid grid-cols-[repeat(16,minmax(0,2rem))] gap-1"
                onMouseUp={() => selectTilesEnd()}
            >
                {tiles.map((t, i) => (
                    <div
                        key={i}
                        onMouseDown={() => selectTilesStart(i)}
                        onMouseOver={() => selectTilesOver(i)}
                    >
                        <Tile index={i} cursorVisible={selectedList[i]} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TilePalette;
