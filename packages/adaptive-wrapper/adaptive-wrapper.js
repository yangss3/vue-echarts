import debounce from "lodash/debounce";
import { h } from "vue";
const originalStyle = {};
let parentElement = null;

export default {
  name: "adaptiveWrapper",
  data() {
    return {
      transform: "scale(1,1)",
      adaptiveDebounce: null
    };
  },

  mounted() {
    this.adaptive();

    parentElement = this.$el.parentElement;
    originalStyle.overflow = parentElement.style.overflow;
    originalStyle.height = parentElement.style.height;
    parentElement.style.overflow = "hidden";
    parentElement.style.height = "100vh";

    this.adaptiveDebounce = debounce(this.adaptive, 100);
    window.addEventListener("resize", this.adaptiveDebounce);
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.adaptiveDebounce);
    parentElement.style.overflow = originalStyle.overflow;
    parentElement.style.height = originalStyle.height;
  },

  methods: {
    adaptive() {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      this.transform = `scale(${windowWidth / 1920}, ${windowHeight / 1080})`;
    }
  },

  render() {
    return h("div", [
      h(
        "div",
        {
          style: {
            width: "1920px",
            height: "1080px",
            transformOrigin: "top left",
            transform: this.transform
          }
        },
        this.$slots.default
      )
    ]);
  }
};
