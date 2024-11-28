import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { dom, library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'


library.add(fas, far, fab)
dom.watch()

export default FontAwesomeIcon
