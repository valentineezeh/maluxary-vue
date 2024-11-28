import { ref, onMounted, onBeforeUnmount, watch } from 'vue'

export function useNavigation() {
  const scrolledNav = ref(false)
  const mobile = ref(false)
  const mobileNav = ref(false)
  const windowWidth = ref(0)

  const toggleMobileNav = () => {
    mobileNav.value = !mobileNav.value
  }

  const updateScroll = () => {
    const scrollPosition = window.scrollY
    scrolledNav.value = scrollPosition > 50
    checkScreen()
  }

  const checkScreen = () => {
    windowWidth.value = window.innerWidth
    if (windowWidth.value <= 750) {
      mobile.value = true
      return
    }
    mobile.value = false
    mobileNav.value = false
  }

  // Watch for window width changes
  watch(windowWidth, () => {
    checkScreen()
  })

  onMounted(() => {
    checkScreen()
    window.addEventListener('resize', checkScreen)
    window.addEventListener('scroll', updateScroll)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', checkScreen)
    window.removeEventListener('scroll', updateScroll)
  })

  return {
    scrolledNav,
    mobile,
    mobileNav,
    windowWidth,
    toggleMobileNav
  }
}
