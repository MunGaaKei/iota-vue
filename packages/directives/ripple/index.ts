import { DirectiveBinding } from "vue"
import './ripple.scss'

const TIMEOUT = 500;
const EVENT_TYPE = 'mousedown'

function createRipple () {
    const $box = document.createElement('SPAN');
    const $ripple = document.createElement('SPAN');
    
    $box.className = 'i-ripple-container';
    $ripple.className = 'i-ripple';

    $box.append($ripple);

    return [$box, $ripple];
}

const rippleListener = function (this: HTMLElement, e: MouseEvent) {
    let [$box, $ripple] = createRipple();
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;

    $ripple.style.cssText = `
        left: ${e.offsetX}px;
        top: ${e.offsetY}px;
        width: ${size}px;
        height: ${size}px;
        transition: all ${TIMEOUT/1000}s;
    `;
    this.insertAdjacentElement('afterbegin', $box);
    this.offsetHeight;
    $ripple.classList.add('i-ripple-active');
    
    setTimeout(() => {
        $box.remove();
    }, TIMEOUT);
}

const handleMounted = ($el: HTMLElement, binding: DirectiveBinding) => {
    if ( binding.value === false ) return;
    
    $el.addEventListener(EVENT_TYPE, rippleListener)
}

const handleBeforeUnmount = ($el: HTMLElement, binding: DirectiveBinding) => {
    if ( binding.value === false ) return;

    $el.removeEventListener(EVENT_TYPE, rippleListener);
}

export default {
    mounted : handleMounted,
    beforeUnmount: handleBeforeUnmount
}