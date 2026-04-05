'use client';

import { updateDisplayNameAction } from '@/lib/actions';

type Props = {
  name: string;
  email: string;
  initials: string;
};

export default function SettingsProfile({ name, email, initials }: Props) {
  return (
    <section>
      <h2 className='font-serif text-2xl font-light text-ink mb-1'>Profile</h2>
      <p className='text-sm text-ink-muted mb-6'>
        Manage how you appear in Quill.
      </p>

      <div className='flex items-center gap-4 mb-8'>
        <div className='w-14 h-14 rounded-full bg-gradient-to-br from-quill to-ai-glow flex items-center justify-center text-xl font-semibold text-white'>
          {initials}
        </div>
        <div>
          <div className='font-medium text-ink'>{name || 'No name set'}</div>
          <div className='text-sm text-ink-muted'>{email}</div>
        </div>
      </div>

      <form action={updateDisplayNameAction} className='flex flex-col gap-4'>
        <div>
          <label className='font-mono text-[0.65rem] tracking-widest uppercase text-ink-ghost block mb-1.5'>
            Display name
          </label>
          <input
            name='name'
            defaultValue={name}
            placeholder='Your name'
            className='w-full px-3 py-2.5 text-sm font-sans bg-surface-raised border border-border rounded text-ink outline-none focus:border-quill transition-colors'
          />
        </div>
        <div>
          <label className='font-mono text-[0.65rem] tracking-widest uppercase text-ink-ghost block mb-1.5'>
            Email
          </label>
          <input
            defaultValue={email}
            disabled
            className='w-full px-3 py-2.5 text-sm font-sans bg-parchment-warm border border-border rounded text-ink-muted outline-none cursor-not-allowed'
          />
          <p className='text-xs text-ink-ghost mt-1.5'>
            Email cannot be changed here.
          </p>
        </div>
        <div>
          <button
            type='submit'
            className='text-sm font-medium px-6 py-2.5 bg-ink text-parchment rounded cursor-pointer hover:bg-ink-soft transition-colors'
          >
            Save changes
          </button>
        </div>
      </form>
    </section>
  );
}
