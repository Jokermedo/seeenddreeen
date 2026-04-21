'use client';

const platforms = [
  {
    name: 'TikTok',
    handle: '@sendreen2',
    link: 'https://www.tiktok.com/@sendreen2?_r=1&_t=ZS-95SbVbBBfIT',
    emoji: '🎵',
    color: 'bg-stone-900',
  },
  {
    name: 'Instagram',
    handle: '@sendreen2',
    link: 'https://www.instagram.com/sendreen2?igsh=cjAzYm5ueTcyN3lh&utm_source=qr',
    emoji: '📸',
    color: 'bg-gradient-to-br from-purple-500 to-pink-500',
  },
];

export function SocialMediaSection() {
  return (
    <section className="py-6 bg-[#F2F2F7]">
      <div className="max-w-2xl mx-auto px-4">
        <p className="text-xs font-bold text-stone-400 text-center mb-3">تابعينا</p>
        <div className="flex gap-3">
          {platforms.map((p, i) => (
            <a
              key={i}
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex-1 ${p.color} rounded-2xl p-4 flex flex-col items-center gap-2 text-white active:scale-[0.97] transition-transform shadow-sm`}
            >
              <span className="text-2xl">{p.emoji}</span>
              <p className="font-bold text-sm">{p.name}</p>
              <p className="text-[11px] opacity-70">{p.handle}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
