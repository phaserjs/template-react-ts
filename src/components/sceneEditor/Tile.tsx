import { memo } from "react";

function Tile({
    index,
    cursorVisible,
}: {
    index: number;
    cursorVisible: boolean;
}) {
    return (
        <div className="tileContent relative w-8 h-8 overflow-clip rounded">
            <span className="absolute z-20">{cursorVisible}</span>
            <img
                className="absolute max-w-none z-10"
                src="./assets/tilemaps/primal_plateau/grass.png"
                draggable="false"
                style={{
                    top: -Math.floor(index / 16) * 32,
                    left: -(index % 16) * 32,
                }}
            />
            <img
                className={`absolute z-30 left-0 top-0 ${
                    cursorVisible ? "" : "hidden"
                }`}
                draggable="false"
                src="./assets/cursor.png"
            />
        </div>
    );
}
const MemoizedTile = memo(Tile);
export default MemoizedTile;
