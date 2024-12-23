import { PlainComponent } from '../node_modules/plain-reactive/src/index.js'
import './agora.css'

class AgoraComponent extends PlainComponent {
    constructor() {
        super('agora-component', 'https://cdn.jsdelivr.net/gh/KinoGlazPrusia/agora-component@main/dist/agora-bundle.css')

        this.loading = true
        this.error = null

        this.domain = this.getAttribute('domain')
        this.url = this.getAttribute('url')
        this.contextId = Math.floor(Math.random() * 10000)
    }

    template() {
        return `
            <div class="loader">
                <!-- Animated circles -->
                <div class="circle" ></div>
                <div class="circle" style="animation-delay: 50ms;"></div>
                <div class="circle" style="animation-delay: 100ms;"></div>
                <div class="circle" style="animation-delay: 150ms;"></div>
                <div class="circle" style="animation-delay: 200ms;"></div>
                <div class="circle" style="animation-delay: 250ms;"></div>
                <div class="circle" style="animation-delay: 300ms;"></div>
                <div class="circle" style="animation-delay: 350ms;"></div>
            </div>
            <iframe 
                name="${this.contextId}" 
                class="iframe" 
                src="${this.domain}${this.url.startsWith('/') ? this.url : `/${this.url}`}"
                allow="clipboard-write">
            </iframe>
        `
    }

    listeners() {
        this.setupMessageListener()
        this.$('iframe').onload = () => this.setLoading(false)
    }

    setupMessageListener() {
        window.addEventListener('message', (e) => {
            switch (e.data.type) {

                case 'resize-on-list':
                    if (this.contextId !== Number(e.data.id)) return
                    if (!this.hasAttribute('auto-resize')) return
                    this.resize(e.data.height)
                    break

                case 'resize-on-detail':
                    if (this.contextId !== Number(e.data.id)) return
                    if (!this.hasAttribute('auto-resize')) return
                    this.autoscroll(true)
                    this.resize(e.data.height)
                    break

                case 'resize-on-detail-image-loaded':
                    if (this.contextId !== Number(e.data.id)) return
                    if (!this.hasAttribute('auto-resize')) return
                    const currentHeight = Number(this.style.height.replace('px', ''))
                    const newHeight = currentHeight + e.data.height
                    this.resize(newHeight)
                    break

                default:
                    break
            }
        })
    }

    setLoading(state) {
        this.loading = state
        this.$('.iframe').style.display = this.loading ? 'none' : 'flex'
        this.$('.loader').style.display = this.loading ? 'flex' : 'none'
    }

    resize(height)  {
        console.log('Resize', height)
        this.style.height = height + 'px'
    }

    autoscroll(smoothing = false) {
        if (this.parentNode.scrollTop === 0) {
            this.scrollIntoView({behavior: `${smoothing ? 'smooth' : 'auto'}`})
            return 
        }

        this.parentNode.scrollTo({top: 0, behavior: `${smoothing ? 'smooth' : 'auto'}`})
    }

    navigateTo(url) {
        this.setLoading(true)
        this.url = url.startsWith('/') ? url : `/${url}`
        this.$('.iframe').src = `${this.domain}${this.url}`
    }
}

export default window.customElements.define('agora-component', AgoraComponent)