import '../../app.css'
import Cookies from './Cookies.svelte'

const app = new Cookies({
  target: document.getElementById('app'),
})

export default app
