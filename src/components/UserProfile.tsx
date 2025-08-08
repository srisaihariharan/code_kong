import { User } from 'lucide-react';

export default function UserProfile() {
  return (
    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700 mb-6">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-emerald-600 flex items-center justify-center">
          <User className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white">Alternative Credit Application</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Complete the steps below to generate your score.</p>
        </div>
      </div>
    </div>
  );
}