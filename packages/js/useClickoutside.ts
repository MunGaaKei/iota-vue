function handleClick(e: MouseEvent) {}

const clickOutside = (target: any, callback: Function) => {
    document.addEventListener("click", handleClick);
};

export default clickOutside;
