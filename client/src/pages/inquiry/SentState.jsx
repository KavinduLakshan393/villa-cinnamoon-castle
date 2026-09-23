import { useState } from 'react';
import Button from '../../components/Button.jsx';

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for browsers without clipboard permission.
    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand('copy');
    area.remove();
    return ok;
  }
}

/**
 * Opening WhatsApp does not prove the message was sent, so this state never says
 * "sent" (Inquiry IA — Return state).
 */
export default function SentState({ url, message, blocked, onEdit }) {
  const [copied, setCopied] = useState(null);

  return (
    <div className="step sent">
      <h2 className="step__heading" id="step-heading" tabIndex={-1}>
        WhatsApp opened
      </h2>
      <p className="lead">Review the prepared message in WhatsApp and tap Send. The host will reply there after receiving it.</p>
      {blocked && (
        <p className="form-error" role="alert">
          <span className="error-icon" aria-hidden="true">
            !
          </span>
          Your browser may have blocked the new tab. Use “Open WhatsApp again” below.
        </p>
      )}

      <div className="sent__actions">
        <Button to={url}>Open WhatsApp again</Button>
        <Button
          variant="swipe"
          tone="dark"
          onClick={async () => setCopied((await copyText(message)) ? 'ok' : 'fail')}
        >
          Copy inquiry details
        </Button>
      </div>
      <p className="caption sent__status" aria-live="polite">
        {copied === 'ok' && 'Inquiry details copied. You can paste them into WhatsApp.'}
        {copied === 'fail' && 'Copying isn’t available in this browser. Select the text below instead.'}
      </p>

      <details className="sent__preview">
        <summary>Show the prepared message</summary>
        <pre>{message}</pre>
      </details>

      <button type="button" className="text-button" onClick={onEdit}>
        Edit the inquiry
      </button>
    </div>
  );
}
