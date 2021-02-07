import { shallowMount } from '@vue/test-utils'
import JobComponent from '@/components/JobComponent.vue'

// Adding element ui to avoid components import warnings
import Vue from 'vue'
import Element from 'element-ui'
Vue.use(Element, {})

describe('JobComponent should mount and be truthy and try props', () => {
  test('is a Vue instance', () => {
    const wrapper = shallowMount(JobComponent, {
      propsData: {
        job: {
          company: "Company Name",
          company_logo: "123.png",
          company_url: "http://www.company.com",
          created_at: "Wed Jan 27 17:11:53 UTC 2021",
          description: "<p>Job description</p>",
          how_to_apply: "<p><a href='http://www.google.com'>www.google.com</p>",
          id: "123-abc-456-def",
          location: "New Jersey",
          title: " Senior Software Developer (Full Stack)",
          type: "Full Time",
          url: "http://www.google.com"
        }
      }
    });
    expect(wrapper.vm).toBeTruthy();
    expect(wrapper.vm.job.company).toBe("Company Name");
  })
})