import React, { useState } from 'react';
import ErobloxLogo from '../components/ErobloxLogo';
import Avatar from '../components/Avatar';
import { useUser } from '../context/UserContext';
import { AgeGroup } from '../types';

interface RegisterPageProps {
  onRegister: () => void;
  onGoToLogin: () => void;
}

type Step = 'age_verify' | 'age_group' | 'details' | 'gender';

export default function RegisterPage({ onRegister, onGoToLogin }: RegisterPageProps) {
  const { register } = useUser();
  const [step, setStep] = useState<Step>('age_verify');
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [ageGroup, setAgeGroup] = useState<AgeGroup | ''>('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | ''>('');
  const [error, setError] = useState('');

  const handleAgeVerify = () => {
    if (!ageConfirmed) {
      setError('Please confirm your age to continue');
      return;
    }
    setError('');
    setStep('age_group');
  };

  const handleAgeGroup = () => {
    if (!ageGroup) {
      setError('Please select your age group');
      return;
    }
    setError('');
    setStep('gender');
  };

  const handleGender = () => {
    if (!gender) {
      setError('Please select your character type');
      return;
    }
    setError('');
    setStep('details');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password || !dateOfBirth) {
      setError('Please fill in all fields');
      return;
    }
    if (username.length < 3) {
      setError('Username must be at least 3 characters');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    register({
      username,
      password,
      dateOfBirth,
      gender: gender as 'male' | 'female',
      ageGroup: ageGroup as AgeGroup,
      displayName: displayName || username,
    });
    onRegister();
  };

  const renderStep = () => {
    switch (step) {
      case 'age_verify':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-violet-500 to-rose-500 rounded-full flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                  <circle cx="9" cy="10" r="1.5" fill="currentColor" />
                  <circle cx="15" cy="10" r="1.5" fill="currentColor" />
                  <path d="M8.5 15.5Q12 18 15.5 15.5" strokeLinecap="round" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Age Verification</h2>
              <p className="text-gray-400 text-sm">We need to verify your age to provide the best experience</p>
            </div>

            <div
              onClick={() => { setAgeConfirmed(!ageConfirmed); setError(''); }}
              className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                ageConfirmed ? 'bg-violet-500/20 border-violet-500' : 'bg-gray-800/40 border-gray-700 hover:border-gray-600'
              }`}
            >
              <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${
                ageConfirmed ? 'bg-violet-500 border-violet-500' : 'border-gray-600'
              }`}>
                {ageConfirmed && (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className="text-white text-sm">I confirm that I am providing my real age and agree to the Terms of Service</span>
            </div>

            <button
              onClick={handleAgeVerify}
              className="w-full bg-gradient-to-r from-rose-500 to-violet-600 text-white font-bold py-3 px-6 rounded-xl hover:from-rose-600 hover:to-violet-700 transition-all duration-200 shadow-lg active:scale-95"
            >
              Continue
            </button>
          </div>
        );

      case 'age_group':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-2">Select Your Age Group</h2>
              <p className="text-gray-400 text-sm">This helps us personalize your experience</p>
            </div>

            <div className="space-y-3">
              {[
                { value: 'under13' as AgeGroup, label: 'Under 13', desc: 'Kid-friendly experience with extra safety features', icon: '🧒' },
                { value: '13to17' as AgeGroup, label: '13 - 17', desc: 'Teen experience with age-appropriate content', icon: '🧑' },
                { value: '18plus' as AgeGroup, label: '18+', desc: 'Full access to all Eroblox features', icon: '🧑‍💻' },
              ].map((group) => (
                <div
                  key={group.value}
                  onClick={() => { setAgeGroup(group.value); setError(''); }}
                  className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                    ageGroup === group.value ? 'bg-violet-500/20 border-violet-500' : 'bg-gray-800/40 border-gray-700 hover:border-gray-600'
                  }`}
                >
                  <span className="text-2xl">{group.icon}</span>
                  <div>
                    <p className="text-white font-semibold">{group.label}</p>
                    <p className="text-gray-400 text-xs">{group.desc}</p>
                  </div>
                  <div className={`ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    ageGroup === group.value ? 'border-violet-500' : 'border-gray-600'
                  }`}>
                    {ageGroup === group.value && <div className="w-2.5 h-2.5 rounded-full bg-violet-500" />}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep('age_verify')} className="flex-1 bg-gray-800 text-gray-300 font-medium py-3 px-6 rounded-xl hover:bg-gray-700 transition-all">
                Back
              </button>
              <button onClick={handleAgeGroup} className="flex-1 bg-gradient-to-r from-rose-500 to-violet-600 text-white font-bold py-3 px-6 rounded-xl hover:from-rose-600 hover:to-violet-700 transition-all shadow-lg active:scale-95">
                Continue
              </button>
            </div>
          </div>
        );

      case 'gender':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-2">Choose Your Character</h2>
              <p className="text-gray-400 text-sm">This will be your default avatar in Eroblox</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {(['male', 'female'] as const).map((g) => (
                <div
                  key={g}
                  onClick={() => { setGender(g); setError(''); }}
                  className={`flex flex-col items-center gap-3 p-6 rounded-xl border cursor-pointer transition-all ${
                    gender === g ? 'bg-violet-500/20 border-violet-500 shadow-lg shadow-violet-500/10' : 'bg-gray-800/40 border-gray-700 hover:border-gray-600'
                  }`}
                >
                  <Avatar gender={g} size="lg" />
                  <p className="text-white font-semibold capitalize">{g === 'male' ? 'Boy' : 'Girl'}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep('age_group')} className="flex-1 bg-gray-800 text-gray-300 font-medium py-3 px-6 rounded-xl hover:bg-gray-700 transition-all">
                Back
              </button>
              <button onClick={handleGender} className="flex-1 bg-gradient-to-r from-rose-500 to-violet-600 text-white font-bold py-3 px-6 rounded-xl hover:from-rose-600 hover:to-violet-700 transition-all shadow-lg active:scale-95">
                Continue
              </button>
            </div>
          </div>
        );

      case 'details':
        return (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-center mb-2">
              <h2 className="text-2xl font-bold text-white mb-1">Create Your Account</h2>
              <p className="text-gray-400 text-sm">Fill in your details to get started</p>
            </div>

            <div className="flex justify-center mb-2">
              <Avatar gender={gender as 'male' | 'female'} size="md" />
            </div>

            <div>
              <label className="block text-gray-400 text-sm font-medium mb-1.5">Username *</label>
              <input
                type="text"
                value={username}
                onChange={(e) => { setUsername(e.target.value); setError(''); }}
                className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all text-sm"
                placeholder="Choose a username"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm font-medium mb-1.5">Display Name</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all text-sm"
                placeholder="Your display name (optional)"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm font-medium mb-1.5">Date of Birth *</label>
              <input
                type="date"
                value={dateOfBirth}
                onChange={(e) => { setDateOfBirth(e.target.value); setError(''); }}
                className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all text-sm"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm font-medium mb-1.5">Password *</label>
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all text-sm"
                placeholder="Create a password (min. 6 characters)"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => setStep('gender')} className="flex-1 bg-gray-800 text-gray-300 font-medium py-3 px-6 rounded-xl hover:bg-gray-700 transition-all">
                Back
              </button>
              <button type="submit" className="flex-1 bg-gradient-to-r from-rose-500 to-violet-600 text-white font-bold py-3 px-6 rounded-xl hover:from-rose-600 hover:to-violet-700 transition-all shadow-lg active:scale-95">
                Create Account
              </button>
            </div>
          </form>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-violet-950 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md px-4">
        <div className="bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-gray-800 p-8 shadow-2xl">
          <div className="flex justify-center mb-6">
            <ErobloxLogo size="md" />
          </div>

          {/* Progress steps */}
          <div className="flex items-center justify-center gap-2 mb-6">
            {(['age_verify', 'age_group', 'gender', 'details'] as Step[]).map((s, i) => (
              <React.Fragment key={s}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  step === s ? 'bg-violet-500 text-white' :
                  (['age_verify', 'age_group', 'gender', 'details'] as Step[]).indexOf(step) > i ? 'bg-green-500 text-white' :
                  'bg-gray-800 text-gray-500'
                }`}>
                  {(['age_verify', 'age_group', 'gender', 'details'] as Step[]).indexOf(step) > i ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : i + 1}
                </div>
                {i < 3 && <div className={`w-8 h-0.5 ${(['age_verify', 'age_group', 'gender', 'details'] as Step[]).indexOf(step) > i ? 'bg-green-500' : 'bg-gray-700'}`} />}
              </React.Fragment>
            ))}
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm mb-4">
              {error}
            </div>
          )}

          {renderStep()}

          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm">
              Already have an account?{' '}
              <button onClick={onGoToLogin} className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
