import { useMemo } from 'react';
import {
    SandpackProvider,
    SandpackLayout,
    SandpackPreview,
    SandpackCodeEditor,
} from "@codesandbox/sandpack-react";
import { SandpackFiles } from '@codesandbox/sandpack-react';

import indexHtmlContent from './indexHtml';
import indexTsxContent from './indexTsx';
import simulatorTsContent from './simulatorJs';

export type CodeEditorProps = {
    className?: string;
    direction?: 'row' | 'column';
    colorScheme: 'light' | 'dark';
    simulatedPrompt?: string;
    editorHeight?: number;
    files: Record<string, string | ((colorScheme: 'light' | 'dark') => string)>;
}

export const CodeEditor = ({
    className,
    simulatedPrompt,
    colorScheme,
    files,
    direction = 'column',
}: CodeEditorProps) => {
    const setPromptIntoSimulator = useMemo(() => {
        const promptToType = simulatedPrompt || 'How can AI chatbots improve the user experience on my website?';
        return `setTimeout(() => { nluxSimulator?.enableSimulator();\n nluxSimulator?.setPrompt("${promptToType}"); }, 1000);\n`;
    }, [simulatedPrompt]);

    const uid = useMemo(() => Math.random().toString(36).substring(7), [colorScheme]);
    const filesContent: SandpackFiles = {};

    for (const [key, value] of Object.entries(files)) {
        filesContent[key] = typeof value === 'function' ? value(colorScheme) : value;
    }

    return (
        <SandpackProvider
            key={uid}
            className={`CodeEditor-Root${className ? ` ${className}` : ''}`}
            template="react-ts"
            theme={colorScheme}
            options={{
                recompileDelay: 250,
                visibleFiles: Object.keys(files) as Array<any>,
                initMode: 'lazy',
            }}
            customSetup={{
                dependencies: {
                    "react": "^18.3.1",
                    "react-dom": "^18.3.1",
                    "@nlux/react": "beta",
                    "@nlux/langchain-react": "beta",
                    "@nlux/themes": "beta",
                    "@nlux/highlighter": "beta",
                },
            }}
            files={{
                ...filesContent,
                'public/index.html': indexHtmlContent(colorScheme),
                'index.tsx': indexTsxContent,
                'simulator.ts': `${simulatorTsContent}\n${setPromptIntoSimulator}`,
            }}
            style={{
                height: '100%',
                width: '100%',
            }}
        >
            <SandpackLayout
                className="CodeEditor-Layout"
                style={{ flexDirection: direction }}
            >
                <SandpackPreview
                    showNavigator={true}
                    showOpenInCodeSandbox={false}
                    showRefreshButton={true}
                    showRestartButton={true}
                    style={{
                        height: '100%',
                        width: '100%',
                    }}
                />
                <SandpackCodeEditor
                    showTabs
                    showLineNumbers={true}
                    showInlineErrors
                    wrapContent
                    closableTabs={false}
                    style={{
                        height: '100%',
                        width: '100%',
                    }}
                />
            </SandpackLayout>
        </SandpackProvider>
    )
};
