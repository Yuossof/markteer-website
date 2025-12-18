import { useEffect } from "react";

export function useScrollAnimation(
    leftColumnRef: React.RefObject<HTMLDivElement>,
    rightColumnRef: React.RefObject<HTMLDivElement>,
    leftPausedRef: React.MutableRefObject<boolean>,
    rightPausedRef: React.MutableRefObject<boolean>,
    speed: number
) {
    useEffect(() => {
        let frame: number;
        const leftAcc = { current: 0 };
        const rightAcc = { current: 0 };

        const loop = () => {
            if (!leftPausedRef.current && leftColumnRef.current) {
                leftAcc.current += speed;
                const move = Math.floor(leftAcc.current);
                if (move > 0) {
                    leftColumnRef.current.scrollTop += move;
                    leftAcc.current -= move;
                    const { scrollTop, scrollHeight, clientHeight } = leftColumnRef.current;
                    if (scrollTop >= scrollHeight - clientHeight) {
                        leftColumnRef.current.scrollTop = 0;
                    }
                }
            }
            if (!rightPausedRef.current && rightColumnRef.current) {
                rightAcc.current += speed;
                const move = Math.floor(rightAcc.current);
                if (move > 0) {
                    rightColumnRef.current.scrollTop -= move;
                    rightAcc.current -= move;
                    if (rightColumnRef.current.scrollTop <= 0) {
                        rightColumnRef.current.scrollTop =
                            rightColumnRef.current.scrollHeight - rightColumnRef.current.clientHeight;
                    }
                }
            }
            frame = requestAnimationFrame(loop);
        };
        loop();
        return () => cancelAnimationFrame(frame);
    }, [leftColumnRef, rightColumnRef, leftPausedRef, rightPausedRef, speed]);
}
