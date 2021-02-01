import { mount } from '@vue/test-utils'
import MyFutureComp from '@/components/MyFutureComp.vue'

describe('MyFutureComp', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(MyFutureComp)
    expect(wrapper.vm).toBeTruthy()
  })
})
