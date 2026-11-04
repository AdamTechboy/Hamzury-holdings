import { links } from '@/lib/site';

/** Floating "chat on WhatsApp" button, bottom-right on every page. */
export default function WhatsAppButton() {
  return (
    <a
      className="whatsapp"
      href={links.whatsapp}
      target="_blank"
      rel="noopener"
      aria-label="Chat with hamzury on WhatsApp"
    >
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path
          fill="currentColor"
          d="M16 3C9 3 3.3 8.7 3.3 15.7c0 2.5.7 4.8 1.9 6.8L3.2 29l6.7-1.9a12.7 12.7 0 0 0 6.1 1.6c7 0 12.7-5.7 12.7-12.7S23 3 16 3Zm0 23.2c-2 0-3.8-.5-5.4-1.5l-.4-.2-4 1.1 1.1-3.9-.3-.4a10.4 10.4 0 0 1-1.6-5.6C5.4 9.9 10.2 5.2 16 5.2s10.6 4.7 10.6 10.5S21.8 26.2 16 26.2Zm5.8-7.9c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1a8.6 8.6 0 0 1-4.3-3.7c-.3-.6.3-.5 1-1.7.1-.2 0-.4 0-.5l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5 1.9.8 2.6.9 3.6.7.6-.1 1.9-.8 2.1-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.2-.6-.4Z"
        />
      </svg>
      <span className="whatsapp-label">chat with us</span>
    </a>
  );
}
