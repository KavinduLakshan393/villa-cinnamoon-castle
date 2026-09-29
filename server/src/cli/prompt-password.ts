import { password } from '@inquirer/prompts';
import { validateAdminPassword } from '../auth/password.js';

export async function promptForNewPassword(): Promise<string> {
  const first = await password({
    message: 'New admin password',
    mask: '*',
    validate: (value) => validateAdminPassword(value) ?? true,
  });
  const confirmation = await password({
    message: 'Confirm admin password',
    mask: '*',
  });
  if (first !== confirmation) throw new Error('Passwords do not match. No changes were made.');
  return first;
}
