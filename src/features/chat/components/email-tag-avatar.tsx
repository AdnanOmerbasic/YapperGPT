import { Avatar } from '@/components/ui/avatar';
import { User } from '../../../../drizzle/schema';
import { extractEmailTag } from '../utils/extractEmailTag';

type UserSelectEmail = Pick<User, 'email'>['email'];
type EmailTagAvatarProps = {
  email?: UserSelectEmail;
  role: 'user' | 'ai';
};

export const EmailTagAvatar = ({ role, email }: EmailTagAvatarProps) => {
  if (role === 'user') {
    return (
      <div className="flex justify-end">
        <Avatar className="flex shrink-0 items-center justify-center bg-green-500 text-black dark:bg-green-700">
          {extractEmailTag(email!)}
        </Avatar>
      </div>
    );
  }
  return (
    <div className="pt-8">
      <Avatar className="flex shrink-0 items-center justify-center bg-sky-600 text-white dark:bg-indigo-500">
        AI
      </Avatar>
    </div>
  );
};
