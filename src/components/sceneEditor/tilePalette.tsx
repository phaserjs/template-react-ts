import { FC, useState } from "react";
import Tile from "./Tile";

interface TilePaletteProps {
    onSelectTile: (index: number) => void;
}

const TilePalette: FC<TilePaletteProps> = ({ onSelectTile }) => {
    const tiles = Array.from({ length: 16 * 32 });
    const [selectedList, setSelectedList] = useState<boolean[]>(
        new Array(16 * 32).fill(false)
    );

    const selectedTile = (index: number) => {
        const newSelectedList = selectedList.map((s, i) => {
            if (i === index) return !s;
            else return false;
        });
        setSelectedList(newSelectedList);
        onSelectTile(index); // Update Tile
    };

    return (
        <div className="w-[35.75rem] h-[71.75rem] select-none">
            <div className="grid grid-cols-[repeat(16,minmax(0,2rem))] gap-1">
                {tiles.map((t, i) => (
                    <div key={i} onClick={() => selectedTile(i)}>
                        <Tile index={i} cursorVisible={selectedList[i]} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TilePalette;
