export default `import {AiChat} from '@nlux/react';
import '@nlux/themes/nova.css';
import {streamAdapter} from './adapter';
import {user, assistantAvatar} from './personas';

export default () => (
  <AiChat
    adapter={streamAdapter}
    personaOptions={{
      assistant: {
        name: 'Albert AI',
        tagline: 'Your Einsteinian-AI Assistant',
        avatar: assistantAvatar
      },
      user
    }}
    promptBoxOptions={{
      placeholder: 'How can I help you?'
    }}
    displayOptions={{
      themeId: 'nova',
      colorScheme: 'dark'
    }}
  />
);`;
