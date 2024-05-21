import {CodeEditor} from '../CodeEditor/CodeEditor';
import exampleIntroFileAiChatBotLight from '../EinBotLiveExample/aiChatBot-light.tsx';
import exampleIntroFileAiChatBotDark from '../EinBotLiveExample/aiChatBot-dark.tsx';
import exampleIntroFileStreamAdapter from '../EinBotLiveExample/adapter.tsx';
import exampleIntroFilePersonas from '../EinBotLiveExample/personas.tsx';
import './EinBotWidget.css'

type WidgetProps = {
    direction?: 'row' | 'column';
    colorScheme?: 'light' | 'dark';
};

function EinBotWidget(props: WidgetProps) {
    const {
        colorScheme,
        direction = 'row',
    } = props;

    const colorSchemeToUse = colorScheme || 'light';
    const files: Record<string, string | ((colorScheme: 'light' | 'dark') => string)> = {
        'App.tsx': colorSchemeToUse === 'light' ? exampleIntroFileAiChatBotLight : exampleIntroFileAiChatBotDark,
        'adapter.ts': exampleIntroFileStreamAdapter,
        'personas.tsx': exampleIntroFilePersonas,
    };

    return (
        <div className="EinBotWidget-Root">
            <CodeEditor
                colorScheme={colorSchemeToUse}
                direction={direction}
                files={files}
                simulatedPrompt="How can an AI chatbot improve the user experience on my website?"
            />
        </div>
    )
}

export default EinBotWidget
