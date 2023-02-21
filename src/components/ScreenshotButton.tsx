import { useState } from 'react';

import { Loading } from './Loading';

import { FacebookShareButton, WhatsappShareButton } from 'react-share';

import { Camera, Trash, WhatsappLogo } from 'phosphor-react';
import html2canvas from 'html2canvas';

interface ScreenshotButtonProps {
  screenshot: string | null,
  onScreenshotTook: (screenshot: string | null) => void;
}

export function ScreenshotButton({
  screenshot,
  onScreenshotTook
}: ScreenshotButtonProps) {
  const [isTakingScreenshot, setIsTakingScreenshot] = useState(false);

  async function handleTakeScreenshot() {
    setIsTakingScreenshot(true);

    const canvas = await html2canvas(document.querySelector('html')!);
    const base64image = canvas.toDataURL('image/png');

    onScreenshotTook(base64image);
    setIsTakingScreenshot(false);
  }

  if (screenshot) {
    return (
      <div
        className="p-1 w-24 h-24 rounded-md border-transparent flex justify-end items-end text:zinc-400 hover:text-zinc-100 transition-colors z-10"
        style={{
            backgroundImage: `url(${screenshot})`,
            backgroundPosition: `right bottom`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 100,
        }}
      >
        <WhatsappShareButton
          url="https://divine-barbecue.vercel.app/cardapios"
          title="Olha que dahora os cardápios da Divine Barbecue:"
        >
          <WhatsappLogo weight="fill" size={24} />
        </WhatsappShareButton>
        <Trash weight="fill" size={24} onClick={() => onScreenshotTook(null)} className="cursor-pointer" />
      </div>
    );
  }

  return (
    <button
      type='button'
      onClick={handleTakeScreenshot}
      className="p-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500"
    >
      { isTakingScreenshot ? <Loading /> : <Camera className="w-6 h-6" /> }
    </button>
  )
}
