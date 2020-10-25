import { defineComponent, h, onBeforeUnmount, onMounted, ref } from "vue";
import debounce from "lodash/debounce";

export default defineComponent({
  name: "adaptive-wrapper",
  setup(_, { slots }) {
    const transform = ref("scale(1,1)");
    const el = ref<HTMLDivElement>();

    function adaptive() {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      transform.value = `scale(${windowWidth / 1920}, ${windowHeight / 1080})`;
    }

    const adaptiveDebounce = debounce(adaptive, 100);

    let parentElement: HTMLElement;
    let originalStyle = {} as CSSStyleDeclaration;

    onMounted(() => {
      adaptive();
      parentElement = el.value!.parentElement!;
      originalStyle.overflow = parentElement.style.overflow;
      originalStyle.height = parentElement.style.height;
      parentElement.style.overflow = "hidden";
      parentElement.style.height = "100vh";
      window.addEventListener("resize", adaptiveDebounce);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("resize", adaptiveDebounce);
      parentElement.style.overflow = originalStyle.overflow;
      parentElement.style.height = originalStyle.height;
    });

    return () =>
      h("div", [
        h(
          "div",
          {
            ref: el,
            style: {
              width: "1920px",
              height: "1080px",
              transformOrigin: "top left",
              transform: transform.value
            }
          },
          slots.default && slots.default()
        )
      ]);
  }
});
