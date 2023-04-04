import React from 'react'
import ReactDom from 'react-dom'
import ReactMarkdown from 'react-markdown'
import SyntaxHighlighter from 'react-syntax-highlighter'
import {SyntaxHighlighterProps} from 'react-syntax-highlighter'
import { atomOneLight, atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import hljs from 'highlight.js';
import { Themes } from '@/theme/types';
import useTheme from '@/store/theme';

type CustomMarkdowmProps = {children: React.ReactNode};

export default function CustomMarkdown({children}: CustomMarkdowmProps) {
  var markdown = String(children);
  const [theme] = useTheme();
  
  return (
    <ReactMarkdown
    children={markdown}
    components={{
      code({node, inline, className, children, ...props}) {
        const match = /language-(\w+)/.exec(className || '')
        var lang = "";
        if(match) {
          lang = match[1];
        }
        else {
          lang = hljs.highlightAuto(String(children)).language??"";
        }
        return !inline ? (
          <SyntaxHighlighter
            style={theme === Themes.DARK?atomOneDark:atomOneLight}
            language={lang}
            PreTag="div"
            {...props as SyntaxHighlighterProps}
          >
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
        ) : (
          <code className={className} {...props}>
            {children}
          </code>
        )
      }
    }}
  />
  )
}

/*
export default function CutomMarkdown() {
  return (
    <ReactMarkdown
    children={markdown}
    components={{
      code({node, inline, className, children, ...props}) {
        const match = /language-(\w+)/.exec(className || '')
        return !inline && match ? (
          <SyntaxHighlighter
            style={dark}
            language={match[1]}
            PreTag="div"
            {...props as SyntaxHighlighterProps}
          >
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
        ) : (
          <code className={className} {...props}>
            {children}
          </code>
        )
      }
    }}
  />
  )
}
*/