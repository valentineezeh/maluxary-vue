import { mount } from "@vue/test-utils";
import App from "@/App.vue";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { setActivePinia, createPinia } from 'pinia'
import 'fake-indexeddb/auto';

describe("It  should render the app", () => {
  beforeEach(() => {
    // Create a fresh Pinia instance and set it before each test
    setActivePinia(createPinia())

    // Initialize IndexedDB
    global.indexedDB = new IDBFactory();
  })

  afterEach(() => {
    // Clean up IndexedDB after each test
    indexedDB.deleteDatabase('maluxaryDB');
  });

  it("renders component correctly", () => {
    const wrapper = mount(App)
    expect(wrapper.exists()).toBe(true);
  })
})