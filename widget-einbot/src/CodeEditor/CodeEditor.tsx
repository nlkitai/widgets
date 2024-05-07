import { useMemo } from 'react';
import {
    SandpackProvider,
    SandpackLayout,
    SandpackPreview,
    SandpackCodeEditor,
    SandpackFiles,
} from "@codesandbox/sandpack-react";

import indexHtmlContent from './indexHtml';
import indexTsxContent from './indexTsx';
import simulatorTsContent from './simulatorJs';

export type CodeEditorProps = {
    direction?: 'row' | 'column';
    theme?: 'light' | 'dark';
    simulatedPrompt?: string;
    files: SandpackFiles;
}

export const CodeEditor = ({
    direction = 'column',
    theme = 'light',
    simulatedPrompt,
    files,
}: CodeEditorProps) => {
    const setPromptIntoSimulator = useMemo(() => {
        if (!simulatedPrompt) return '';
        return `setTimeout(() => { nluxSimulator?.setPrompt("${simulatedPrompt}"); }, 1000);`;
    }, [simulatedPrompt]);

    return (
        <SandpackProvider
            template="react-ts"
            theme={theme}
            options={{
                recompileDelay: 250,
                visibleFiles: Object.keys(files) as Array<any>,
            }}
            customSetup={{
                dependencies: {
                    "@nlux/react": "latest",
                    "@nlux/themes": "latest",
                    "@nlux/highlighter": "latest",
                },
            }}
            files={{
                ...files,
                'public/index.html': indexHtmlContent,
                'index.tsx': indexTsxContent,
                'Simulator.ts': `${simulatorTsContent}\n${setPromptIntoSimulator}`,
            }}
            className="CodeEditor-Root"
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
