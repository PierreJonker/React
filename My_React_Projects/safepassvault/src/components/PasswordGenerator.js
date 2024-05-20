import React, { useState } from 'react';
import { firestore } from '../firebase';
import './PasswordGenerator.css';

function PasswordGenerator({ userId }) {
  const [passwordLength, setPasswordLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [generatedPassword, setGeneratedPassword] = useState('');

  const handleGeneratePassword = () => {
    const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+';

    let availableChars = '';
    if (includeUppercase) availableChars += upperChars;
    if (includeLowercase) availableChars += lowerChars;
    if (includeNumbers) availableChars += numberChars;
    if (includeSymbols) availableChars += symbolChars;

    let password = '';
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * availableChars.length);
      password += availableChars[randomIndex];
    }

    setGeneratedPassword(password);
  };

  const handleSaveSettings = async () => {
    try {
      await firestore.collection('passwordSettings').doc(userId).set({
        passwordLength,
        includeUppercase,
        includeLowercase,
        includeNumbers,
        includeSymbols,
      });
      alert('Password settings saved successfully!');
    } catch (error) {
      console.log('Error saving password settings:', error);
    }
  };

  return (
    <div className="password-generator">
      <h3>Password Generator</h3>
      <div>
        <label>
          Password Length:
          <input
            type="number"
            value={passwordLength}
            onChange={(e) => setPasswordLength(parseInt(e.target.value))}
          />
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={includeUppercase}
            onChange={(e) => setIncludeUppercase(e.target.checked)}
          />
          Include Uppercase Letters
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={includeLowercase}
            onChange={(e) => setIncludeLowercase(e.target.checked)}
          />
          Include Lowercase Letters
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={(e) => setIncludeNumbers(e.target.checked)}
          />
          Include Numbers
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={includeSymbols}
            onChange={(e) => setIncludeSymbols(e.target.checked)}
          />
          Include Symbols
        </label>
      </div>
      <button onClick={handleGeneratePassword}>Generate Password</button>
      <button onClick={handleSaveSettings}>Save Settings</button>
      {generatedPassword && (
        <div>
          <p>Generated Password: {generatedPassword}</p>
        </div>
      )}
    </div>
  );
}

export default PasswordGenerator;