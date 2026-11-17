import { useState } from 'react'

// Phones get the native share sheet; desktops get a WhatsApp link and a copy button instead.
const ShareActions = ({ title, url }) => {
  const [copied, setCopied] = useState(false)
  const text = `Ayúdanos a difundir: ${title}`

  const share = async () => {
    try {
      await navigator.share({ title, text, url })
    } catch (err) {
      if (err?.name !== 'AbortError') console.error('Native share failed', err)
    }
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch (err) {
      console.error('Could not copy the link', err)
    }
  }

  const buttonCls = 'inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors'

  return (
    <div className="flex flex-wrap gap-2 print:hidden">
      {typeof navigator !== 'undefined' && navigator.share ? (
        <button type="button" onClick={share} className={`${buttonCls} bg-[#FFD54F] hover:bg-yellow-400`}>
          📤 Compartir
        </button>
      ) : (
        <a
          href={`https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`${buttonCls} bg-[#25D366] text-white hover:bg-[#1ebe57]`}
        >
          💬 Compartir por WhatsApp
        </a>
      )}
      <button type="button" onClick={copy} className={`${buttonCls} border border-gray-300 hover:bg-gray-50`}>
        {copied ? '✅ Enlace copiado' : '🔗 Copiar enlace'}
      </button>
      <button type="button" onClick={() => window.print()} className={`${buttonCls} border border-gray-300 hover:bg-gray-50`}>
        🖨️ Imprimir cartel
      </button>
    </div>
  )
}

export default ShareActions
