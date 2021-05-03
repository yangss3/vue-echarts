import {
  defineComponent,
  watch,
  onMounted,
} from "vue";
import { cloneDeep } from "lodash-es";
import { baseProps, useChart } from '../base'

export default defineComponent({
  name: 'BaseChart',
  props: baseProps,
  setup(props) {
    const { chart, render } = useChart(props)
    const renderChart = () => {
      chart.value && chart.value.setOption(cloneDeep(props.option), true)
    }
    onMounted(() => renderChart())
    watch(() => props.option, renderChart, { deep: true })
    return render
  }
})