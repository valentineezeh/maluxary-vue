import { mount } from "@vue/test-utils";
import App from "@/App.vue";
import { describe, it, expect, beforeEach } from "vitest";
import { setActivePinia, createPinia } from 'pinia'

describe("It  should render the app", () => {
  beforeEach(() => {
    // Create a fresh Pinia instance and set it before each test
    setActivePinia(createPinia())
  })
  it("renders component correctly", () => {
    const wrapper = mount(App)
    expect(wrapper.exists()).toBe(true);
  })
})