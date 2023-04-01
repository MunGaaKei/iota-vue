export type TypePosition = "left" | "top" | "right" | "bottom";

type TypeOptions = {
    gap?: number;
    refBody?: boolean;
    position: TypePosition;
};

export function usePosition(
    $trigger: HTMLElement,
    $content: HTMLElement,
    options: TypeOptions
): [number, number] {
    const rectT = $trigger.getBoundingClientRect();
    const rectC = $content.getBoundingClientRect();
    const { refBody = true, gap = 0, position = "bottom" } = options;

    let w = 0;
    let h = 0;
    let {
        left: tl,
        top: tt,
        right: tr,
        bottom: tb,
        width: tw,
        height: th,
    } = rectT;
    const { height: ph, width: pw } = rectC;

    if (refBody) {
        w = window.innerWidth;
        h = window.innerHeight;
    } else {
        const rectPa =
            $trigger.offsetParent?.getBoundingClientRect() as DOMRect;
        w = rectPa.width;
        h = rectPa.height;
        tl = $trigger.offsetLeft;
        tt = $trigger.offsetTop;
        tr = tl + rectT.width;
        tb = tt + rectT.height;
    }

    let offestTop = 0;
    let offsetLeft = 0;

    switch (position) {
        case "left":
        case "right":
            offestTop =
                th !== ph
                    ? computeOffset({
                          totalSize: h,
                          targetSize: th,
                          targetOffset: tt,
                          contentSize: ph,
                          gap,
                      })
                    : tt;
            offsetLeft = position === "left" ? tl - gap - pw : tr + gap;
            break;
        case "top":
        case "bottom":
            offsetLeft =
                tw !== pw
                    ? computeOffset({
                          totalSize: w,
                          targetOffset: tl,
                          targetSize: tw,
                          contentSize: pw,
                          gap,
                      })
                    : tl;

            offestTop = position === "top" ? tt - gap - ph : tb + gap;
            break;
        default:
            break;
    }

    return [offsetLeft, offestTop];
}

function computeOffset({
    totalSize,
    targetSize,
    targetOffset,
    contentSize,
    gap,
}: {
    totalSize: number;
    targetSize: number;
    targetOffset: number;
    contentSize: number;
    gap: number;
}): number {
    const centerPoint = targetOffset + targetSize / 2;

    if (targetSize >= contentSize) {
        return centerPoint - contentSize / 2;
    } else if (centerPoint + contentSize / 2 + gap > totalSize) {
        return targetOffset + targetSize - contentSize;
    } else {
        if (centerPoint - contentSize / 2 - gap < 0) {
            return targetOffset;
        } else {
            return centerPoint - contentSize / 2;
        }
    }
}
