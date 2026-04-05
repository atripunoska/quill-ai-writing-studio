'use client';

import { useState } from 'react';
import { useClerk } from '@clerk/nextjs';
import { deleteAccountAction } from '@/lib/actions';

export default function SettingsDangerZone() {
  const [confirming, setConfirming] = useState(false);
  const { signOut } = useClerk();

  async function handleDelete() {
    await deleteAccountAction();
    await signOut({ redirectUrl: '/' });
  }

  return (
    <section>
      <h2 className='font-serif text-2xl font-light text-danger mb-1'>
        Danger zone
      </h2>
      <p className='text-sm text-ink-muted mb-6'>
        These actions are permanent and cannot be undone.
      </p>

      <div className='border border-danger/30 rounded-md p-6'>
        <h3 className='font-medium text-ink mb-1'>Delete account</h3>
        <p className='text-sm text-ink-muted mb-4'>
          Permanently delete your account and all your documents. This cannot be
          undone.
        </p>

        {!confirming ? (
          <button
            onClick={() => setConfirming(true)}
            className='text-sm font-medium px-4 py-2 border border-danger/50 text-danger rounded cursor-pointer hover:bg-danger hover:text-white transition-all'
          >
            Delete my account
          </button>
        ) : (
          <div className='flex flex-col gap-3'>
            <p className='text-sm font-medium text-danger'>
              Are you sure? This will delete everything permanently.
            </p>
            <div className='flex gap-3'>
              <button
                onClick={() => setConfirming(false)}
                className='text-sm px-4 py-2 border border-border text-ink-muted rounded cursor-pointer hover:text-ink transition-all'
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className='text-sm font-medium px-4 py-2 bg-danger text-white rounded cursor-pointer hover:opacity-90 transition-all'
              >
                Yes, delete everything
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
