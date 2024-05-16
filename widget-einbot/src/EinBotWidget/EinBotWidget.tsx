import {SandpackFiles} from '@codesandbox/sandpack-react';
import {CodeEditor} from '../CodeEditor/CodeEditor';
import exampleIntroFileAiChatBotLight from '../EinBotLiveExample/aiChatBot-light.tsx';
import exampleIntroFileAiChatBotDark from '../EinBotLiveExample/aiChatBot-dark.tsx';
import exampleIntroFileStreamAdapter from '../EinBotLiveExample/adapter.tsx';
import exampleIntroFilePersonas from '../EinBotLiveExample/personas.tsx';
import './EinBotWidget.css'

type WidgetProps = {
    direction?: 'row' | 'column';
    theme?: 'light' | 'dark';
};

function EinBotWidget(props: WidgetProps) {
    const {
        theme = 'light',
        direction = 'row',
    } = props;

    const files: SandpackFiles = {
        'App.tsx': theme === 'light' ? exampleIntroFileAiChatBotLight : exampleIntroFileAiChatBotDark,
        'adapter.ts': exampleIntroFileStreamAdapter,
        'personas.tsx': exampleIntroFilePersonas,
    };

    return (
        <div className="EinBotWidget-Root">
            <CodeEditor
                theme={theme}
                direction={direction}
                files={files}
                simulatedPrompt="How can an AI chatbot improve the user experience on my website?"
            />
        </div>
    )
}

export default EinBotWidget
