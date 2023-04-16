import "../css/main.scss";

export default function () {
    document?.addEventListener("DOMContentLoaded", () => {
        // 是否为 WINDOWS 系统
        if (/windows|win32/i.test(navigator.userAgent)) {
            document.documentElement.classList.add("os-windows");
        }
    });
}
