import {
  defineComponent,
  watch,
  onMounted
} from 'vue'
import { cloneDeep, merge } from 'lodash-es'
import { baseProps, useChart } from '../base'

export default defineComponent({
  name: 'BaseChart',
  props: baseProps,
  setup (props) {
    const { chart, render, color } = useChart(props)
    const renderChart = () => {
      chart.value && chart.value.setOption(
        merge({ color }, props.option),
        true
      )
    }
    onMounted(() => renderChart())
    watch(() => props.option, renderChart, { deep: true })
    return render
  }
})
