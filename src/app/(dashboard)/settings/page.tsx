import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { SignOutButton } from '@clerk/nextjs';
import SettingsProfile from '@/components/settings/SettingsProfile';
import SettingsDangerZone from '@/components/settings/SettingsDangerZone';

export default async function SettingsPage() {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');

  const user = await currentUser();

  return (
    <div className='flex flex-col md:flex-row h-screen bg-surface font-sans'>
      {/* Settings sidebar — hidden on mobile */}
      <aside className='hidden md:flex w-60 shrink-0 flex-col h-screen bg-parchment-warm border-r border-border'>
        <div className='p-5 border-b border-border'>
          <Link
            href='/dashboard'
            className='font-serif text-xl font-medium text-ink flex items-center gap-1'
          >
            Quill
            <span className='w-1.5 h-1.5 rounded-full bg-quill inline-block mb-1' />
          </Link>
        </div>
        <nav className='p-3 flex flex-col gap-0.5 mt-2'>
          <div className='font-mono text-[0.6rem] tracking-widest uppercase text-ink-ghost px-3 py-2'>
            Settings
          </div>
          {[
            { label: '👤 Profile', active: true },
            { label: '✦ Preferences', active: false },
            { label: '⚡ AI', active: false },
            { label: '🔐 Account', active: false },
          ].map((item) => (
            <div
              key={item.label}
              className={`px-3 py-2 rounded text-sm cursor-pointer transition-all ${
                item.active
                  ? 'bg-quill/10 text-ink font-medium border-l-2 border-quill'
                  : 'text-ink-muted hover:text-ink hover:bg-quill/5'
              }`}
            >
              {item.label}
            </div>
          ))}
        </nav>
        <div className='mt-auto p-4 border-t border-border'>
          <Link
            href='/dashboard'
            className='font-mono text-[0.62rem] tracking-widest uppercase text-ink-ghost hover:text-ink transition-colors'
          >
            ← Back to dashboard
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className='flex-1 overflow-y-auto p-5 md:p-10 max-w-2xl'>
        {/* Mobile header */}
        <div className='flex items-center justify-between mb-8 md:hidden'>
          <Link
            href='/dashboard'
            className='font-mono text-[0.62rem] tracking-widest uppercase text-ink-ghost hover:text-ink transition-colors'
          >
            ← Dashboard
          </Link>
          <SignOutButton>
            <button className='font-mono text-[0.62rem] tracking-widest uppercase text-danger cursor-pointer'>
              Sign out
            </button>
          </SignOutButton>
        </div>

        <SettingsProfile
          name={user?.fullName ?? ''}
          email={user?.emailAddresses[0]?.emailAddress ?? ''}
          initials={
            [user?.firstName?.[0], user?.lastName?.[0]]
              .filter(Boolean)
              .join('')
              .toUpperCase() || 'U'
          }
        />
        <div className='border-t border-border my-10' />
        <SettingsDangerZone />
      </main>
    </div>
  );
}
