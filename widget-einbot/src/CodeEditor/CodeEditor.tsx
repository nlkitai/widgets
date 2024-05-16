import { useMemo } from 'react';
import {
    SandpackProvider,
    SandpackLayout,
    SandpackPreview,
    SandpackCodeEditor,
    SandpackFiles,
} from "@codesandbox/sandpack-react";

import indexHtmlLightContent from './indexHtml-light';
import indexHtmlDarkContent from './indexHtml-dark';
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
                    "@nlux/react": "^2.1.4-beta",
                    "@nlux/themes": "^2.1.4-beta",
                    "@nlux/highlighter": "^2.1.4-beta",
                },
            }}
            files={{
                ...files,
                'public/index.html': theme === 'light' ? indexHtmlLightContent : indexHtmlDarkContent,
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
                    content={'OK'}
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
