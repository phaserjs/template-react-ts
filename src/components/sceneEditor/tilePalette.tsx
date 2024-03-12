import { useRef, useState } from "react";

function Tile({
    index,
    cursorVisible,
}: {
    index: number;
    cursorVisible: boolean;
}) {
    // const [cursorVisible, setCursorVisible] = useState(false);

    return (
        <div className="tileContent relative w-8 h-8 overflow-clip rounded">
            <span className="absolute z-20">{cursorVisible}</span>
            <img
                className="absolute max-w-none z-10"
                src="./assets/tilemaps/primal_plateau/grass.png"
                style={{
                    top: -Math.floor(index / 16) * 32,
                    left: -(index % 16) * 32,
                }}
            />
            <img
                className={`absolute z-30 left-0 top-0 ${
                    cursorVisible ? "" : "hidden"
                }`}
                src="./assets/cursor.png"
            />
        </div>
    );
}

export default function TilePalette() {
    const tiles = Array.from({ length: 16 * 32 });
    const [selectedList, setSelectedList] = useState<boolean[]>(
        new Array(16 * 32).fill(false)
    );

    const selectedTile = (index: number) => {
        const newSelectedList = selectedList.map((c, i) => {
            if (i === index) return !c;
            else return c;
        });
        setSelectedList(newSelectedList);
    };

    return (
        <div className="w-[35.75rem] h-[71.75rem]">
            <div className="grid grid-cols-[repeat(16,minmax(0,2rem))] gap-1">
                {tiles.map((t, i) => (
                    <div key={i} onClick={() => selectedTile(i)}>
                        <Tile index={i} cursorVisible={selectedList[i]} />
                    </div>
                ))}
            </div>
        </div>
    );
}
